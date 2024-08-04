import React, { useState, useContext } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import styles from '../../styles/AuthForm.module.css';
import classNames from 'classnames';
import { AuthContext } from '../../contexts/AuthContext';


interface AuthFormProps {
  onClose: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onClose }) => {
  const [selectedForm, setSelectedForm] = useState<'login' | 'register' | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setIsLoggedIn } = useContext(AuthContext);


  const handleFormSelect = (form: 'login' | 'register') => {
    setSelectedForm(form);
    setSuccessMessage('');
    setErrorMessage('');
  };

  // LoginForm or RegitserForm で × をクリックすると、それらを非表示にしてこのフォームに戻る
  const handleCloseForm = () => {
    setSelectedForm(null);
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleGuestLogin = async () => {
    setSuccessMessage('');
    setErrorMessage('');  //メッセージの再描画のために

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/guest-login`, {
        method: 'POST'
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

  // Login or Register ボタンを押したとき、この画面を消して LoginForm or RegisterForm を表示
  if (selectedForm === 'login') {
    return <LoginForm onClose={handleCloseForm} />;
  }

  if (selectedForm === 'register') {
    return <RegisterForm onClose={handleCloseForm} />;
  }

  return (
    <div className={styles['auth-form']}>
      {(successMessage || errorMessage) && (
        <div
          className={classNames(
            styles['auth-form__message-box'],
            {
              [styles['auth-form__message-box--success']]: successMessage,
              [styles['auth-form__message-box--error']]: errorMessage,
            }
          )}
        >
          {successMessage || errorMessage}
        </div>
      )}
      <div className={styles['auth-form__header']}>
        <button className={styles['auth-form__close-button']} onClick={onClose}>
          ×
        </button>
      </div>
      <div className={styles['auth-form__buttons']}>
        <button
          className={styles['auth-form__login-button']}
          onClick={() => handleFormSelect('login')}
        >
          Login
        </button>
        <button
          className={styles['auth-form__register-button']}
          onClick={() => handleFormSelect('register')}
        >
          Register
        </button>
        <button
          className={styles['auth-form__guest-login-button']}
          onClick={handleGuestLogin}
        >
          Guest Login
        </button>
      </div>
    </div>
  );
};

export default AuthForm;