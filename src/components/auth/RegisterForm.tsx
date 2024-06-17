import React, { useState, useContext } from 'react';
import styles from '../../styles/RegisterForm.module.css';
import classNames from 'classnames';
import { AuthContext } from '../../contexts/AuthContext';

interface RegisterFormProps {
  onClose: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onClose }) => {
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
      const response = await fetch(`${process.env.VITE_LOCAL_API_URL}/api/accounts`, {
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
        setSuccessMessage('Registration successful');
        setErrorMessage('');
      } else {
        const { error } = await response.json();
        setSuccessMessage('');
        setErrorMessage(error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registeration:', error);
      setSuccessMessage('');
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className={styles['register-form']}>
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
        <h2>Register</h2>
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
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;