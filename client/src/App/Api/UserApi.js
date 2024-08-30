import axios from "axios";

const API_URL = "https://localhost:7211/api/v1";
const Token = localStorage.getItem("token");

const getAllUserData = () => {
  return axios
    .get(`${API_URL}/User/getAllUser`, {
      headers: { Authorization: `Bearer ${Token}` },
    })
    .then((response) => response.data);
};

const insertUser = (data) => {
  return axios.post(`${API_URL}/User/createUser`,data ,{
    headers: { Authorization: `Bearer ${Token}` },
  })
  .then((response) => response.data);
}

const deleteUser = (id) => {
  return axios.delete(`${API_URL}/User?id=${id}` ,{
    headers: { Authorization: `Bearer ${Token}` },
  })
  .then((response) => response.data);
}


export default {
  getAllUserData,
  insertUser,
  deleteUser
};
