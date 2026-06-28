import { Link } from "react-router-dom";
import { MdSearchOff } from "react-icons/md";
import { IoHomeOutline, IoArrowBack } from "react-icons/io5";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0f0f0f] px-6">
      <div className="max-w-lg text-center">

        {/* Glowing icon block */}
        <div className="mx-auto mb-8 relative w-28 h-28">
          <div className="absolute inset-0 rounded-full bg-red-500/20 blur-xl" />
          <div className="relative flex h-full w-full items-center justify-center rounded-full border border-red-500/30 bg-red-500/10">
            <MdSearchOff className="text-red-500 text-5xl" />
          </div>
        </div>

        {/* 404 */}
        <h1 className="text-[96px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-gray-900 to-gray-400 dark:from-white dark:to-gray-600">
          404
        </h1>

        {/* Heading */}
        <h2 className="mt-2 text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Page not found
        </h2>

        {/* Description */}
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-sm mx-auto">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        {/* Divider */}
        <div className="mt-8 mb-8 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />

        {/* Buttons */}
        <div className="flex justify-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm text-white font-medium hover:bg-red-700 active:scale-95 transition-all duration-150"
          >
            <IoHomeOutline size={16} />
            Go home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] px-5 py-2.5 text-sm text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-[#272727] active:scale-95 transition-all duration-150"
          >
            <IoArrowBack size={16} />
            Go back
          </button>
        </div>

      </div>
    </div>
  );
};

export default NotFound;