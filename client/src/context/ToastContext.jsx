import { createContext, useContext, useState } from "react";
import Toast from "../components/Toast/Toast";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({
    message: "",
    type: "",
  });

  const showToast = (message, type = "success") => {
    setToast({
      message,
      type,
    });

    setTimeout(() => {
      setToast({
        message: "",
        type: "",
      });
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() =>
          setToast({
            message: "",
            type: "",
          })
        }
      />
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}