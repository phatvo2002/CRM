import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
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
