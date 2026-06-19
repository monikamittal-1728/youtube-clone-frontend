import { GoHome } from "react-icons/go";
import { SiYoutubeshorts } from "react-icons/si";
import {
  MdOutlineLocalFireDepartment,
  MdOutlineMovie,
  MdOutlinePodcasts,
  MdOutlineStream,
} from "react-icons/md";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { RiShoppingBag4Line } from "react-icons/ri";
import { PiGameController } from "react-icons/pi";
import { GiClothes } from "react-icons/gi";
import { MdOutlineSchool } from "react-icons/md";
import SignInBtn from "../Header/SignInBtn";
import { useLocation } from "react-router-dom";
import useIsMobile from "../../hooks/useIsMobile";
import { FaRegUserCircle } from "react-icons/fa";

const collapsedNavItems = [
  { icon: <GoHome className="text-2xl" />, label: "Home" },
  { icon: <SiYoutubeshorts className="text-2xl" />, label: "Shorts" },
  { icon: <FaRegUserCircle className="text-2xl" />, label: "You" },
];

const navItems = [
  { icon: <GoHome className="text-2xl" />, label: "Home" },
  { icon: <SiYoutubeshorts className="text-2xl" />, label: "Shorts" },
];

const exploreItems = [
  {
    icon: <MdOutlineLocalFireDepartment className="text-2xl" />,
    label: "Trending",
  },
  { icon: <RiShoppingBag4Line className="text-2xl" />, label: "Shopping" },
  { icon: <IoMusicalNotesOutline className="text-2xl" />, label: "Music" },
  { icon: <MdOutlineMovie className="text-2xl" />, label: "Movies" },
  { icon: <PiGameController className="text-2xl" />, label: "Gaming" },
  { icon: <MdOutlinePodcasts className="text-2xl" />, label: "Podcasts" },
  { icon: <MdOutlineStream className="text-2xl" />, label: "Live" },
  { icon: <MdOutlineSchool className="text-2xl" />, label: "Courses" },
];

const Sidebar = ({ setSidebarOpen, sidebarOpen }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isMobile = useIsMobile();
  const showOverlayMode = !isHomePage || isMobile;
  
  if (!showOverlayMode && !sidebarOpen) {
    return (
      <aside className="fixed top-14 left-0 h-[calc(100vh-56px)] w-20 bg-primary py-2">
        <div className="flex flex-col gap-2">
          {collapsedNavItems.map((item) => (
            <button
              key={item.label}
              className="flex flex-col items-center gap-1 py-3 hover:bg-hover rounded-xl"
            >
              {item.icon}
              <span className="text-[10px] text-primary">{item.label}</span>
            </button>
          ))}
        </div>
      </aside>
    );
  }

  return (
    <>
      {showOverlayMode && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={`
    fixed
    top-14
    left-0
    h-[calc(100vh-56px)]
    bg-primary
    overflow-y-auto
    scrollbar-hide
    px-2 py-2
    z-50
    transition-all duration-300

    ${
      showOverlayMode
        ? `
          w-60
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `
        : `
          ${sidebarOpen ? "w-60" : "w-20"}
        `
    }
  `}
      >
        {/* Nav Items */}
        <div className="flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              className="flex items-center gap-5 px-3 py-2 rounded-xl hover:bg-hover text-primary w-full text-left"
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        <hr className="border-[#3f3f3f] my-3" />

        {/* Sign In Box */}
        <div className="px-3 py-3 flex flex-col gap-3">
          <p className="text-sm text-secondary leading-snug">
            Sign in to like videos, comment, and subscribe.
          </p>
          <div className="w-fit">
            <SignInBtn />
          </div>
        </div>

        <hr className="border-[#3f3f3f] my-3" />

        {/* Explore */}
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-semibold text-primary px-3 mb-1">
            Explore
          </h2>
          {exploreItems.map((item) => (
            <button
              key={item.label}
              className="flex items-center gap-5 px-3 py-2 rounded-xl hover:bg-hover text-primary w-full text-left"
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
