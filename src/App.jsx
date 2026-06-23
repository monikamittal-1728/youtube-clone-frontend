import React from "react";
import Header from "./components/Header/Header";
import Sidebar from "./components/SideSlider/Sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import useIsMobile from "./hooks/useIsMobile";

const App = () => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  return (
    <div
      style={{
        backgroundColor: "var(--bg-primary)",
      }}
      className="w-screen h-screen"
    >
      <Header setSidebarOpen={setSidebarOpen} />
      <Sidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
      <Outlet context={{ sidebarOpen }} />
    </div>
  );
};

export default App;
