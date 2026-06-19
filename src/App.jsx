import React from "react";
import Header from "./components/Header/Header";
import Sidebar from "./components/SideSlider/Sidebar";
import { useState } from "react";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div
      style={{
        backgroundColor: "var(--bg-primary)",
      }}
      className="w-screen h-screen"
    >
      <Header setSidebarOpen={setSidebarOpen} />
      <Sidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
    </div>
  );
};

export default App;
