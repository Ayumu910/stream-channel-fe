import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterForm from '../src/components/auth/RegisterForm';

describe('RegisterForm', () => {
  const mockOnClose = jest.fn();
  const mockSetIsLoggedIn = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form correctly', () => {
    render(<RegisterForm onClose={mockOnClose} setIsLoggedIn={mockSetIsLoggedIn} />);
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', () => {
    render(<RegisterForm onClose={mockOnClose} setIsLoggedIn={mockSetIsLoggedIn} />);
    fireEvent.click(screen.getByText('×'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('submits the form with valid data and sets isLoggedIn to true', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ token: 'mockToken' }),
    });

    render(<RegisterForm onClose={mockOnClose} setIsLoggedIn={mockSetIsLoggedIn} />);
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
      expect(mockSetIsLoggedIn).toHaveBeenCalledWith(true);
      expect(screen.getByText('Registration successful')).toBeInTheDocument();
    });
  });

  it('displays an error message in token when registration fails', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Registration failed' }),
    });

    render(<RegisterForm onClose={mockOnClose} setIsLoggedIn={mockSetIsLoggedIn} />);
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Register' }));

    await waitFor(() => {
      expect(screen.getByText('Registration failed')).toBeInTheDocument();
    });
  });
});