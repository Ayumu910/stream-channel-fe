import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AuthForm from '../src/components/auth/AuthForm';
import { AuthContext } from '../src/contexts/AuthContext';

describe('AuthForm', () => {
  const onCloseMock = jest.fn();
  const setIsLoggedInMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders AuthForm correctly', () => {
    render(
      <AuthContext.Provider value={{ isLoggedIn: false, setIsLoggedIn: setIsLoggedInMock }}>
        <AuthForm onClose={onCloseMock} />
      </AuthContext.Provider>
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
    expect(screen.getByText('Guest Login')).toBeInTheDocument();
  });

  test('handles login form selection correctly', () => {
    render(
      <AuthContext.Provider value={{ isLoggedIn: false, setIsLoggedIn: setIsLoggedInMock }}>
        <AuthForm onClose={onCloseMock} />
      </AuthContext.Provider>
    );

    fireEvent.click(screen.getByText('Login'));
    expect(screen.getByRole('heading', { level: 2, name: 'Login' })).toBeInTheDocument();
  });

  test('handles register form selection correctly', () => {
    render(
      <AuthContext.Provider value={{ isLoggedIn: false, setIsLoggedIn: setIsLoggedInMock }}>
        <AuthForm onClose={onCloseMock} />
      </AuthContext.Provider>
    );

    fireEvent.click(screen.getByText('Register'));
    expect(screen.getByRole('heading', { level: 2, name: 'Register' })).toBeInTheDocument();
  });

  test('handles guest login correctly', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: 'fake-token' }),
    });

    render(
      <AuthContext.Provider value={{ isLoggedIn: false, setIsLoggedIn: setIsLoggedInMock }}>
        <AuthForm onClose={onCloseMock} />
      </AuthContext.Provider>
    );
    fireEvent.click(screen.getByText('Guest Login'));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `${process.env.VITE_LOCAL_API_URL}/api/guest-login`,
        { method: 'POST' }
      );
      expect(setIsLoggedInMock).toHaveBeenCalledWith(true);
      expect(screen.getByText('Login successful')).toBeInTheDocument();
    });
  });

  test('handles guest login error correctly', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Login failed' }),
    });

    render(
      <AuthContext.Provider value={{ isLoggedIn: false, setIsLoggedIn: setIsLoggedInMock }}>
        <AuthForm onClose={onCloseMock} />
      </AuthContext.Provider>
    );
    fireEvent.click(screen.getByText('Guest Login'));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `${process.env.VITE_LOCAL_API_URL}/api/guest-login`,
        { method: 'POST' }
      );
      expect(screen.getByText('Login failed')).toBeInTheDocument();
    });
  });
});