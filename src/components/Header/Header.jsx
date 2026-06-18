import React, { useState } from "react";
import { SiYoutube } from "react-icons/si";
import { HiOutlineBars3 } from "react-icons/hi2";
import { FiSearch } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import SignInBtn from "./SignInBtn";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    setSearchQuery("");
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-14 bg-[#0f0f0f]">
      
      {/* Left — Hamburger + Logo */}
      <div className="flex items-center gap-3">
        <HiOutlineBars3 className="text-2xl text-white cursor-pointer hover:bg-[#272727] rounded-full p-1 text-4xl" />
        <div className="flex items-center gap-1 cursor-pointer">
          <SiYoutube className="text-red-600 text-3xl" />
          <span className="font-medium text-white text-2xl -tracking-[0.07em]">
            YouTube
          </span>
          <sup className="text-[10px] font-normal text-white ml-0 -translate-y-1">IN</sup>
        </div>
      </div>

      {/* Center — Search */}
      <div className="flex items-center w-[40%]">
        <div className="relative w-full">
          {/* Search icon inside left — only when focused */}
          {isFocused && (
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white text-lg" />
          )}

          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`w-full bg-[#121212] text-white border border-[#303030] rounded-l-full py-2 text-sm outline-none focus:border-blue-500 ${
              isFocused ? "pl-10 pr-8" : "px-4"
            }`}
          />

          {/* Clear icon — only when text is typed */}
          {searchQuery && (
            <IoCloseOutline
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-xl cursor-pointer hover:bg-[#272727] rounded-full"
              onClick={handleClear}
            />
          )}
        </div>

        <button className="bg-[#222222] border border-[#303030] border-l-0 rounded-r-full px-5 py-2.5 text-white hover:bg-[#3d3d3d]">
          <FiSearch className="text-lg" />
        </button>
      </div>

      {/* Right — Create + Sign In */}
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 bg-stone-800 text-white border border-[#303030] rounded-full px-4 py-1.5 text-sm hover:bg-stone-700">
          <FaPlus className="text-sm" />
          Create
        </button>
        <SignInBtn />
      </div>

    </div>
  );
};

export default Header;