import { useEffect, useState } from "react";
import { MdCheckCircle, MdErrorOutline, MdClose } from "react-icons/md";

const ICONS = {
  success: <MdCheckCircle className="text-green-500 text-xl flex-shrink-0" />,
  error: <MdErrorOutline className="text-red-500 text-xl flex-shrink-0" />,
};

const BAR_COLORS = {
  success: "bg-green-500",
  error: "bg-red-500",
};

const Toast = ({ message, type = "success", duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showTimer  = setTimeout(() => setVisible(true), 10);
    const hideTimer  = setTimeout(() => setVisible(false), duration - 400);
    const closeTimer = setTimeout(onClose, duration);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearTimeout(closeTimer);
    };
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 400);
  };

  return (
    <div
      className={`relative flex items-center gap-3 min-w-[300px] max-w-sm
        px-4 py-3 rounded-xl shadow-2xl overflow-hidden
        bg-white dark:bg-[#272727]
        border border-gray-100 dark:border-[#3a3a3a]
        transition-all duration-300 ease-in-out
        ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"}`}
    >
      {ICONS[type]}

      <p className="text-sm text-gray-800 dark:text-gray-100 flex-1 leading-snug">
        {message}
      </p>

      <button
        onClick={handleClose}
        className="text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors"
      >
        <MdClose className="text-base" />
      </button>

      {/* Progress bar */}
      <span
        className={`absolute bottom-0 left-0 h-[3px] ${BAR_COLORS[type]}`}
        style={{ animation: `toast-shrink ${duration}ms linear forwards` }}
      />
    </div>
  );
};

export default Toast;