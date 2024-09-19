import axios from "axios";

const API_URL = "https://localhost:7211/api/v1";
const Token = localStorage.getItem("token");

const GetChucVu = () => {
    return axios
    .get(`${API_URL}/ChucVu/getAllChucVu`, {
      headers: { Authorization: `Bearer ${Token}` },
    })
    .then((response) => response.data);
}
const AddChucVU = (data) => {
  return axios.post(`${API_URL}/ChucVu/createChucVu`,data ,{
    headers: { Authorization: `Bearer ${Token}` },
  })
  .then((response) => response.data);
}
const deleteChucVu = (id) => {
  return axios.delete(`${API_URL}/ChucVu/deleteChucVu?id=${id}` ,{
    headers: { Authorization: `Bearer ${Token}` },
  })
  .then((response) => response.data);
}
export default {
    GetChucVu,
    AddChucVU,
    deleteChucVu
};
