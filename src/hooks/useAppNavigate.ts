import { useNavigate, NavigateOptions, To } from 'react-router-dom';

export const useAppNavigate = () => {
  const navigate = useNavigate();
  return (path: To, options?: NavigateOptions) => {
    if (typeof path === 'string') {
      // 現在のパスを取得
      const currentPath = window.location.pathname;
      // ベースパスを取得 (例: '/stream-channel-fe')
      const basePath = import.meta.env.BASE_URL || '/';

      // 絶対パスの場合（'/'で始まる場合）
      if (path.startsWith('/')) {
        // ベースパスを追加して絶対パスとして扱う
        navigate(`${basePath}${path.slice(1)}`, options);
      } else {
        // 相対パスの場合
        // 現在のパスからベースパスを除いた部分を取得
        const currentPathWithoutBase = currentPath.slice(basePath.length - 1);
        // 現在のパスの最後のスラッシュまでを取得
        const currentDir = currentPathWithoutBase.slice(0, currentPathWithoutBase.lastIndexOf('/') + 1);
        // 新しいパスを構築
        const newPath = `${basePath}${currentDir}${path}`.replace(/\/+/g, '/');
        navigate(newPath, options);
      }
    } else {
      navigate(path, options);
    }
  };
};