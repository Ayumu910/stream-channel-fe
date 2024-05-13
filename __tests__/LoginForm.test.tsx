import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '../src/components/auth/LoginForm';

describe('LoginForm', () => {
  const mockOnClose = jest.fn();
  const mockSetIsLoggedIn = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders login form', () => {
    render(<LoginForm onClose={mockOnClose} setIsLoggedIn={mockSetIsLoggedIn} />);
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    render(<LoginForm onClose={mockOnClose} setIsLoggedIn={mockSetIsLoggedIn} />);
    fireEvent.click(screen.getByRole('button', { name: /×/ }));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('updates email and password fields', () => {
    render(<LoginForm onClose={mockOnClose} setIsLoggedIn={mockSetIsLoggedIn} />);
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  test('displays success message on successful login', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ token: 'mockToken' }),
    });

    render(<LoginForm onClose={mockOnClose} setIsLoggedIn={mockSetIsLoggedIn} />);
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(screen.getByText('Login successful')).toBeInTheDocument();
      expect(mockSetIsLoggedIn).toHaveBeenCalledWith(true);
    });
  });

  test('displays error message on failed login', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Invalid credentials' }),
    });

    render(<LoginForm onClose={mockOnClose} setIsLoggedIn={mockSetIsLoggedIn} />);
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
      expect(mockSetIsLoggedIn).not.toHaveBeenCalled();
      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });
});

describe('dotenv file', () => {
  test('read dotenv file', () => {
    expect(process.env.VITE_LOCAL_API_URL === 'http://localhost:3000');
    expect(`${process.env.VITE_LOCAL_API_URL}/api/login` === 'http://localhost:3000/api/login');
  })
})