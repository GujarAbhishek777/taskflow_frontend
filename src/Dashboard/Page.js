import React, { useState } from "react";
import { FaTasks, FaUserFriends, FaEnvelope, FaBars, FaTimes, FaBell, FaSignOutAlt,FaTachometerAlt } from "react-icons/fa";
import logo from "./../assets/logo.png";
import { useNavigate } from "react-router-dom";


const Page = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

    // Count tasks per status
    
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed h-full bg-gray-900 text-white transition-all duration-300 flex flex-col justify-between ${isSidebarOpen ? "w-64" : "w-16"}`}>
        <div>
          <button className="text-white p-4 focus:outline-none" onClick={() => setSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          <nav className="mt-4">
            <ul>
              <li className="p-4 hover:bg-gray-700 flex items-center cursor-pointer" onClick={()=>{
                navigate('/dashboard');
              }}>
                <FaTachometerAlt size={20} className="mr-3" /> {isSidebarOpen && "Dashboard"}
                </li>
              <li className="p-4 hover:bg-gray-700 flex items-center" onClick={()=>{
                navigate('/users');
              }}>
                <FaUserFriends size={20} className="mr-3" /> {isSidebarOpen && "Users"}
              </li>
              <li className="p-4 hover:bg-gray-700 flex items-center" onClick={()=>{
                navigate('/tasks');
              }}>
                <FaTasks size={20} className="mr-3" /> {isSidebarOpen && "Tasks"}
              </li>
              <li className="p-4 hover:bg-gray-700 flex items-center" onClick={()=>{
                navigate('/messages');
              }}>
                <FaEnvelope size={20} className="mr-3" /> {isSidebarOpen && "Messages"}
              </li>
            </ul>
          </nav>
        </div>
        
        {/* Logout Button */}
        <button className="p-4 hover:bg-red-600 flex items-center w-full text-left">
          <FaSignOutAlt size={20} className="mr-3" /> {isSidebarOpen && "Logout"}
        </button>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-16"}`}>
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <div>
            <img src={logo} style={{ maxWidth: "150px" }} alt="TaskFlow Logo" />
          </div>
          <div className="flex items-center space-x-4">
  {/* Notification Icon */}
  <button className="relative p-2 rounded-full hover:bg-gray-200 focus:outline-none">
    <FaBell size={24} className="text-gray-600" />
    {/* Notification Badge */}
    <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
  </button>

            {/* User Profile */}
            <div className="flex items-center space-x-2">
                {/* Avatar with Status Indicator */}
                <div className="relative">
                <img
                    className="w-10 h-10 rounded-full border-2 border-white"
                    src={'https://www.gravatar.com/avatar/HASH?d=identicon'}
                    alt="User Avatar"
                />
                {/* Status Indicator */}
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                </div>

                {/* Username */}
                <span className="text-gray-700 font-semibold pr-10">{username || 'Abhishek Gujar'}</span>
            </div>
            </div>

        </header>

      {/* Other components should be inside  */}
      {children}
            
      </div>



    </div>
  );
};

export default Page;
