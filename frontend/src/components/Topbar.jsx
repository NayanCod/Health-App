import React from "react";

const Topbar = () => {
  return (
    <>
      <div className="flex justify-between items-center px-4 py-4 h-12 shadow">
        <h1 className="text-2xl text-gray-100 font-bold">DASHBOARD</h1>
        <div className="avatar w-8">
          <img
            className="w-8 rounded-full"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          />
        </div>
      </div>
    </>
  );
};

export default Topbar;
