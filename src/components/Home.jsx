import React,{useEffect} from 'react';
import { 
  CheckCircle, 
  Users, 
  Calendar, 
  Bell, 
  BarChart,
  ClipboardList
} from 'lucide-react';
import logo from '../assets/logo.png'; 
import { useNavigate } from "react-router-dom";


const features = [
  {
    icon: <CheckCircle className="h-6 w-6" />,
    title: 'Task Management',
    description: 'Create, assign, and track tasks efficiently'
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Team Collaboration',
    description: 'Work together seamlessly with your team'
  },
  {
    icon: <Calendar className="h-6 w-6" />,
    title: 'Deadline Tracking',
    description: 'Never miss important deadlines'
  },
  {
    icon: <Bell className="h-6 w-6" />,
    title: 'Notifications',
    description: 'Stay updated with real-time alerts'
  },
  {
    icon: <BarChart className="h-6 w-6" />,
    title: 'Analytics',
    description: 'Track progress with detailed insights'
  },
  {
    icon: <ClipboardList className="h-6 w-6" />,
    title: 'Templates',
    description: 'Use pre-built templates for quick setup'
  }
];

const quickActions = [
  { name: 'Create Task', color: 'bg-blue-500' },
  { name: 'View Dashboard', color: 'bg-purple-500' },
  { name: 'Team Overview', color: 'bg-green-500' },
  { name: 'Settings', color: 'bg-gray-500' }
];


export default function Home() {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      console.log("User already logged in:", token);
      navigate("/dashboard"); // ✅ Redirect to dashboard instead of login
    }
  }, [navigate]); // 

  return (
    <div className="min-h-screen bg-gray-50">
        <div className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
    {/* Logo on the left */}
    <div>
      <img src={logo} style={{ maxWidth: "150px" }} alt="TaskFlow Logo" />
    </div>

    {/* Sign In & Sign Up buttons on the right */}
        <div className="flex space-x-4">
      {/* Sign In Button */}
      <button
        className="bg-transparent border border-blue-600 text-blue-600 font-semibold px-6 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
        onClick={() => navigate("/login")}
      >
        Sign In
      </button>

      {/* Sign Up Button */}
      <button
        className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 shadow-lg transition-all duration-300"
        onClick={() => navigate("/login")}
      >
        Sign Up
      </button>
    </div>

  </div>

      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Welcome to TaskFlow
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Streamline your workflow with our powerful task management platform
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
               onClick={() => navigate("/login")}
              >
                Get Started
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className={`${action.color} text-white p-4 rounded-lg hover:opacity-90 transition-opacity`}
              >
                {action.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Everything you need to manage tasks effectively
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Powerful features to help you and your team stay organized and productive
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-blue-600 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-400">10k+</div>
              <div className="mt-2 text-gray-400">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-400">50k+</div>
              <div className="mt-2 text-gray-400">Tasks Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-400">99%</div>
              <div className="mt-2 text-gray-400">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-400">24/7</div>
              <div className="mt-2 text-gray-400">Support</div>
            </div>
          </div>
        </div>
      </div>

     {/* Footer Section */}
      <footer className="bg-gray-800 text-gray-400 text-center py-4">
        © 2025 
        <a 
          href="https://scalewithabhi.in/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-400 font-semibold hover:underline ml-1"
        >
          ScaleWithAbhi
        </a>. 
        All Rights Reserved.
      </footer>

    </div>
  );
}