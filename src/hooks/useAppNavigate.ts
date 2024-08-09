import { useNavigate, NavigateOptions, To } from 'react-router-dom';

export const useAppNavigate = () => {
  const navigate = useNavigate();
  return (path: To, options?: NavigateOptions) => {
    if (typeof path === 'string') {
      const basePath = import.meta.env.BASE_URL || '/';
      const normalizedBasePath = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
      const normalizedPath = path.startsWith('/') ? path : `/${path}`;

      // 現在のURL内にbasepathが既に含まれているかチェック
      const currentPath = window.location.pathname;
      const basePathIncluded = currentPath.startsWith(normalizedBasePath);

      // basepathが含まれていない場合のみ追加
      const fullPath = basePathIncluded ? normalizedPath : `${normalizedBasePath}${normalizedPath}`;

      navigate(fullPath, options);
    } else {
      navigate(path, options);
    }
  };
};