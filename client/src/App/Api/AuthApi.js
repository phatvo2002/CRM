import axios from "axios";

const API_URL = "https://localhost:7211/api/v1";
const Token = localStorage.getItem("token");

const login = (taiKhoan, password) => {
  return axios
    .post(`${API_URL}/Auth/Login`, { taiKhoan, password })
    .then((response) => response.data);
};

const ActiveAccount = (data) => {
  return axios
    .put(`${API_URL}/Auth/ActiveAccount`, data, {
      headers: { Authorization: `Bearer ${Token}` },
    })
    .then((response) => response.data);
};

const ChangePassword = (id , NewPassword  , OldPassword) => {
  return axios
  .put(`${API_URL}/Auth/ChangePassword?id=${id}&OldPassword=${OldPassword}&NewPassword=${NewPassword}`,null, {
    headers: { Authorization: `Bearer ${Token}` },
  })
  .then((response) => response.data);
}

export default {
  login,
  ActiveAccount,
  ChangePassword
};
