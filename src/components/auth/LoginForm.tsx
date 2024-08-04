import React, { useState, useContext } from 'react';
import styles from '../../styles/LoginForm.module.css';
import classNames from 'classnames';
import { AuthContext } from '../../contexts/AuthContext';

interface LoginFormProps {
  onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setIsLoggedIn } = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');  //メッセージの再描画のために

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
        setSuccessMessage('Login successful');
        setErrorMessage('');
      } else {
        const { error } = await response.json();
        setSuccessMessage('');
        setErrorMessage(error || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setSuccessMessage('');
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className={styles['login-form']}>
      {(successMessage || errorMessage) && (
        <div
          className={classNames(
            styles['message-box'],
            {
              [styles['success']]: successMessage,
              [styles['error']]: errorMessage,
            }
          )}
        >
          {successMessage || errorMessage}
        </div>
      )}
      <div className={styles['form-header']}>
        <h2>Login</h2>
        <button className={styles['close-button']} onClick={onClose}>
          ×
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles['input']}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles['input']}
        />
        <button type="submit" className={styles['submit-button']}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;