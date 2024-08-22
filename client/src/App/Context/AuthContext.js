import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthApi from "../Api/AuthApi";
import toastr from "toastr";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authState, setAuthState] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // AuthApi.getUserData(token)
      //   .then((data) => {
      //     setUser(data);
      //   })
      //   .catch(() => {
      //     logout();
      //   });
      setAuthState(token);
    } else {
      setAuthState(null);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await AuthApi.login(email, password);
      console.log(response);
      localStorage.setItem("token", response.token);
      //   const userData = await AuthApi.getUserData(token);
      //   setUser(userData);
      //   navigate("/user/profile");
      setAuthState(response.token);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ authState, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
