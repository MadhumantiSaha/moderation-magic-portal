
import React from "react";

const GradientBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <div className="absolute top-0 left-0 right-0 h-[800px] bg-gradient-to-br from-brand-50 via-white to-blue-50 -z-10"></div>
      <div
        className="absolute top-[50%] -left-[50%] w-[100%] h-[500px] rounded-full bg-brand-100/30 blur-3xl animate-pulse-slow -z-10"
        style={{ animationDelay: "0s" }}
      ></div>
      <div
        className="absolute top-[30%] -right-[25%] w-[50%] h-[300px] rounded-full bg-blue-100/30 blur-3xl animate-pulse-slow -z-10"
        style={{ animationDelay: "2s" }}
      ></div>
    </div>
  );
};

export default GradientBackground;
