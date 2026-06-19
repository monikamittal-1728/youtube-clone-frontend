import React, { useState } from "react";
import { SiYoutube } from "react-icons/si";
import { HiOutlineBars3 } from "react-icons/hi2";
import { FiSearch } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import SignInBtn from "./SignInBtn";

const Header = ({setSidebarOpen}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const handleClear = () => setSearchQuery("");

  // ── Mobile Search View ───────────────────────────────
  if (mobileSearchOpen) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center px-2 h-14 bg-primary gap-2">
        {/* Back arrow */}
        <button
          className="icon-btn p-2 rounded-full"
          onClick={() => {
            setMobileSearchOpen(false);
            setSearchQuery("");
          }}
        >
          <IoArrowBack className="text-2xl text-primary" />
        </button>

        {/* Search input */}
        <div className="relative flex-1">

 {isFocused && (
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-lg" />
          )}
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`search-input h-10 w-full rounded-l-full text-sm outline-none ${
              isFocused ? "pl-10 pr-10" : "px-4"
            }`}
          />
          {searchQuery && (
            <button
              onClick={handleClear}
              className="absolute right-2 top-1/2 -translate-y-1/2 icon-btn p-1 rounded-full"
            >
              <IoCloseOutline className="text-primary text-xl" />
            </button>
          )}
          {searchQuery && (
            <button
              onClick={handleClear}
              className="absolute right-2 top-1/2 -translate-y-1/2 icon-btn p-1 rounded-full"
            >
              <IoCloseOutline className="text-primary text-xl" />
            </button>
          )}
        </div>

        {/* Search button */}
        <button className="search-btn h-10 text-primary border-theme border-l-0 rounded-r-full px-5 flex items-center justify-center  -ml-3">
          <FiSearch className="text-lg" />
        </button>
      </header>
    );
  }

  // ── Default Header View ──────────────────────────────
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-14 bg-primary">

      {/* Left — Hamburger + Logo */}
      <div className="flex items-center gap-3">
        <button onClick={()=>setSidebarOpen(prev => !prev)} className="icon-btn p-2 rounded-full cursor-pointer">
          <HiOutlineBars3 className="text-3xl text-primary" />
        </button>
        <div className="flex items-center gap-1 cursor-pointer">
          <SiYoutube className="text-red-600 text-3xl" />
          <span className="font-medium text-primary text-2xl -tracking-[0.07em]">
            YouTube
          </span>
          <sup className="text-[10px] text-secondary -translate-y-1">IN</sup>
        </div>
      </div>

      {/* Center — Search (hidden on mobile) */}
      <div className="hidden md:flex items-center w-[40%]">
        <div className="relative w-full">
          {isFocused && (
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-lg" />
          )}
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`search-input h-10 w-full rounded-l-full text-sm outline-none ${
              isFocused ? "pl-10 pr-10" : "px-4"
            }`}
          />
          {searchQuery && (
            <button
              onClick={handleClear}
              className="absolute right-2 top-1/2 -translate-y-1/2 icon-btn p-1 rounded-full"
            >
              <IoCloseOutline className="text-primary text-xl" />
            </button>
          )}
        </div>
        <button className="search-btn h-10 text-primary border-theme border-l-0 rounded-r-full px-6 flex items-center justify-center">
          <FiSearch className="text-lg" />
        </button>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">

        {/* Mobile — Search icon only */}
        <button
          className="icon-btn p-2 rounded-full md:hidden"
          onClick={() => setMobileSearchOpen(true)}
        >
          <FiSearch className="text-2xl text-primary" />
        </button>

        {/* Desktop — Create button */}
        <button className="create-btn hidden md:flex text-primary border-theme rounded-full px-4 py-1.5 text-sm items-center gap-2 cursor-pointer">
          <FaPlus className="text-sm" />
          Create
        </button>

        {/* Desktop — Sign In */}
        <div className="hidden md:block">
          <SignInBtn />
        </div>

        {/* Mobile — User icon only */}
        <button className="icon-btn p-2 rounded-full md:hidden">
          <FaRegUserCircle className="text-2xl text-primary" />
        </button>

      </div>
    </header>
  );
};

export default Header;