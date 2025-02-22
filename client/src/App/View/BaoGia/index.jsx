import {
  Button,
  Divider,
  Grid2,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Person2Icon from "@mui/icons-material/Person2";
import AddIcon from "@mui/icons-material/Add";
import AutoDeleteIcon from "@mui/icons-material/AutoDelete";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import GetAppIcon from "@mui/icons-material/GetApp";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { useDeleteBaoGiaMutation, useGetBaoGiaListQuery } from "src/App/Api/BaoGiaApi";
import CustomDatagrid from "src/App/Components/DataGrid/CustomDatagrid";
import IconWord from "../../Assets/icon/word.png";
import ModalThemBaoGia from "./Component/ModalThemBaoGia";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ModalSuaThongTinBaoGia from "./Component/ModalSuaThongTinBaoGia";
import Swal from "sweetalert2";
import ModalSuaThongTinHangHoa from "./Component/ModalSuaThongTinHangHoa";
import { useDownloadFileMutation } from "src/App/Api/FileApi";
import { ModalNhanBanBaoGia } from "./Component/ModalNhanBanBaoGia";
const index = () => {
  const [selectedRow, setSelectedRow] = useState([]),
    [rows, setRows] = useState([]),
    [anchorEl, setAnchorEl] = useState(null),
    [modalThemMoi , setModalThemMoi] = useState(false),
    [modalSuaThongTinBaoGia , setModalSuaThongTinBaoGia] = useState(false),
    [modalSuaThongTinHangHoa, setModalSuaThongTinHangHoa] = useState(false),
    [modalNhaBanBaoGia ,setModalNhanBanBaoGia] = useState(false),
    navigate = useNavigate(),
    [isActionOpen, setIsActionOpen] = useState(false),
    [deleteBaoGia] =useDeleteBaoGiaMutation(),
    [downloadBaoGia] = useDownloadFileMutation(),
    handleOpen = () => setIsActionOpen(true);

    const handleOpenModalThemMoi = () => setModalThemMoi(true)

    const handleCloseModalThemMoi = () => setModalThemMoi(false)

    const handleOpenModalSuaThongTinBaoGia = () => setModalSuaThongTinBaoGia(true)

    const handleCloseModalSuaThongTinBaoGia = () => setModalSuaThongTinBaoGia(false)

    const handleOpenModalSuaThongTinHangHoa = () => setModalSuaThongTinHangHoa(true)

    const handleCloseModalSuaThongTinHangHoa = () => setModalSuaThongTinHangHoa(false)

    const handleOpenModalOpenModalNhanBan = () => setModalNhanBanBaoGia(true)

    const handlleCLoseModalNhanBan = () => setModalNhanBanBaoGia(false)

    const handleDeleteBaoGia = (id) => {
        Swal.fire({
             title: "Bạn có muốn xóa thông tin này?",
             icon: "warning",
             showCancelButton: true,
             confirmButtonColor: "#3085d6",
             cancelButtonColor: "#d33",
             confirmButtonText: "Có",
           }).then(async (result) => {
             if (result.isConfirmed) {
               await deleteBaoGia(id);
               Swal.fire({
                 title: "Xóa báo giá thành công",
                 icon: "success",
               });
               refetch();
             }
           });
    }

    const handleDownLoadFileBaoGia = (id) => {
        downloadBaoGia(id)
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
          }}
        >
          <Tooltip title="Sửa thông tin ">
            <IconButton
              disabled={selectedRow.length === 0}
              style={{}}
              onClick={handleOpenModalSuaThongTinBaoGia}
            >
              <EditIcon color="success" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xóa">
            <IconButton
              disabled={selectedRow.length === 0}
              style={{}}
              onClick={() => handleDeleteBaoGia(params?.id)}
            >
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xuất báo giá">
            <IconButton
              disabled={selectedRow.length === 0}
             onClick={()=>handleDownLoadFileBaoGia(params?.id)}
            >
              <img src={IconWord} alt="Xuất báo giá" width={24} height={24} />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
    {
      field: "tenBaoGia",
      headerName: "Tên báo giá",
      width: 300,
      renderCell: (params) => (
        <div>
          <Link
            to={`/baogia/${params.id}`}
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
    {
      field: "ngayBaoGia",
      headerName: "Ngày báo giá",
      width: 200,
      renderCell: (params) => (
        <div style={{ alignItems: "center" }}>
          {" "}
          <Moment format="DD/MM/YYYY HH:SS">
            {new Date(params?.row?.ngayBaoGia)}
          </Moment>
        </div>
      ),
    },
    {
      field: "ngayHetHan",
      headerName: "Ngày hết hạn",
      width: 200,
      renderCell: (params) => (
        <div style={{ alignItems: "center" }}>
          {" "}
          <Moment format="DD/MM/YYYY HH:SS">
            {new Date(params?.row?.ngayHetHan)}
          </Moment>
        </div>
      ),
    },
    {
      field: "khachHang",
      headerName: "Khách hàng",
      width: 200,
      renderCell: (params) => (
        <div style={{ alignItems: "center" }}>
          {" "}
          {params?.row?.khachHangMucTieu?.tenKhachHang}
        </div>
      ),
    },
    {
      field: "coHoi",
      headerName: "Cơ hội",
      width: 200,
      renderCell: (params) => (
        <div style={{ alignItems: "center" }}>
          {" "}
          {params?.row?.coHoi?.tenCoHoi}
        </div>
      ),
    },
    {
      field: "tongTien",
      headerName: "Tổng tiền",
      width: 200,
      renderCell: (params) => (
        <div style={{ alignItems: "center" }}> {params?.row?.tongTien ? params?.row?.tongTien.toLocaleString("vi-VN")  : 0}</div>
      ),
    },
  ];
  const { data: dataBaogia, refetch } = useGetBaoGiaListQuery();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    setRows(dataBaogia);
  }, [dataBaogia]);
  const handleRowSelectionChange = (selectedRows) => {
    setSelectedRow(selectedRows);
  };
  return (
    <>
      <Grid2 container alignItems="center" spacing={3}>
        {/* Tiêu đề */}
        <Grid2 xs={12}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "#1976d2", mb: 1 }}
          >
            📄 Tất Cả Báo Giá
          </Typography>
        </Grid2>

        {/* Hành động */}
        <Grid2 xs={12}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenModalThemMoi}
              sx={{ borderRadius: 2, textTransform: "none", boxShadow: 3 }}
              startIcon={<AddIcon />}
            >
              Thêm báo giá
            </Button>

            <Button
              variant="outlined"
              color="primary"
              onClick={handleOpenModalOpenModalNhanBan}
              disabled={selectedRow.length == 0}
              sx={{ borderRadius: 2, textTransform: "none", boxShadow: 3 }}
              startIcon={<ContentCopyIcon />}
            >
              Nhân bản
            </Button>
            <Button
              sx={{ borderRadius: 2, textTransform: "none", boxShadow: 1 }}
              variant="outlined"
              color="primary"
              disabled={selectedRow.length == 0}
              onClick={handleOpenModalSuaThongTinHangHoa}
              startIcon={<Inventory2Icon />}
            >
              Chỉnh sửa hàng hóa
            </Button>
            <Button
              sx={{ borderRadius: 2, textTransform: "none", boxShadow: 1 }}
              variant="contained"
              color="inherit"
              startIcon={<AddShoppingCartIcon />}
            >
              Thông tin hàng hóa
            </Button>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{ borderRadius: 2, textTransform: "none", boxShadow: 1 }}
              variant="outlined"
              startIcon={<OpenInNewIcon />}
              endIcon={<KeyboardArrowDownIcon />}
            >
              Tùy chỉnh
            </Button>
          </Stack>

          {/* Dropdown menu */}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{ "aria-labelledby": "basic-button" }}
            sx={{ mt: 1 }}
          >
            <Divider />

            <MenuItem onClick={handleClose}>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteOutlineIcon />}
                sx={{ width: "100%", justifyContent: "flex-start" }}
                disabled={false}
              >
                Xóa hàng loạt
              </Button>
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <Button
                variant="outlined"
                color="error"
                startIcon={<AutoDeleteIcon />}
                sx={{ width: "100%", justifyContent: "flex-start" }}
              >
                Đã xóa
              </Button>
            </MenuItem>
          </Menu>
        </Grid2>
        <Grid2 size={12}>
          <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
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
      {/* Modal thêm mới báo giá */}
      <ModalThemBaoGia
        showModal={modalThemMoi}
        closeModal={handleCloseModalThemMoi}
        refetch={refetch}
      />
      {/* Modal Sửa thông tin báo giá */}
       <ModalSuaThongTinBaoGia
         selectedItem={selectedRow}
         showModal={modalSuaThongTinBaoGia}
         closeModal={handleCloseModalSuaThongTinBaoGia}
         refetch={refetch}
       />
       {/* Modal sửa thông tin hàng hóa  */}
       <ModalSuaThongTinHangHoa
         selectedItem={selectedRow}
         showModal={modalSuaThongTinHangHoa}
         closeModal={handleCloseModalSuaThongTinHangHoa}
         refetch={refetch}
       />
       {/* Modal nhân bản báo giá */}
       <ModalNhanBanBaoGia
         selectedRow={selectedRow}
         showModal={modalNhaBanBaoGia}
         closeModal={handlleCLoseModalNhanBan}
         refetch={refetch}
       />
    </>
  );
};

export default index;
