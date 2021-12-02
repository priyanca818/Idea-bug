import { useEffect, FC } from 'react';
import { createPortal } from 'react-dom';

export const Portal: FC = ({ children }) => {
  const mount = document.getElementById('portal-root');
  const el = document.createElement('div');

  useEffect(() => {
    if (!mount) return;

    mount.appendChild(el);

    return () => {
      mount.removeChild(el);
    };
  }, [el, mount]);

  return createPortal(children, el);
};

export default Portal;
