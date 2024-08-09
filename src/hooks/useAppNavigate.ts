import { useNavigate, NavigateOptions, To } from 'react-router-dom';

export const useAppNavigate = () => {
  const navigate = useNavigate();
  return (path: To, options?: NavigateOptions) => {
    if (typeof path === 'string') {
      // ベースパスを取得 (例: '/stream-channel-fe/')
      const basePath = import.meta.env.BASE_URL || '/';

      // 新しいパスを構築
      let newPath = `${basePath}${path.startsWith('/') ? path.slice(1) : path}`;

      // stream-channel-fe が重複している場合、重複を除去
      newPath = newPath.replace(`${basePath}${basePath}`, basePath);

      // 最終的なパスを構築（末尾のスラッシュを除去）
      const finalPath = newPath.replace(/\/+$/, '');

      navigate(finalPath, options);
    } else {
      navigate(path, options);
    }
  };
};