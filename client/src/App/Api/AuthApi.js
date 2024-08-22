import axios from "axios";

const API_URL = "https://localhost:7211/api/v1";

const login = (taiKhoan, password) => {
  return axios
    .post(`${API_URL}/Auth/Login`, { taiKhoan, password })
    .then((response) => response.data);
};

const getUserData = (token) => {
  return axios
    .get(`${API_URL}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data);
};

export default {
  login,
  getUserData,
};
