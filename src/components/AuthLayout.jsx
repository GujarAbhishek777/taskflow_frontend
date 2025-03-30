import React from 'react';
// import { LogIn } from 'lucide-react';
import logo from '../assets/logo.png'; 


export function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="px-8 py-6 bg-gradient-to-b from-gray-50 to-gray-100">
          <div className="flex items-center justify-center mb-4">
            {/* <LogIn className="h-8 w-8 text-indigo-600" /> */}
                <div className="flex justify-center mb-4">
                <img src={logo} style={{maxWidth:"65%"}} alt="TaskFlow Logo" />
                 </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800">{title}</h2>
          <p className="text-center text-gray-600 mt-1">{subtitle}</p>
        </div>
        <div className="px-8 py-6">
          {children}
        </div>
      </div>
    </div>
  );
}