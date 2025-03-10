import axios from "axios";
import React, { useEffect, useState } from "react";

const Topbar = () => {
    const [user, setUser] = useState();
    const token = localStorage.getItem("token");
    useEffect(() => {
        const fetchUserData = async () => {
          if (token) {
            try {
              const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/profile`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              if(res?.data?.user){
                setUser(res?.data?.user)
                console.log(res?.data?.user);
                
              }
            } catch (error) {
              console.error("Failed to fetch user data", error);
            }
          }
        };
    
        fetchUserData();
      }, [token]);
    
  return (
    <>
      <div className="flex justify-between items-start px-4 pt-2 h-18 shadow">
      <div>
        <h1 className="text-2xl text-gray-100 font-bold">DASHBOARD</h1>
        <p className="text-sm text-gray-400">Hey, {user?.name}</p>
        </div>
        <div className="avatar w-8">
          
          <label htmlFor="my-drawer" className="drawer-button">
          <img
            src={user?.image}
            alt="avatar"
            className="w-8 rounded-full"
          />
          </label>
        </div>
      </div>

      <div className="drawer">
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Page content here */}
    {/* <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open drawer</label> */}
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay bg-black"></label>
    <ul className="menu bg-black opacity-100 text-base-content min-h-full w-60 p-4">
      {/* Sidebar content here */}
      <li><a>Sidebar Item 1</a></li>
      <li><a>Sidebar Item 2</a></li>
    </ul>
  </div>
</div>
    </>
  );
};

export default Topbar;
