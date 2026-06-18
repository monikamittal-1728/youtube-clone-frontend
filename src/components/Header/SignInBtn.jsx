import React from "react";
import { FaRegUserCircle } from "react-icons/fa";

const SignInBtn = () => {
  return (
    <button className="flex items-center gap-2 text-[#3ea6ff] border border-gray-700 rounded-full px-2.5 py-1.5 text-sm font-medium hover:bg-[#263850] transition-colors duration-200">
      <FaRegUserCircle className="text-xl" />
      Sign in
    </button>
  );
};

export default SignInBtn;