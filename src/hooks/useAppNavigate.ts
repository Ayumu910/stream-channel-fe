import { useNavigate, NavigateOptions, To } from 'react-router-dom';

export const useAppNavigate = () => {
  const navigate = useNavigate();
  return (path: To, options?: NavigateOptions) => {
    if (typeof path === 'string') {
      const basePath = import.meta.env.BASE_URL || '/';
      const newPath = `${basePath}${path.startsWith('/') ? path.slice(1) : path}`;
      navigate(newPath, options);
    } else {
      navigate(path, options);
    }
  };
};