import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterForm from '../src/components/auth/RegisterForm';
import { AuthContext } from '../src/contexts/AuthContext';


describe('RegisterForm', () => {
  const onCloseMock = jest.fn();
  const setIsLoggedInMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form correctly', () => {
    render(
      <AuthContext.Provider value={{ isLoggedIn: false, setIsLoggedIn: setIsLoggedInMock }}>
        <RegisterForm onClose={onCloseMock} />
      </AuthContext.Provider>
    );
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', () => {
    render(
      <AuthContext.Provider value={{ isLoggedIn: false, setIsLoggedIn: setIsLoggedInMock }}>
        <RegisterForm onClose={onCloseMock} />
      </AuthContext.Provider>
    );
    fireEvent.click(screen.getByText('×'));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('submits the form with valid data and sets isLoggedIn to true', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ token: 'mockToken' }),
    });

    render(
      <AuthContext.Provider value={{ isLoggedIn: false, setIsLoggedIn: setIsLoggedInMock }}>
        <RegisterForm onClose={onCloseMock} />
      </AuthContext.Provider>
    );
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Register' }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `${process.env.VITE_LOCAL_API_URL}/api/accounts`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: 'test@example.com', password: 'password123' }),
        }
      );

      expect(screen.getByText('Registration successful')).toBeInTheDocument();
    });
  });

  it('displays an error message in token when registration fails', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Registration failed' }),
    });

    render(
      <AuthContext.Provider value={{ isLoggedIn: false, setIsLoggedIn: setIsLoggedInMock }}>
        <RegisterForm onClose={onCloseMock} />
      </AuthContext.Provider>
    );
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Register' }));

    await waitFor(() => {
      expect(screen.getByText('Registration failed')).toBeInTheDocument();
    });
  });
});