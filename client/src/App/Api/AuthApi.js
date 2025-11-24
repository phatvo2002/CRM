import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "/api/v1" // Khi deploy trên Vercel (qua proxy)
    : process.env.REACT_APP_API_URL; 

const Token = localStorage.getItem("token");

const login = (taiKhoan, password) => {
  return axios
    .post(`${API_URL}/Auth/Login`, { taiKhoan, password })
    .then((res) => res.data);
};

const loginGoogle = (token) => {
  return axios
    .post(`${API_URL}/Auth/LoginWithGoogle`, { token })
    .then((res) => res.data);
};

const ActiveEmailService = (passwordEmail, email) => {
  return axios
    .put(`${API_URL}/Auth/ActiveMailSerVices/${passwordEmail}/${email}`, null, {
      headers: { Authorization: `Bearer ${Token}` },
    })
    .then((res) => res.data);
};

const ActiveAccount = (data) => {
  return axios
    .put(`${API_URL}/Auth/ActiveAccount`, data, {
      headers: { Authorization: `Bearer ${Token}` },
    })
    .then((res) => res.data);
};

const ChangePassword = (id, NewPassword, OldPassword) => {
  return axios
    .put(
      `${API_URL}/Auth/ChangePassword?id=${id}&OldPassword=${OldPassword}&NewPassword=${NewPassword}`,
      null,
      {
        headers: { Authorization: `Bearer ${Token}` },
      }
    )
    .then((res) => res.data);
};

export default {
  login,
  loginGoogle,
  ActiveEmailService,
  ActiveAccount,
  ChangePassword,
};
