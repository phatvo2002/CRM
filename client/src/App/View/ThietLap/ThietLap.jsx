import React, { useEffect, useState } from "react";
import { Box, Button, ThemeProvider } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import UserApi from "../../Api/UserApi";
import { Container } from "@mui/material";
import Switch from "@mui/material/Switch";
import Swal from "sweetalert2";
import CreateIcon from "@mui/icons-material/Create";
import AuthApi from "../../Api/AuthApi";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import ModalUpdateRole from "./Modal/ModalUpdateRole";
const ThietLap = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const handleSwitchChange = (id, newValue) => {
    // Update the state or make an API call to update the database
  };

  const [checked, setChecked] = useState(false);
  const [dataCheck, setDataCheck] = useState();
  const [selectedRow, setSelectedRow] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModalUpdateRole , setOpenModalUpdateRole] = useState(false);
  const [title, setTitle] = useState("");
  const titleChange = (event) => {
    if (event.target.checked === true) {
      return "Bạn có muốn kích hoạt tài khoản không ?";
    } else {
      return "Bạn có muốn hủy kích hoạt tài khoản không ?";
    }
  };

  const handleOpenModalUpdate = () => {
    setOpenModalUpdateRole(true)
  }
  const handleCloseModalUpdate = () => {
    setOpenModalUpdateRole(false)
  }

  const handleChange = async (event) => {
    Swal.fire({
      title: titleChange(event),
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có",
    }).then((result) => {
      if (result.isConfirmed) {
        setChecked(event.target.checked);
        if (checked === false) {
          setDataCheck(false);
        } else {
          setDataCheck(true);
        }
        const dataActive = {
          id: selectedRow[0],
          isActive: !event.target.checked,
        };
        ActiveAccount(dataActive);
        Swal.fire({
          title: "Thành công",
          icon: "success",
        });
        setLoading(true);
      }
    });
  };

  const handleDeleteNguoiDung = () =>{
    Swal.fire({
      title: "Bạn có muốn xóa người dùng này",
      text: "Người dùng này sẽ bị xóa vĩnh viễn",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có"
    }).then((result) => {
      if (result.isConfirmed) {
          UserApi.deleteUser(selectedRow[0])
          Swal.fire({
            title: "Xóa công",
            icon: "success",
          });
           setLoading(true)
      }
    });
  }

  const getData = async () => {
    const response = await UserApi.getAllUserData();
    setLoading(true);
    if (response.length > 0) {
      setLoading(false);
      setUser(response);
    } else {
      setUser([]);
    }
  };

  const ActiveAccount = async (data) => {
    if (data) {
      const response = await AuthApi.ActiveAccount(data);
      if (response.status === 200) {
        setTitle(response.message);
        setLoading(true);
      } else {
        setTitle("đã có lỗi khi xảy ra");
        setLoading(false);
      }
    }
  };

  const gotoLink = async () => {
    navigate("/nguoidung/themmoi");
  };

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (loading) getData();
    setLoading(false);
  }, [loading]);
  const columns = [
    {
      field: "",
      headerName: "Action",
      width: 150,
      renderCell: () => (
        <div>
          <Button onClick={handleOpenModalUpdate}>
            <CreateIcon>

            </CreateIcon>
          </Button>
          <Button disabled={selectedRow.length > 0 ? false : true}>
            <DeleteIcon  onClick={handleDeleteNguoiDung}></DeleteIcon>
          </Button>
        </div>
      ),
    },
    { field: "hoVaDem", headerName: "Họ Và Đệm", width: 200, flex: 1 },
    { field: "ten", headerName: "Tên", width: 200, flex: 1 },
    { field: "diaChi", headerName: "Địa Chỉ", width: 200, flex: 1 },
    { field: "soDienThoai", headerName: "Số điện thoại", width: 200, flex: 1 },
    { field: "email", headerName: "Tài khoản Email", width: 200, flex: 1 },
    {
      field: "isActive",
      headerName: "Active",
      width: 150,
      renderCell: (params) => (
        <Switch
          checked={params.row.isActive}
          onClick={handleChange}
          disabled={selectedRow.length === 0}
          inputProps={{ "aria-label": "controlled" }}
        />
      ),
    },
  
  ];
  return (
    <Container style={{ maxWidth: "100%" }}>
      <div style={{ width: "100%" }}>
        <h2>DANH SÁCH TÀI KHOẢN</h2>
        <p>Quản lý danh sách người dùng của LPCRM</p>
        <Button
          variant="contained"
          style={{ marginTop: "10px", marginLeft: "86%" }}
          onClick={gotoLink}
        >
          {" "}
          <AddIcon></AddIcon> Thêm mới tài khoản
        </Button>
        <DataGrid
          rows={user}
          columns={columns}
          style={{ marginTop: "10px" }}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setSelectedRow(newRowSelectionModel);
          }}
          pageSizeOptions={[5, 10]}
          
        />
      </div>
      {/* Modal UpdateRole */}
      <ModalUpdateRole openModal={openModalUpdateRole} selectedRow={selectedRow} closeModal={handleCloseModalUpdate} />
    </Container>
  );
};

export default ThietLap;
