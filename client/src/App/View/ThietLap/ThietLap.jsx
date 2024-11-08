import React, { useEffect, useState } from "react";
import {  Button, IconButton  } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import  { useDeleteUserMutation } from "../../Api/UserApi";
import { Container } from "@mui/material";
import Switch from "@mui/material/Switch";
import Swal from "sweetalert2";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import AuthApi from "../../Api/AuthApi";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ModalUpdateRole from "./Modal/ModalUpdateRole";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { useGetUserAllQuery } from "../../Api/UserApi";
import ModalUpdateDepartment from "./Modal/ModalUpdateDepartment";
import CustomDatagrid from "App/Components/DataGrid/CustomDatagrid";
import Tooltip from '@mui/material/Tooltip';
const ThietLap = () => {
  const navigate = useNavigate();
 // const [user, setUser] = useState([]);
 

  const [checked, setChecked] = useState(false);
  const [dataCheck, setDataCheck] = useState();
  const [selectedRow, setSelectedRow] = useState([]);
  const [loading, setLoading] = useState(false);
  const {data: userList ,refetch } = useGetUserAllQuery();
  const [deleteuser] = useDeleteUserMutation()
  const [rows, setRows] = useState([]);
  const [openModalUpdateRole , setOpenModalUpdateRole] = useState(false);
  const [openModalUpdateDepartment , setOpenModalUpdateDepartment] = useState(false);
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
    setSelectedRow([])
    setOpenModalUpdateRole(false)
    refetch()
  }
  const handleOpenModalUpdateDepartments = () => {
      setOpenModalUpdateDepartment(true)
  }
  const handleCloseModalUpdateDepartments = () => {
    setSelectedRow([])
    setOpenModalUpdateDepartment(false)
    refetch()
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
          id: selectedRow[0].id,
          isActive: !event.target.checked,
        };
        ActiveAccount(dataActive);
        Swal.fire({
          title: "Thành công",
          icon: "success",
        });
        refetch()
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
    }).then(async(result) => {
      if (result.isConfirmed) {
         await deleteuser(selectedRow[0]?.id)
          Swal.fire({
            title: "Xóa thành công",
            icon: "success",
          });
           refetch()
      }
    });
  }

  // const getData = async () => {
  //   const response = await UserApi.getAllUserData();
  //   setLoading(true);
  //   if (response.length > 0) {
  //     setLoading(false);
  //     setUser(response);
  //   } else {
  //     setUser([]);
  //   }
  // };

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

  // useEffect(() => {
  //   getData();
  // }, []);
  // useEffect(() => {
  //   if (loading) getData();
  //   setLoading(false);
  // }, [loading]);

  
useEffect(() => {
  if (userList) {
    setRows(userList);
  }
}, [userList]);


  const columns = [
   
   // { field: "hoVaDem", headerName: "Họ Và Đệm", flex: 1 },
    { field: "ten", headerName: "Tên", flex: 1 },
   // { field: "diaChi", headerName: "Địa Chỉ", width: 200, flex: 1 },
    { field: "soDienThoai", headerName: "Số điện thoại", flex: 1 },
    { field: "email", headerName: "Tài khoản Email", flex: 1 },
    { field: "taiKhoan", headerName: "Tài khoản", flex: 1 },
    {
      field: "phongBan",
      headerName: "Phòng ban",
      width: 150,
      renderCell: (params) => (
         <span>
          {params.row?.phongBan?.tenPhongBan}
         </span>
      ),
    },
    {
      field: "chucVu",
      headerName: "Chức vụ ",
      width: 150,
      renderCell: (params) => (
         <span>
          {params.row?.chucVu?.tenChucVu}
         </span>
      ),
    },
    {
      field: "isActive",
      headerName: "Kích hoạt tài khoản",
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
    // {
    //   field: "",
    //   headerName: "Hành động",
    //   width: 250,
    //   flex: 1,
    //   renderCell: () => (
    //     <div>
    //        <Button >
    //         <GroupIcon/>
    //       </Button>
    //       <Button onClick={handleOpenModalUpdate}>
    //         <CreateIcon>
    //         </CreateIcon>
    //       </Button>
    //       <Button disabled={selectedRow.length > 0 ? false : true}>
    //         <DeleteIcon  onClick={handleDeleteNguoiDung}></DeleteIcon>
    //       </Button>
    //     </div>
    //   ),
    // },
    {
      field: "action",
      flex: 1,
      width: 250,
      headerName: "Thao tác",
      renderCell: () => (
        <div style={{display:"flex",justifyContent:"space-between", alignItems:"center", padding: 5,margin: 5 }}> 
         <Tooltip title="Delete">
          <IconButton disabled={selectedRow.length === 0} style={{}} onClick={handleOpenModalUpdate}  > 
            <PermIdentityIcon ></PermIdentityIcon>
          </IconButton>
         </Tooltip>
          <IconButton disabled={selectedRow.length === 0} style={{}} onClick={handleOpenModalUpdateDepartments} > 
            <GroupAddIcon ></GroupAddIcon>
          </IconButton>
          <IconButton disabled={selectedRow.length === 0} style={{ }} onClick={handleDeleteNguoiDung} >
            <DeleteIcon  ></DeleteIcon>
          </IconButton>
        </div>
      ),
    }
  
  ];

  const handleRowSelectionChange = (selectedRows) => {
    setSelectedRow(selectedRows)
  };
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
          <PersonAddIcon /> Thêm mới tài khoản
        </Button>
  
        <CustomDatagrid
      rows={rows}
      columns={columns}
      pageSizeOptions={[10, 25, 50]}
      initialPageSize={25}
      checkboxSelection={false}
      showTopToolbar={true}
      onRowSelectionChange={handleRowSelectionChange}
    />
      </div>
      {/* Modal UpdateRole */}
      <ModalUpdateRole openModal={openModalUpdateRole} selectedRow={selectedRow} closeModal={handleCloseModalUpdate} />
      {/* Modal Update Department */}
      <ModalUpdateDepartment openModal={openModalUpdateDepartment} selectedRow={selectedRow} closeModal={handleCloseModalUpdateDepartments}/>
    </Container>
  );
};

export default ThietLap;
