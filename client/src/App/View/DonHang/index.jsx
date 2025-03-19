import {
  Button,
  Chip,
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
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { useGetAllDonHangQuery, useGetGetDonHangListQuery } from "src/App/Api/DonHangApi";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Person2Icon from "@mui/icons-material/Person2";
import AddIcon from "@mui/icons-material/Add";
import AutoDeleteIcon from "@mui/icons-material/AutoDelete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import NoImage from "../../Assets/image/no-image.png";
import IconWord from "../../Assets/icon/word.png";
import CustomDatagrid from "src/App/Components/DataGrid/CustomDatagrid";
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';

const orderStatusColors = {
  Mới: "#3498db",
  "Ðang xử lý": "#f1c40f",
  "Ðã xác nhận": "#2ecc71",
  "Ðang chuẩn bị hàng": "#2980b9",
  "Ðã xuất kho": "#8e44ad",
  "Ðang giao hàng": "#e67e22",
  "Ðã giao hàng": "#27ae60",
  "Hoàn trả": "#e74c3c",
  "Ðã hủy": "#95a5a6",
};
const userData = JSON.parse(localStorage.getItem("authorizationData"));

const DonHang = () => {
  const { data : dataDonHang } = useGetGetDonHangListQuery();
  const [selectedRow, setSelectedRow] = useState([]),
    [rows, setRows] = useState([]),
    [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
          }}
        >
          <Tooltip title="Sửa thông tin ">
            <IconButton
              disabled={selectedRow.length === 0}
              style={{}}
              //  onClick={handleOpenModalSuaThongTinBaoGia}
            >
              <EditIcon color="success" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xóa">
            <IconButton
              disabled={selectedRow.length === 0}
              style={{}}
              //  onClick={() => handleDeleteBaoGia(params?.id)}
            >
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Gửi mail đơn hàng ">
            <IconButton
              disabled={selectedRow.length === 0}
              style={{}}
              //  onClick={handleOpenModalSuaThongTinBaoGia}
            >
              <ForwardToInboxIcon color="primary" />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
    {
      field: "",
      headerName: "Nhân viên tạo đơn",
      width: 200,
      renderCell: (params) => {
        return params?.row?.nguoiDung?.ten ? (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "40px",
                height: "40px",
              }}
            >
              {params?.row?.nguoiDung?.hinhAnh == null ? (
                <img
                  src={NoImage}
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <img
                  src={
                    "data:image/jpeg;base64," + params?.row?.nguoiDung?.hinhAnh
                  }
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              )}
            </div>
            <span>
              {params?.row?.nguoiDung?.hoVaDem} {params?.row?.nguoiDung?.ten}
            </span>
          </div>
        ) : (
          <div></div>
        );
      },
    },
    {
      field: "maQuanLy",
      headerName: "Mã đơn hàng",
      width: 300,
      renderCell: (params) => (
        <div>
          <span style={{ fontWeight: "500" }}>{params.value}</span>
        </div>
      ),
    },
    {
      field: "tenDonHang",
      headerName: "Tên đơn hàng",
      width: 400,
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
      field: "giaTriDonHang",
      headerName: "Giá trị đơn hàng",
      width: 300,
      renderCell: (params) => (
        <div>
          <span style={{ fontWeight: "500" }}>{params.value}</span>
        </div>
      ),
    },
    {
      field: "khachhang",
      headerName: "Tên khách hàng",
      width: 300,
      renderCell: (params) => (
        <div>
          <span style={{ fontWeight: "500" }}>
            {params?.row?.khachHangMucTieu?.tenKhachHang}
          </span>
        </div>
      ),
    },
    {
      field: "ngayDatHang",
      headerName: "Ngày báo giá",
      width: 200,
      renderCell: (params) => (
        <div style={{ alignItems: "center" }}>
          {" "}
          <Moment format="DD/MM/YYYY HH:SS">
            {new Date(params?.row?.ngayDatHang)}
          </Moment>
        </div>
      ),
    },
    {
      field: "tinhTrangDonHang",
      headerName: "Tình trạng đơn hàng ",
      width: 200,
      renderCell: (params) => {
        const status = params?.row?.tinhTrangDonHang?.name || "Không xác định";
        const color = orderStatusColors[status] || "#bdc3c7";

        return (
          <Chip
            label={status}
            sx={{
              backgroundColor: color,
              color: "#fff",
              fontWeight: "bold",
            }}
          />
        );
      },
    },
  ];
  useEffect(() => {
    setRows(dataDonHang);
  }, [dataDonHang]);
  const handleRowSelectionChange = (selectedRows) => {
    setSelectedRow(selectedRows);
  };
  return (
    <>
      <Grid2
        container
        alignItems="center"
        spacing={3}
        sx={{ p: 3, backgroundColor: "#f5f5f5", borderRadius: 2, boxShadow: 3 }}
      >
        <Grid2 xs={12}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "#1976d2", mb: 2 }}
          >
            Tất Cả Đơn Hàng
          </Typography>
        </Grid2>
        <Grid2 xs={12}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", sm: "center" }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: 2, textTransform: "none", boxShadow: 3 }}
              startIcon={<AddIcon />}
            >
              Thêm đơn hàng
            </Button>
            {userData?.response?.checkIsTruongPhong == true && (
              <Button
                variant="outlined"
                color="primary"
                disabled={selectedRow.length == 0}
                // onClick={handleOpenModalPheDuyet}
                sx={{ borderRadius: 2, textTransform: "none", boxShadow: 3 }}
                startIcon={<ContentCopyIcon />}
              >
                Phê duyệt đơn hàng
              </Button>
            )}
            <Button
              variant="contained"
              color="inherit"
              sx={{ borderRadius: 2, textTransform: "none", boxShadow: 2 }}
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
              sx={{ borderRadius: 2, textTransform: "none", boxShadow: 2 }}
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
                disabled={selectedRow.length === 0}
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
    </>
  );
};

export default DonHang;
