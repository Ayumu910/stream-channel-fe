import '@testing-library/jest-dom'
import React, {useContext} from 'react';
import jwt from 'jsonwebtoken';
import { render, screen, act } from '@testing-library/react';
import { AuthContext, AuthProvider } from '../src/contexts/AuthContext';

const TestComponent: React.FC = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  return (
    <div>
      <p data-testid="isLoggedIn">{isLoggedIn.toString()}</p>
      <button onClick={() => setIsLoggedIn(!isLoggedIn)}>Toggle Login</button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('初期状態では isLoggedIn が false であること', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('isLoggedIn')).toHaveTextContent('false');
  });

  test('setIsLoggedIn を呼び出すと isLoggedIn が更新されること', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    act(() => {
      screen.getByText('Toggle Login').click();
    });

    expect(screen.getByTestId('isLoggedIn')).toHaveTextContent('true');

    act(() => {
      screen.getByText('Toggle Login').click();
    });

    expect(screen.getByTestId('isLoggedIn')).toHaveTextContent('false');
  });

  test('有効なトークンがある場合、isLoggedIn が true になること', () => {
    const validToken  = jwt.sign({ userId: 'user-id', exp: Date.now() / 1000 + 9999999999 }, 'secret');
    localStorage.setItem('token', validToken);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('isLoggedIn')).toHaveTextContent('true');
  });

  test('無効なトークンがある場合、isLoggedIn が false になること', () => {
    const invalidToken = 'invalid-token';
    localStorage.setItem('token', invalidToken);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('isLoggedIn')).toHaveTextContent('false');
  });
});