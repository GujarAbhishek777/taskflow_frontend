import React, { createContext, useState, useEffect } from "react";
import Loader from './components/Loader'

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Start as true

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    console.log("sdjfkdsjf",token)
    if (token) {
      setLoading(true); 
      fetch(`${process.env.REACT_APP_API_URL}/api/v1/check_auth`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            setUser(data.user);
          } else {
            localStorage.removeItem("jwt");
            setUser(null); // ✅ Explicitly set user to null if token is invalid
          }
        })
        .catch(() => {
          localStorage.removeItem("jwt");
          setUser(null);
        })
        .finally(() => setLoading(false)); // ✅ Stop loading after request
    } else {
      setLoading(false); 
    }
  }, []);

  const login = (token, userData) => {
    localStorage.setItem("jwt", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {loading ? <Loader  loading={loading} /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
