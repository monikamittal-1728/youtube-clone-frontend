import { useState } from "react";
import Toast from "./Toast";

// Singleton adder — callable from anywhere via useToast()
let _addToast = null;

export const useToast = () => ({
  showToast: (message, type = "success", duration = 3000) => {
    _addToast?.({ id: Date.now(), message, type, duration });
  },
});

const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  // Register the adder globally once mounted
  _addToast = (toast) => setToasts((prev) => [...prev, toast]);

  const remove = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto">
          <Toast
            message={t.message}
            type={t.type}
            duration={t.duration}
            onClose={() => remove(t.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;