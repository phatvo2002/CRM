import {
  Button,
  Grid2,
  Paper,
  Tooltip,
  IconButton,
  MenuItem,
  Menu,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import GetAppIcon from "@mui/icons-material/GetApp";
import AddIcon from "@mui/icons-material/Add";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Person2Icon from "@mui/icons-material/Person2";
import AutoDeleteIcon from "@mui/icons-material/AutoDelete";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  useDeletehangLoatKhachHangMucTieuMutation,
  useDeleteKhachHangMucTieuMutation,
  useGetKhachHangMucTieuByNguoiDungIdQuery,
} from "src/App/Api/KhachHangMucTieuApi";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CustomDatagrid from "src/App/Components/DataGrid/CustomDatagrid";
import ThreePIcon from "@mui/icons-material/ThreeP";
import { ActionComponents } from "./Components/Action";
import UpdateIcon from "@mui/icons-material/Update";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from "react-router-dom";
import ModalUpdateKHMucTieu from "./Modal/ModalUpdateKHMucTieu";
import ModalBanGiaoKhachHangMucTieu from "./Modal/ModalBanGiaoKhachHangMucTieu";
import { useGetTemplatesQuery } from "src/App/Api/KhachHangTiemNangApi";
import ModalImportKhachHang from "./Modal/ModalImportKhachHang";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import ModalKhachHangMucTieuDaXoa from "./Modal/ModalKhachHangMucTieuDaXoa";
const KhachHangMucTieu = () => {
  const [selectedRow, setSelectedRow] = useState([]),
    [rows, setRows] = useState([]),
    [anchorEl, setAnchorEl] = useState(null),
    [modalUpdateKhachHang, setModalUpdateKhachHang] = useState(false),
    [modalbanGiao, setModalBanGiao] = useState(false),
    [modalKhDaXoa, setModalKhDaXoa] = useState(false),
    [modalImportKhachHangMucTeu, setModalImportKhachHangMucTeu] =
      useState(false),
    navigate = useNavigate(),
    [isActionOpen, setIsActionOpen] = useState(false),
    handleOpen = () => setIsActionOpen(true),
    handleOpenModalBanGiao = () => setModalBanGiao(true),
    handleCloseModalBanGiao = () => setModalBanGiao(false),
    handleOpenKhDaXoa = () => setModalKhDaXoa(true),
    handleCloseKhDaXoa = () => setModalKhDaXoa(false);
  const handleCloseAction = () => {
    setIsActionOpen(false);
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
            <IconButton
              disabled={selectedRow.length === 0}
              style={{}}
              onClick={handleOpenModalUpdateKhachHang}
            >
              <EditIcon color="success" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xóa">
            <IconButton
              disabled={selectedRow.length === 0}
              style={{}}
              onClick={() => handleDeleteKhachHang(params?.id)}
            >
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Bàn giao khách hàng">
            <IconButton
              disabled={selectedRow.length === 0}
              style={{}}
              onClick={handleOpenModalBanGiao}
            >
              <ThreePIcon color="primary" />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
    {
      field: "",
      headerName: "Nhân viên chăm sóc",
      width: 200,
      renderCell: (params) => {
        return params?.row?.nguoiDung?.ten ? (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <AssignmentIndIcon style={{ padding: 2 }} color="warning" />
            <span>
              {" "}
              {params?.row?.nguoiDung?.hoVaDem} {params?.row?.nguoiDung?.ten}
            </span>
          </div>
        ) : (
          <div></div>
        );
      },
    },
    {
      field: "tenKhachHang",
      headerName: "Tên khách hàng",
      width: 200,
      renderCell: (params) => (
        <div>
          <Link
            to={`/khachhang/${params.id}`}
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "inherit",
            }}
          >
            <Person2Icon style={{ color: "#1976d2" }} />
            <span style={{ fontWeight: "500" }}>{params.value}</span>
          </Link>
        </div>
      ),
    },
    { field: "id", headerName: "Mã khách hàng", width: 200 },
    { field: "tenVietTat", headerName: "Tên viết tắt", width: 200 },
    { field: "maSoThue", headerName: "Mã số thuế", width: 200 },
    // {
    //   field: "soDienThoai",
    //   headerName: "Số điện thoại cá nhân",
    //   width: 200,
    //   renderCell: (params) => (
    //     <div>
    //       {params.value ?  <div><PhoneIcon/>{params.value}</div> : <div></div>}
    //     </div>
    //   ),
    // },
    {
      field: "soDienThoai",
      headerName: "Số điện thoại",
      width: 200,
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "nguongoc",
      headerName: "Nguồn gốc khách hàng",
      width: 200,
      renderCell: (params) => (
        <div>{params?.row?.nguonGocKhachHang?.tenNguonGoc}</div>
      ),
    },
    {
      field: "tiemnang",
      headerName: "Loại khách hàng",
      width: 200,
      renderCell: (params) => (
        <div>{params?.row?.loaiTiemNang?.tenLoaiTiemNang}</div>
      ),
    },
  ];
  const gotoLink = () => {
    navigate("/khachhang/themmoikhachhang");
  };
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const userData = JSON.parse(localStorage.getItem("authorizationData"));
  const { data: dataKhachHangByNguoiDung, refetch } =
    useGetKhachHangMucTieuByNguoiDungIdQuery();
  const { data: getTemplate } = useGetTemplatesQuery({
    path: "Templates/ThongTinKhachHang.xlsx",
    filename: "ThongTinKhachHang",
  });
  const [deleteNguoiDung] = useDeleteKhachHangMucTieuMutation();
  const [deleteHangLoat] = useDeletehangLoatKhachHangMucTieuMutation();

  const handleDeleteKhachHang = async (id) => {
    // if (
    //   !userData?.response.checkIsTruongPhong
    // ) {
    //   toast.warning(
    //     "Chỉ trưởng phòng mới có quyền xóa khách hàng."
    //   );
    //   return;
    // }
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
        refetch();
      }
    });
  };
  const handleDeleteMuliple = () => {
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
        refetch();
      }
    });
  };
  const handleGetTemplates = () => {
    if (getTemplate) {
      const url = window.URL.createObjectURL(getTemplate);
      const a = document.createElement("a");
      a.href = url;
      a.download = "ThongTinKhachHang.xlsx";
      a.click();
      window.URL.revokeObjectURL(url);
    } else {
      console.error("Không có dữ liệu để tải file.");
    }
  };

  useEffect(() => {
    setRows(dataKhachHangByNguoiDung);
  }, [dataKhachHangByNguoiDung]);

  const handleRowSelectionChange = (selectedRows) => {
    setSelectedRow(selectedRows);
  };

  const handleOpenModalUpdateKhachHang = () => {
    setModalUpdateKhachHang(true);
  };
  const handleCloseModalUpdateKhachHang = () => {
    setModalUpdateKhachHang(false);
  };
  const handleOpenModalImportKhachHang = () => {
    setModalImportKhachHangMucTeu(true);
  };
  const handleCloseOpenModalImportKhachHang = () => {
    setModalImportKhachHangMucTeu(false);
  };

  return (
    <>
      <Grid2 container spacing={2}>
        <Grid2 container alignItems="center" spacing={2}>
          <Grid2 size={12}>
            <h2 style={{ padding: 0, margin: 0 }}>Tất Cả Khách Hàng</h2>
          </Grid2>
          <Grid2 size={12}>
            <Button
              variant="contained"
              sx={{ marginLeft: 1 }}
              startIcon={<AddIcon />}
              onClick={gotoLink}
            >
              Thêm mới
            </Button>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{ marginLeft: 1, width: "200px" }}
              variant="outlined"
              startIcon={<OpenInNewIcon />}
              endIcon={<KeyboardArrowDownIcon />}
            >
              Tùy chỉnh
            </Button>
            <Button
              variant="outlined"
              color="primary"
              sx={{ marginLeft: 1, width: "200px" }}
              startIcon={<FileDownloadDoneIcon />}
              onClick={handleOpenModalImportKhachHang}
            >
              Nhập dữ liệu
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<GetAppIcon />}
                  sx={{ marginLeft: 1, width: "200px" }}
                  onClick={handleGetTemplates}
                >
                  Xuất Mẫu
                </Button>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ marginLeft: 1, width: "200px" }}
                  startIcon={<DeleteOutlineIcon />}
                  disabled={selectedRow.length == 0}
                  onClick={handleDeleteMuliple}
                >
                  Xóa hàng loạt
                </Button>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Button
                  variant="outlined"
                  sx={{ marginLeft: 1, width: "200px" }}
                  startIcon={<AutoDeleteIcon />}
                  onClick={handleOpenKhDaXoa}
                  color="error"
                >
                  Đã xóa
                </Button>
              </MenuItem>
            </Menu>
            <Button
              onClick={handleOpen}
              sx={{ marginLeft: 1 }}
              variant="outlined"
              color="inherit"
              startIcon={<UpdateIcon />}
            >
              Lịch sử mua hàng
            </Button>

            {/* <Button
              variant="outlined"
              sx={{ marginLeft: 1 }}
              startIcon={<AutoDeleteIcon />}
              color="error"
            >
              Thùng rác
            </Button> */}
          </Grid2>
          <Grid2 size={12}>
            <Paper>
              <CustomDatagrid
                rows={rows}
                columns={columns}
                pageSizeOptions={[10, 25, 50]}
                initialPageSize={25}
                checkboxSelection={true}
                showTopToolbar={true}
                onRowSelectionChange={handleRowSelectionChange}
              />
            </Paper>
          </Grid2>
        </Grid2>
        {isActionOpen && (
          <ActionComponents
            selectedItem={selectedRow}
            onClose={handleCloseAction}
            isOpen={isActionOpen}
          />
        )}
      </Grid2>
      {/* Modal Khách hàng mục tiêu */}
      <ModalUpdateKHMucTieu
        showModal={modalUpdateKhachHang}
        closeModal={handleCloseModalUpdateKhachHang}
        selectedItem={selectedRow}
        refetch={refetch}
      />
      {/* Modal import khách hàng */}
      <ModalImportKhachHang
        showModal={modalImportKhachHangMucTeu}
        closeModal={handleCloseOpenModalImportKhachHang}
        refetch={refetch}
      />
      {/* Modal bàn giao khách hàng */}
      <ModalBanGiaoKhachHangMucTieu
        showModal={modalbanGiao}
        closeModal={handleCloseModalBanGiao}
        refetch={refetch}
        selectedItem={selectedRow}
      />
      {/* Modal khách hàng đã xóa */}
      <ModalKhachHangMucTieuDaXoa
        open={modalKhDaXoa}
        handleClose={handleCloseKhDaXoa}
        refetch={refetch}
      />
    </>
  );
};

export default KhachHangMucTieu;
