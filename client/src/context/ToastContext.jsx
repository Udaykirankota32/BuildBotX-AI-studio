import { createContext, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import '../styles/toast.css';

export const ToastContext = createContext(null);

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    if (toasts.length > 0) {
      const timerId = setTimeout(() => {
        setToasts((prevToasts) => prevToasts.slice(1));
      }, 4000);

      return () => clearTimeout(timerId);
    }
  }, [toasts]);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
  };

  return (
    <ToastContext.Provider value={{ toasts, showToast }}>
      {children}
      {createPortal(
        <div className="toast-container">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`toast-notification toast-${toast.type}`}
              role="alert"
            >
              {toast.message}
            </div>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}

export { ToastProvider };
