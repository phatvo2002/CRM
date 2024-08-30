import axios from "axios";

const API_URL = "https://localhost:7211/api/v1";
const Token = localStorage.getItem("token");

const getTinhTrang = () => {
    return axios
    .get(`${API_URL}/TinhTrang/GetAllTinhTrang`, {
      headers: { Authorization: `Bearer ${Token}` },
    })
    .then((response) => response.data);
}
export default {
    getTinhTrang
};
