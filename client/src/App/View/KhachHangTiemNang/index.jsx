import React, { useEffect, useState } from "react";
import { ActionComponents } from "./components/Action";
import { Button, Grid, IconButton } from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";
import AddIcon from "@mui/icons-material/Add";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomDatagrid from "App/Components/DataGrid/CustomDatagrid";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import { TYPE_MODAL } from '../../Until/constant';
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import {
  useDeleteKhachHangTiemNangMutation,
  useGetKhachHangTiemNangByNguoiDungIdQuery,
  useGetKhachHangTiemNangByPhongBanIdQuery,
} from "App/Api/KhachHangTiemNangApi";
import UpdateKhachHangTiemNang from "./components/UpdateKhachHangTiemNang";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
const KhachHangTiemNang = () => {
  const [selectedRow, setSelectedRow] = useState([]);
  const navigate = useNavigate();
  const gotoLink = () => {
    navigate("/tiemnang/themmoikhachhangtiemnang");
  };


  const columns = [
    {
      field: "action",
      width: 150,
      headerName: "Thao tác",
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 5,
            margin: 5,
          }}
        >
          <Tooltip title="Sửa thông tin ">
            <IconButton disabled={selectedRow.length === 0} style={{}} onClick={onOpenModalUpdateKhachHang}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xóa">
            <IconButton disabled={selectedRow.length === 0} style={{}} onClick={()=> handleDeletePhongBan(params?.id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Bàn giao công việc">
            <IconButton disabled={selectedRow.length === 0} style={{}}>
              <ScreenShareIcon />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
    // { field: "hoVaDem", headerName: "Họ Và Đệm", flex: 1 },
    {
      field: "tenKhachHang",
      headerName: "Họ và tên",
      width: 200,
      renderCell: (params) => (
        <div
        >
          <Link to={`/tiemnang/${params.id}`} style={{textDecoration:"none"}}>
            {params.value}
          </Link>
        </div>
      ),
    },    
     { field: "diaChi", headerName: "Địa Chỉ", width: 200},
    { field: "soDienThoai", headerName: "Số điện thoại di động", width: 200 },
    {
      field: "soDienThoaiCoQuan",
      headerName: "Số điện thoại cơ quan",
      width: 200,
    },
    { field: "emailCaNhan", headerName: "Email cá nhân", width: 200 },
    { field: "EmailCoQuan", headerName: "Tài khoản", width: 200 },
    { field: "nguonGoc", headerName: "Nguồn gốc khách hàng", width: 200 },
    { field: "linhVuc", headerName: "Lĩnh vực", width: 200 },
    { field: "nghenghiep", headerName: "Nghề nghiệp", width: 200 },
  ];

  const userData = JSON.parse(localStorage.getItem("authorizationData"));
  const [rows, setRows] = useState([]);
  const [openModalUpdate , setOpenModalUpdate] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  const [loading ,setLoading] = useState(false);
  const { data: dataKhachHangByNguoiDung } =
  useGetKhachHangTiemNangByNguoiDungIdQuery(userData?.response?.id, {
    skip:
      userData?.response.checkIsTruongPhong === true ||
      userData?.response.checkIsGiamDoc === true,
  });
const { data: dataKhachHangPhongBan ,refetch} =
  useGetKhachHangTiemNangByPhongBanIdQuery(userData?.response?.phongBan?.id, {
    skip:
      userData?.response.checkIsTruongPhong === false &&
      userData?.response.checkIsGiamDoc === false,
  });
  const [deleteNguoiDung] = useDeleteKhachHangTiemNangMutation()
  const onOpenModalUpdateKhachHang = () => {
    setOpenModalUpdate(true)
    setTypeModal(TYPE_MODAL.UPDATE)
  }
  const onCloseModalUpdateKhachHang = ()=>{
    setOpenModalUpdate(false)
    setTypeModal("");
  }

  const handleDeletePhongBan = async (id) =>{
    if( userData?.response.checkIsTruongPhong === false &&
      userData?.response.checkIsGiamDoc === false)
      {
        toast.warning("Chỉ có trưởng phòng mới có quyền xóa khách hàng")
      }
    else
    {
      Swal.fire({
        title: "Bạn có muốn xóa khách hàng này",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Có"
      }).then(async (result) =>  {
        if (result.isConfirmed) {
           await deleteNguoiDung(id)
            Swal.fire({
              title: "Xóa thành công",
              icon: "success",
            });
            refetch()
        }
      });
    }
   
  }
  


  useEffect(() => {
    if (userData?.response?.checkIsTruongPhong === true) {
      setRows(dataKhachHangPhongBan);
    } else {
      setRows(dataKhachHangByNguoiDung);
    }
  }, [dataKhachHangByNguoiDung, dataKhachHangPhongBan,userData]);
  const handleRowSelectionChange = (selectedRows) => {
    setSelectedRow(selectedRows);
  };
  return (
    <div className="customer-page">
      <div>
        <Grid container alignItems="center" spacing={2}>
          <Grid>
            <h2>Khách hàng tiềm năng</h2>
          </Grid>
          <Grid sx={{ marginLeft: 20 }}>
            <Button
              variant="outlined"
              color="success"
              startIcon={<GetAppIcon />}
            >
              Xuất Template
            </Button>
            <Button
              variant="outlined"
              color="warning"
              sx={{ marginLeft: 1 }}
              startIcon={<FileDownloadDoneIcon />}
            >
              IMPORT
            </Button>
            <Button
              variant="outlined"
              sx={{ marginLeft: 1 }}
              startIcon={<AddIcon />}
              onClick={gotoLink}
            >
              Thêm mới
            </Button>
          </Grid>
        </Grid>
        <Grid>
          <CustomDatagrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[10, 25, 50]}
            initialPageSize={25}
            checkboxSelection={false}
            showTopToolbar={true}
            onRowSelectionChange={handleRowSelectionChange}
          />
        </Grid>

        {/* Bảng dữ liệu khách hàng */}
          <UpdateKhachHangTiemNang
    selectedItem={selectedRow} 
    closeModal={onCloseModalUpdateKhachHang}   
    typeModal={typeModal}
    setTypeModal={setTypeModal}
    showModal={openModalUpdate}
    setLoading={setLoading}
    refetch = {refetch}
  />
      </div>

      {/* Phần lịch sử giao dịch */}
      <ActionComponents />
    </div>
    
  );
};

export default KhachHangTiemNang;
