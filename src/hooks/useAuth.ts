import { useState, useEffect } from 'react';
import { jwtDecode, JwtPayload  } from "jwt-decode";

export interface DecodedToken extends JwtPayload {
    userId: string;
    exp: number;
    iat: number;
}

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        const currentTime = Date.now() / 1000;  //UTC 基準で秒単位に変換
        if (decodedToken.exp > currentTime) {
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem('token');
          setIsLoggedIn(false);
        }
      } catch (error) {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return { isLoggedIn, setIsLoggedIn };
};