import axios from "axios";

const API_URL = "https://localhost:7211/api/v1";
const Token = localStorage.getItem("token");

const GetAllMenu = () => {
    return axios
    .get(`${API_URL}/Menu/getallmenu`, {
      headers: { Authorization: `Bearer ${Token}` },
    })
    .then((response) => response.data);
}
const GetMenuRoleById = (roleId) => {
  return axios
    .get(`${API_URL}/Menu/getmenurole/${roleId}`, {
      headers: { Authorization: `Bearer ${Token}` },
    })
    .then((response) => response.data);
}

const UpdateMenuRole = (data) => {
  return axios
    .put(`${API_URL}/Menu/updategroup`, data ,{
      headers: { Authorization: `Bearer ${Token}` },
    })
    .then((response) => response.data);
}

export default {
    GetAllMenu,
    GetMenuRoleById,
    UpdateMenuRole
};