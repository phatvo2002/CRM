import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthApi from "../Api/AuthApi";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authState, setAuthState] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthState(token);
    } else {
      setAuthState(null);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await AuthApi.login(email, password);
      if (response.status === 200) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("userId", response.id);
        localStorage.setItem("roleId",response.maChucVu);
        localStorage.setItem("authorizationData", JSON.stringify({ response }));
        setAuthState(response.token);
        setIsAuthenticated(true)
        navigate("/user/profile");
        toast.success("Đăng nhập thành công")
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        Swal.fire({
          title: "Tài khoản chưa được kích hoạt !",
          icon: "error",
          showCancelButton: false,
          showConfirmButton: false,
        });
        setIsAuthenticated(false)
        setTimeout(() => {
          window.location.reload();
        }, 1500);
        navigate("/login");
      }
      //   const userData = await AuthApi.getUserData(token);
      //   setUser(userData);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = () => {
    localStorage.clear()
    setUser(null);
    navigate("/login");
    toast.success("Đăng xuất thành công")
  };

  return (
    <AuthContext.Provider value={{ authState, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
