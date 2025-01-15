import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect( () => {
    const time = setTimeout(onClose, 3000);
    return () => clearTimeout(time);
  }, [onClose]);

  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded shadow-lg text-white ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4">
          &times;
        </button>
      </div>
    </div>
  );
};

export default Toast;