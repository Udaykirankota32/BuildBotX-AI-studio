import { createContext, useState, useEffect } from 'react';

export const ToastContext = createContext(null);

function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (toast) {
      const timerId = setTimeout(() => {
        setToast(null);
      }, 3000);

      return () => clearTimeout(timerId);
    }
  }, [toast]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  return (
    <ToastContext.Provider value={{ toast, showToast }}>
      {children}
      {toast && (
        <div className={`toast-notification toast-${toast.type}`}>
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export { ToastProvider };
