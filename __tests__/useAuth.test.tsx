// useAuth.test.ts
import { renderHook } from '@testing-library/react';
import jwt from 'jsonwebtoken';
import { useAuth } from '../src/hooks/useAuth';

describe('useAuth', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });


  it('トークンの有効期限を超えていない場合、isLoggedInが true になる', () => {
    //2023年6月1日12時30分0秒に生成したトークン（有効期限 30分）
    const token = jwt.sign({ userId: 'user-id', exp: Math.floor(new Date('2023-06-01T12:30:00').getTime() / 1000) + 1800 }, 'secret');
    localStorage.setItem('token', token);

    //2023年6月1日12時45分0秒に検証
    jest.spyOn(Date, 'now').mockImplementation(() => new Date('2023-06-01T12:45:00').getTime());

    //実行
    const { result } = renderHook(() => useAuth());

    expect(result.current.isLoggedIn).toBe(true);
  });

  it('トークンの有効期限を超えている場合、isLoggedInが false になる', () => {
    //2023年6月1日12時30分0秒に生成したトークン（有効期限 30分）
    const token = jwt.sign({ userId: 'user-id', exp: Math.floor(new Date('2023-06-01T12:30:00').getTime() / 1000) + 1800 }, 'secret');
    localStorage.setItem('token', token);

    //2023年6月1日13時30分1秒に検証
    jest.spyOn(Date, 'now').mockImplementation(() => new Date('2023-06-01T13:00:01').getTime());

    const { result } = renderHook(() => useAuth());

    expect(result.current.isLoggedIn).toBe(false);
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('トークンが無効な場合、isLoggedInがfalseになる', () => {
    const token = 'invalid-token';
    localStorage.setItem('token', token);

    const { result } = renderHook(() => useAuth());

    expect(result.current.isLoggedIn).toBe(false);
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('トークンが存在しない場合、isLoggedInがfalseになる', () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current.isLoggedIn).toBe(false);
  });
});