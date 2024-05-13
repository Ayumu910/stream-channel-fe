import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import '../../styles/AuthForm.modules.css'

interface AuthFormProps {
  onClose: () => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onClose, setIsLoggedIn }) => {
  const [selectedForm, setSelectedForm] = useState<'login' | 'register' | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


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
      const response = await fetch(`${process.env.VITE_LOCAL_API_URL}/api/guest-login`, {
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
    return <LoginForm onClose={handleCloseForm} setIsLoggedIn={setIsLoggedIn} />;
  }

  if (selectedForm === 'register') {
    return <RegisterForm onClose={handleCloseForm} setIsLoggedIn={setIsLoggedIn} />;
  }

  return (
    <div className="auth-form">
      {(successMessage || errorMessage) && (
        <div className={`auth-form__message-box ${successMessage ? 'auth-form__message-box--success' : 'auth-form__message-box--error'}`}>
          {successMessage || errorMessage}
        </div>
      )}
      <div className="auth-form__header">
        <button className="auth-form__close-button" onClick={onClose}>×</button>
      </div>
      <div className='auth-form__buttons'>
        <button className='auth-form__login-button' onClick={() => handleFormSelect('login')}>Login</button>
        <button className='auth-form__register-button' onClick={() => handleFormSelect('register')}>Register</button>
        <button className='auth-form__guest-login-button' onClick={handleGuestLogin}>Guest Login</button>
      </div>

    </div>
  )
};

export default AuthForm;