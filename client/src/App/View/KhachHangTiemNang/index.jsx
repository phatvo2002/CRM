import React, { useState } from "react";
import { ActionComponents } from "./components/Action";
import { Button, Grid, IconButton,  } from "@mui/material";
import GetAppIcon from '@mui/icons-material/GetApp';
import AddIcon from '@mui/icons-material/Add';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import DeleteIcon from "@mui/icons-material/Delete";
import CustomDatagrid from "App/Components/DataGrid/CustomDatagrid";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from "react-router-dom";
const KhachHangTiemNang = () => {
  const [selectedRow, setSelectedRow] = useState([]);
  const navigate = useNavigate()
  const gotoLink = ()=> {
     navigate("/tiemnang/themmoikhachhangtiemnang")
  }
  const columns = [
   
    // { field: "hoVaDem", headerName: "Họ Và Đệm", flex: 1 },
     { field: "ten", headerName: "Họ và tên", flex: 1 },
    // { field: "diaChi", headerName: "Địa Chỉ", width: 200, flex: 1 },
     { field: "soDienThoai", headerName: "Số điện thoại di động", flex: 1 },
     { field: "soDienThoaiCoQuan", headerName: "Số điện thoại cơ quan", flex: 1 },
     { field: "emailCaNhan", headerName: "Email cá nhân", flex: 1 },
     { field: "EmailCoQuan", headerName: "Tài khoản", flex: 1 },
     { field: "nguonGoc", headerName: "Nguồn gốc khách hàng", flex: 1 },
     { field: "linhVuc", headerName: "Lĩnh vực", flex: 1 },
     { field: "nghenghiep", headerName: "Nghề nghi", flex: 1 },
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
    //  {
    //    field: "isActive",
    //    headerName: "Kích hoạt tài khoản",
    //    width: 150,
    //    renderCell: (params) => (
    //      <Switch
    //        checked={params.row.isActive}
    //        onClick={handleChange}
    //        disabled={selectedRow.length === 0}
    //        inputProps={{ "aria-label": "controlled" }}
    //      />
    //    ),
    //  },
  
     {
       field: "action",
       flex: 1,
       width: 250,
       headerName: "Thao tác",
       renderCell: () => (
         <div style={{display:"flex",justifyContent:"space-between", alignItems:"center", padding: 5,margin: 5 }}> 
          <Tooltip title="Phân quyền phân hệ">
           <IconButton disabled={selectedRow.length === 0} style={{}}  > 
             <PermIdentityIcon ></PermIdentityIcon>
           </IconButton>
          </Tooltip>
          <Tooltip title="Phân quyền phòng ban">
           <IconButton disabled={selectedRow.length === 0} style={{}}  > 
             <GroupAddIcon ></GroupAddIcon>
           </IconButton>
          </Tooltip>
           <IconButton disabled={selectedRow.length === 0} style={{ }}  >
             <DeleteIcon  ></DeleteIcon>
           </IconButton>
         </div>
       ),
     }
   
   ];
  return (
    <div className="customer-page">
      <div>
        <Grid container alignItems="center" spacing={2}>
          <Grid  >
            <h2>Khách hàng tiềm năng</h2>
          </Grid>
          <Grid sx={{marginLeft :20 }} >
            <Button variant="outlined" color="success" startIcon={<GetAppIcon />} >Xuất Template</Button>
            <Button variant="outlined"  color="warning" sx={{marginLeft:1}} startIcon={<FileDownloadDoneIcon/>} >IMPORT</Button>
            <Button variant="outlined" sx={{marginLeft:1}} startIcon={<AddIcon />} onClick={ gotoLink}>Thêm mới</Button>
          </Grid>
        </Grid>
        <Grid>

        </Grid>

        {/* Bảng dữ liệu khách hàng */}
      </div>

      {/* Phần lịch sử giao dịch */}
      <ActionComponents />
    </div>
  );
};

export default KhachHangTiemNang;
