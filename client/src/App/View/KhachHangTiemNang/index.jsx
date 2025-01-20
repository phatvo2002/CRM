import React, { useEffect, useState } from "react";
import { ActionComponents } from "./components/Action";
import { Button, Grid, Grid2, IconButton, Menu, MenuItem, Paper } from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";
import AddIcon from "@mui/icons-material/Add";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import CustomDatagrid from "src/App/Components/DataGrid/CustomDatagrid";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import { TYPE_MODAL } from "../../Until/constant";
import EmailIcon from '@mui/icons-material/Email';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ThreePIcon from '@mui/icons-material/ThreeP';
import Person2Icon from '@mui/icons-material/Person2';
import UpdateIcon from '@mui/icons-material/Update';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PhoneIcon from '@mui/icons-material/Phone';
import {
  useDeletehangLoatKhachHangTiemNangMutation,
  useDeleteKhachHangTiemNangMutation,
  useGetKhachHangTiemNangByroleQuery,
  useGetTemplatesQuery,
} from "src/App/Api/KhachHangTiemNangApi";
import UpdateKhachHangTiemNang from "./components/UpdateKhachHangTiemNang";
import ModalBanGiaoKhachHang from "./Modal/ModalBanGiaoKhachHang";
import ModalXemKhachHangDaXoa from "./Modal/ModalXemKhachHangDaXoa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
const KhachHangTiemNang = () => {
  const [selectedRow, setSelectedRow] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isActionOpen, setIsActionOpen] = useState(false);
  const [KhachHangDaXoaModal , setKhachHangDaXoaModal] = useState(false);
  const handleOpen = () => setIsActionOpen(true);
  const handleClose = () => setIsActionOpen(false);
  const handleOpenModalXem = () => setKhachHangDaXoaModal(true)
  const handleCloseModalXem = () => setKhachHangDaXoaModal(false)
  const navigate = useNavigate();
  const gotoLink = () => {
    navigate("/tiemnang/themmoikhachhangtiemnang");
  };
  const gotoLinkImport = () => {
    navigate("/tiemnang/uploadkhachhang");
  }

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
            <IconButton
              disabled={selectedRow.length == 0}
              style={{}}
              onClick={onOpenModalUpdateKhachHang}
            >
              <EditIcon color="success" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xóa">
            <IconButton
              disabled={selectedRow.length == 0}
              style={{}}
              onClick={() => handleDeletePhongBan(params?.id)}
            >
              <DeleteIcon  color="error"/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Bàn giao tiềm năng">
            <IconButton disabled={selectedRow.length == 0} style={{}}
              onClick={() => handleOpenModalBanGiaoKhachHang()}
            >
              <ThreePIcon color="primary"/>
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
    // { field: "hoVaDem", headerName: "Họ Và Đệm", flex: 1 },
    {
      field: "",
      headerName: "Nhân viên chăm sóc",
      width: 200,
      renderCell: (params) => {
        return params?.row?.nguoiDung?.ten ? (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <AssignmentIndIcon style={{ padding: 2 }} color="warning" />
            <span> {params?.row?.nguoiDung?.hoVaDem} {params?.row?.nguoiDung?.ten}</span>
          </div>
        ) : (
          <div></div>
        );
      }
    },
    {
      field: "tenKhachHang",
      headerName: "Họ và tên",
      width: 200,
      renderCell: (params) => (
        <div>
          <Link
            to={`/tiemnang/${params.id}`}
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "inherit",
            }}
          >
            <Person2Icon style={{ color: "#1976d2" }} />
            <span style={{  fontWeight: "500" }}>
              {params.value}
            </span>
          </Link>
        </div>
      ),      
    },
    { field: "diaChi", headerName: "Địa Chỉ", width: 200 },
    {
      field: "soDienThoaiDiDong",
      headerName: "Số điện thoại cá nhân",
      width: 200,
      renderCell: (params) => {
        return params.value ? (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <PhoneIcon style={{ padding: 2 }} color="success" />
            <span>{params.value}</span>
          </div>
        ) : (
          <div></div>
        );
      }
    },
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
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseDrop = () => {
    setAnchorEl(null);
  };
  const userData = JSON.parse(localStorage.getItem("authorizationData"));
  const [rows, setRows] = useState([]);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  const [loading, setLoading] = useState(false);
  const [openModalBanGiao, setOpenModalBanGiao] = useState(false);
  const { data: getTemplate } = useGetTemplatesQuery({
    path: "Templates/ThongTinTiemNang.xlsx",
    filename: "ThongTinTiemNang",
  });
  const {data: dataKHByRole , refetch : refetchkh} = useGetKhachHangTiemNangByroleQuery()
  const [deleteNguoiDung] = useDeleteKhachHangTiemNangMutation();
  const [deleteHangLoat] = useDeletehangLoatKhachHangTiemNangMutation()
  const onOpenModalUpdateKhachHang = () => {
    setOpenModalUpdate(true);
    setTypeModal(TYPE_MODAL.UPDATE);
  };
  const onCloseModalUpdateKhachHang = () => {
    setOpenModalUpdate(false);
    setTypeModal("");
  };
  const handleOpenModalBanGiaoKhachHang = () => {
    setOpenModalBanGiao(true);
    setTypeModal(TYPE_MODAL.UPDATE);
  }
  const handleCloseModalBanGiaoKhachHang = () => {
    setOpenModalBanGiao(false);
    setTypeModal("");
  }

  const handleDeletePhongBan = async (id) => {
    if (
      !userData?.response.checkIsTruongPhong &&
      userData?.response.maChucVu !== "6840b4ed-39ce-4d32-8c69-835d3356de42"
    ) {
      toast.warning(
        "Chỉ trưởng phòng hoặc nhân viên quản trị hệ thống mới có quyền xóa khách hàng."
      );
      return;
    }

    Swal.fire({
      title: "Bạn có muốn xóa khách hàng này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteNguoiDung(id);
        Swal.fire({
          title: "Xóa thành công",
          icon: "success",
        });
        refetchkh()
      }
    });
  };
  const handleDeleteMuliple =()=>
  {
    Swal.fire({
      title: "Bạn có muốn xóa những khách hàng này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có",
    }).then(async (result) => {
      if (result.isConfirmed) {
       await deleteHangLoat(selectedRow);
        Swal.fire({
          title: "Xóa thành công",
          icon: "success",
        });
        refetchkh()
      }
    });
  }
  const handleGetTemplates = () => {
    if (getTemplate) {
      const url = window.URL.createObjectURL(getTemplate);
      const a = document.createElement("a");
      a.href = url;
      a.download = "ThongTinTiemNang.xlsx";
      a.click();
      window.URL.revokeObjectURL(url);
    } else {
      console.error("Không có dữ liệu để tải file.");
    }
  };
  // useEffect(() => {
  //   if (userData?.response?.checkIsTruongPhong === true) {
  //     setRows(dataKhachHangPhongBan);
  //   } else {
  //     setRows(dataKhachHangByNguoiDung);
  //   }
  // }, [dataKhachHangByNguoiDung, dataKhachHangPhongBan, userData]);

  useEffect(()=>{
    setRows(dataKHByRole)
  },[dataKHByRole])

  const handleRowSelectionChange = (selectedRows) => {
    setSelectedRow(selectedRows);
  };
  
  return (
    <div className="customer-page">
      <div>
        <Grid2 container alignItems="center" spacing={2}>
          <Grid2 size={12}>
            <h2>Khách hàng tiềm năng</h2>

            <Button
              variant="outlined"
              sx={{ marginLeft: 1 }}
              startIcon={<AddIcon />}
              onClick={gotoLink}
            >
              Thêm mới
            </Button>
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              sx={{ marginLeft: 1, width: "200px" }}
              variant="outlined"
              startIcon={<OpenInNewIcon />}
            >
              Mở rộng
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseDrop}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleCloseDrop}>
                <Button
                  variant="outlined"
                  color="warning"
                  sx={{ marginLeft: 1, width: "200px" }}
                  startIcon={<FileDownloadDoneIcon />}
                  onClick={gotoLinkImport}
                >
                  IMPORT
                </Button>
              </MenuItem>
              <MenuItem onClick={handleCloseDrop}>
                <Button
                  variant="outlined"
                  color="success"
                  sx={{ marginLeft: 1, width: "200px" }}
                  startIcon={<GetAppIcon />}
                  onClick={handleGetTemplates}
                >
                  Xuất Template
                </Button>
              </MenuItem>
              <MenuItem onClick={handleCloseDrop}>
                <Button
                  variant="outlined"
                  sx={{ marginLeft: 1, width: "200px" }}
                  startIcon={<AutoDeleteIcon />}
                  color="error"
                  onClick={handleOpenModalXem}
                >
                  Thùng rác
                </Button>
              </MenuItem>
            </Menu>
            <Button onClick={handleOpen} sx={{ marginLeft: 1 }} variant="outlined" color="inherit" startIcon={<UpdateIcon/>}>Lịch sử tương tác</Button>
            <Button
              variant="outlined"
              color="error"
              sx={{ marginLeft: 1 }}
              startIcon={<DeleteOutlineIcon />}
              disabled={selectedRow.length == 0}
              onClick={handleDeleteMuliple}
            >
              Xóa hàng loạt
            </Button>
          </Grid2>
        </Grid2>
        <Paper >
          <Grid2 size={12}>
            <CustomDatagrid
              rows={rows}
              columns={columns}
              height={500}
              pageSizeOptions={[10, 25, 50]}
              initialPageSize={25}
              checkboxSelection={true}
              showTopToolbar={true}
              onRowSelectionChange={handleRowSelectionChange}
            />
          </Grid2>
        </Paper>


        {/* Bảng dữ liệu khách hàng */}
        <UpdateKhachHangTiemNang
          selectedItem={selectedRow}
          closeModal={onCloseModalUpdateKhachHang}
          typeModal={typeModal}
          setTypeModal={setTypeModal}
          showModal={openModalUpdate}
          setLoading={setLoading}
          refetch={refetchkh}
        />
        <ModalBanGiaoKhachHang
          selectedItem={selectedRow}
          closeModal={handleCloseModalBanGiaoKhachHang}
          typeModal={typeModal}
          setTypeModal={setTypeModal}
          showModal={openModalBanGiao}
          setLoading={setLoading}
        />
      </div>

      {/* Phần lịch sử giao dịch */}
      {isActionOpen && (
        <ActionComponents
          selectedItem={selectedRow}
          onClose={handleClose}
          isOpen={isActionOpen}
        />
      )}
      {/* xem khách hàng đã xóa */}
      <ModalXemKhachHangDaXoa 
        handleClose={handleCloseModalXem}
        open={KhachHangDaXoaModal}
        refetch={refetchkh}
      />
    </div>
  );
};

export default KhachHangTiemNang;
