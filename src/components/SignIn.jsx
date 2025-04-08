import React, {  useState, useContext, useEffect} from 'react';
import { Mail, Lock } from 'lucide-react';
import { ForgotPassword } from './ForgotPassword'; // Import ForgotPassword component
import axios from 'axios';
import Loader from './Loader';
import { AuthContext } from '../AuthProvider';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function SignIn({ onToggle }) {
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log("User already logged in:", user);
      // Redirect to dashboard or home page
      window.location.href = "/dashboard";
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('Sign in:', { email, password });
    axios.post(`${process.env.REACT_APP_API_URL}/api/v1/sign_in`, {
      email,
      password,
    })
    .then((response) => {
      console.log('Sign in success:', response.data);
      if (response.data.token) {
        localStorage.setItem("jwt", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
              Swal.fire({
                        title: "Success!",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false,
                      }).then(() => {
                        navigate("/dashboard"); // 👈 Redirect to login after success
                      });
      // Handle success - You might want to redirect, store the token, etc.
    })
    .catch((error) => {
      console.error('Sign in error:', error);
           Swal.fire({
                  title: "Error!",
                  text: "Something went wrong. Please try again.",
                  icon: "error",
                  // confirmButtonText: "OK",
                });
      // Handle error - Show error message, etc.
    }).finally(() => {
      setLoading(false); // Hide loader after API call completes
    });
  };

  

  return showForgotPassword ? (
    <ForgotPassword onToggle={() => setShowForgotPassword(false)} />
  ) : (
     <Loader  loading={loading} >
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="you@example.com"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="••••••••"
            required
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">Remember me</label>
        </div>
        <button
          type="button"
          onClick={() => setShowForgotPassword(true)}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Sign in
      </button>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onToggle}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign up
          </button>
        </p>
      </div>
    </form>
    </Loader>
  );
}
