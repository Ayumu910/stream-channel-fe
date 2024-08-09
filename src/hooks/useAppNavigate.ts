import { useNavigate, NavigateOptions, To } from 'react-router-dom';

export const useAppNavigate = () => {
  const navigate = useNavigate();
  return (path: To, options?: NavigateOptions) => {
    if (typeof path === 'string') {
      const relativePath = path.startsWith('/') ? path.slice(1) : path;
      navigate(relativePath, options);
    } else {
      navigate(path, options);
    }
  };
};