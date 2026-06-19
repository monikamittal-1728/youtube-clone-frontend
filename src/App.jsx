import React from "react";
import Header from "./components/Header/Header";
import Sidebar from "./components/SideSlider/Sidebar";

const App = () => {
  return (
    <div
      style={{
        backgroundColor: "var(--bg-primary)",
      }}
      className="w-screen h-screen"
    >
      <Header />
      <div>
        <Sidebar/>
      </div>
    </div>
  );
};

export default App;
