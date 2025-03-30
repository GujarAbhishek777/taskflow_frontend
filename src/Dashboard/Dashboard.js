import React, { useState } from "react";
import { FaTasks, FaUserFriends, FaEnvelope, FaBars, FaTimes, FaBell, FaSignOutAlt } from "react-icons/fa";
import logo from "./../assets/logo.png";

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

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
              <li className="p-4 hover:bg-gray-700 flex items-center">
                <FaUserFriends size={20} className="mr-3" /> {isSidebarOpen && "Users"}
              </li>
              <li className="p-4 hover:bg-gray-700 flex items-center">
                <FaTasks size={20} className="mr-3" /> {isSidebarOpen && "Tasks"}
              </li>
              <li className="p-4 hover:bg-gray-700 flex items-center">
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
            <FaBell size={24} className="text-gray-600 cursor-pointer hover:text-gray-800" />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              + Add Task
            </button>
          </div>
        </header>

        {/* Task Cards */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Task 1</h3>
            <p className="text-gray-600">Complete UI design.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Task 2</h3>
            <p className="text-gray-600">Fix authentication bug.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Task 3</h3>
            <p className="text-gray-600">Deploy backend API.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
