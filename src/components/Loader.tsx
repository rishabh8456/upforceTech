import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="items-center justify-center bg-slate-100">
      <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid w-16 h-16"></div>
    </div>
  );
};

export default LoadingSpinner;
