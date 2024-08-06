import { useNavigate, NavigateOptions, To } from 'react-router-dom';

export const useAppNavigate = () => {
  const navigate = useNavigate();
  return (path: To, options?: NavigateOptions) => {
    const basePath = import.meta.env.BASE_URL || '/';
    if (typeof path === 'string') {
      const fullPath = `${basePath.replace(/\/$/, '')}/${path}`.replace(/\/+/g, '/');
      navigate(fullPath, options);
    } else {
      navigate(path, options);
    }
  };
};