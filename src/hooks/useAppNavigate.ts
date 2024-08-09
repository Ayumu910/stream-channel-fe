import { useNavigate, NavigateOptions, To } from 'react-router-dom';

export const useAppNavigate = () => {
  const navigate = useNavigate();
  return (path: To, options?: NavigateOptions) => {
    if (typeof path === 'string') {
      // ベースパスを取得 (例: '/stream-channel-fe/')
      const basePath = import.meta.env.BASE_URL || '/';

      // パスからベースパスを除去（重複を防ぐため）
      const cleanPath = path.replace(new RegExp(`^${basePath}`), '');

      // 新しいパスを構築
      const newPath = `${basePath}${cleanPath.startsWith('/') ? cleanPath.slice(1) : cleanPath}`;

      console.log('Navigating to:', newPath); // デバッグ用
      navigate(newPath, options);
    } else {
      navigate(path, options);
    }
  };
};