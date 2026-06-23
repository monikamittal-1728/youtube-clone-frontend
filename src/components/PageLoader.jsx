import React from 'react'

const PageLoader = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-primary gap-4">

    {/* 5 Colorful Bouncing Dots */}
    <div className="flex items-center gap-2">
      <div className="w-5 h-5 rounded-full bg-red-700 animate-bounce" style={{ animationDelay: "0ms" }} />
      <div className="w-5 h-5 rounded-full bg-red-500 animate-bounce" style={{ animationDelay: "100ms" }} />
      <div className="w-5 h-5 rounded-full bg-red-300 animate-bounce" style={{ animationDelay: "200ms" }} />
      <div className="w-5 h-5 rounded-full bg-red-200 animate-bounce" style={{ animationDelay: "300ms" }} />
      <div className="w-5 h-5 rounded-full bg-red-100 animate-bounce" style={{ animationDelay: "400ms" }} />
    </div>

    {/* Loading Text */}
    <p className="text-secondary text-2xl tracking-widest">
      Loading content....
    </p>

  </div>
);

export default PageLoader;