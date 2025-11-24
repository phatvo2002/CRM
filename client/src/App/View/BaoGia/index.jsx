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
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Person2Icon from "@mui/icons-material/Person2";
import AddIcon from "@mui/icons-material/Add";
import AutoDeleteIcon from "@mui/icons-material/AutoDelete";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import {
  useDeleteBaoGiaMutation,
  useGetBaoGiaByIdQuery,
  useGetBaoGiaListQuery,
} from "src/App/Api/BaoGiaApi";
import CustomDatagrid from "src/App/Components/DataGrid/CustomDatagrid";
import IconWord from "../../Assets/icon/word.png";
import ModalThemBaoGia from "./Component/ModalThemBaoGia";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ModalSuaThongTinBaoGia from "./Component/ModalSuaThongTinBaoGia";
import Swal from "sweetalert2";
import ModalSuaThongTinHangHoa from "./Component/ModalSuaThongTinHangHoa";
import { useDownloadFileMutation } from "src/App/Api/FileApi";
import { ModalNhanBanBaoGia } from "./Component/ModalNhanBanBaoGia";
import ModalPheDuyetBaoGia from "./Component/ModalPheDuyetBaoGia";
import NoImage from "../../Assets/image/no-image.png";
import dayjs from "dayjs";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDateBaoGia, useDateCustomer, useMenuStore } from "src/App/Hooks/hook";
import { useGetMenuByIdQuery } from "src/App/Api/MenuApi";

const statusColors = {
  "Mới tạo": "#3498db",
  "Đang chờ duyệt": "#f1c40f",
  "Đã duyệt": "#2ecc71",
  "Đã gửi khách hàng": "#2980b9",
  "Khách hàng phản hồi": "#8e44ad",
  "Đang thương lượng": "#e67e22",
  "Được chấp nhận": "#27ae60",
  "Từ chối": "#e74c3c",
  "Hết hạn": "#95a5a6",
  "Đã chuyển thành đơn hàng": "#1abc9c",
};
const userData = JSON.parse(localStorage.getItem("authorizationData"));
const index = () => {
  const { tuNgay, denNgay, setTuNgay, setDenNgay } = useDateBaoGia()

  const [selectedRow, setSelectedRow] = useState([]),
    [rows, setRows] = useState([]),
    [anchorEl, setAnchorEl] = useState(null),
    [modalThemMoi, setModalThemMoi] = useState(false),
    [modalSuaThongTinBaoGia, setModalSuaThongTinBaoGia] = useState(false),
    [modalSuaThongTinHangHoa, setModalSuaThongTinHangHoa] = useState(false),
    [modalNhaBanBaoGia, setModalNhanBanBaoGia] = useState(false),
    [modalPheDuyet, setModalPheDuyet] = useState(false),
    navigate = useNavigate(),
    [isActionOpen, setIsActionOpen] = useState(false),
    [deleteBaoGia] = useDeleteBaoGiaMutation(),
    [downloadBaoGia] = useDownloadFileMutation(),
    tuNgayObj = useMemo(() => dayjs(tuNgay), [tuNgay]),
    denNgayObj = useMemo(() => dayjs(denNgay), [denNgay]),
    { menuId, setMenuId } = useMenuStore(),
    { data: menuData } = useGetMenuByIdQuery(menuId),
    handleOpen = () => setIsActionOpen(true);

  const handleOpenModalThemMoi = () => setModalThemMoi(true);

  const handleCloseModalThemMoi = () => setModalThemMoi(false);

  const handleOpenModalSuaThongTinBaoGia = () =>
    setModalSuaThongTinBaoGia(true);

  const handleCloseModalSuaThongTinBaoGia = () =>
    setModalSuaThongTinBaoGia(false);

  const handleOpenModalSuaThongTinHangHoa = () =>
    setModalSuaThongTinHangHoa(true);

  const handleCloseModalSuaThongTinHangHoa = () =>
    setModalSuaThongTinHangHoa(false);

  const handleOpenModalOpenModalNhanBan = () => setModalNhanBanBaoGia(true);

  const handlleCLoseModalNhanBan = () => setModalNhanBanBaoGia(false);

  const handleOpenModalPheDuyet = () => setModalPheDuyet(true);

  const handleCloseModalPheDuyet = () => setModalPheDuyet(false);

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
        const res = await deleteBaoGia(id);
        if (res.data?.success == false) {
          Swal.fire({
            title: res?.data?.message,
            icon: "warning",
          });
        } else {
          Swal.fire({
            title: "Xóa báo giá thành công",
            icon: "success",
          });
          refetch();
        }
      }
    });
  };

  const handleDownLoadFileBaoGia = (id) => {
    downloadBaoGia(id);
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
              style={{}}
              onClick={handleOpenModalSuaThongTinBaoGia}
              disabled={!menuData?.menuRoles[0]?.sua || !(selectedRow?.length > 0)}
            >
              <EditIcon color="success" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xóa">
            <IconButton
              disabled={!menuData?.menuRoles[0]?.xoa || !(selectedRow?.length > 0)}
              style={{}}
              onClick={() => handleDeleteBaoGia(params?.id)}
            >
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xuất báo giá">
            <IconButton
              disabled={!menuData?.menuRoles[0]?.sua || !(selectedRow?.length > 0)}
              onClick={() => handleDownLoadFileBaoGia(params?.id)}
            >
              <img src={IconWord} alt="Xuất báo giá" width={24} height={24} />
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
      field: "tongTien",
      headerName: "Tổng tiền",
      width: 200,
      renderCell: (params) => (
        <div style={{ alignItems: "center" }}>
          {" "}
          {params?.row?.tongTien
            ? params?.row?.tongTien.toLocaleString("vi-VN")
            : 0}
        </div>
      ),
    },
    {
      field: "tinhTrang",
      headerName: "Tình trạng báo giá",
      width: 200,
      renderCell: (params) => {
        const status = params?.row?.tinhTrangBaoGia?.name || "Không xác định";
        const color = statusColors[status] || "#bdc3c7";

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
  ];


  const { data: dataBaogia, refetch } = useGetBaoGiaListQuery({
      tuNgay: tuNgay,
      denNgay: denNgay,
  });
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
        <Grid2 xs={12} size={12}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "#1976d2", mb: 1 }}
          >
            📄 Tất Cả Báo Giá
          </Typography>
          <Typography variant="body2">
            Báo giá là một tài liệu chính thức được tạo ra trong CRM để đề xuất
            mức giá bán cho một hoặc nhiều sản phẩm/dịch vụ cho khách hàng
            (thường là khách hàng mục tiêu đã có cơ hội cụ thể).
          </Typography>
        </Grid2>

        {/* Hành động */}
        <Grid2 xs={12}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenModalThemMoi}
              disabled={!menuData?.menuRoles[0]?.them}
              sx={{  textTransform: "none", boxShadow: 3 }}
              startIcon={<AddIcon />}
            >
              Thêm báo giá
            </Button>

            <Button
              variant="outlined"
              color="primary"
              onClick={handleOpenModalOpenModalNhanBan}
              disabled={selectedRow.length == 0 || !menuData?.menuRoles[0]?.them}
              sx={{ textTransform: "none", boxShadow: 3 }}
              startIcon={<ContentCopyIcon />}
            >
              Nhân bản
            </Button>
            {userData?.response?.checkIsTruongPhong == true && (
              <Button
                variant="contained"
                color="primary"
                disabled={selectedRow.length == 0 || !menuData?.menuRoles[0]?.sua}
                
                onClick={handleOpenModalPheDuyet}
                sx={{ textTransform: "none", boxShadow: 3 }}
                startIcon={<ContentCopyIcon />}
              >
                Phê duyệt
              </Button>
            )}
            {(selectedRow[0]?.tinhTrangBaoGia?.name === "Đang chờ duyệt" ||
              selectedRow[0]?.tinhTrangBaoGia?.name === "Bản thảo") && (
                <Button
                  sx={{ borderRadius: 2, textTransform: "none", boxShadow: 1 }}
                  variant="contained"
                  color="primary"
                  disabled={selectedRow.length === 0 || !menuData?.menuRoles[0]?.sua}
                  onClick={handleOpenModalSuaThongTinHangHoa}
                  startIcon={<Inventory2Icon />}
                >
                  Chỉnh sửa hàng hóa
                </Button>
              )}

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
              sx={{ textTransform: "none", boxShadow: 1 }}
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
                variant="contained"
                color="error"
                
                startIcon={<DeleteOutlineIcon />}
                sx={{ width: "100%", justifyContent: "flex-start" }}
                disabled={!menuData?.menuRoles[0]?.xoa}
              >
                Xóa hàng loạt
              </Button>
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <Button
                variant="outlined"
                color="error"
                startIcon={<AutoDeleteIcon />}
                 disabled={!menuData?.menuRoles[0]?.xoa}
                sx={{ width: "100%", justifyContent: "flex-start" }}
              >
                Đã xóa
              </Button>
            </MenuItem>
          </Menu>
        </Grid2>
        <Grid2 size={12}>
          <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
            <Grid2 size={12} sx={{marginBottom:4 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["DateTimePicker", "DateTimePicker"]}
                >
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    alignItems={{ xs: "stretch", sm: "center" }}
                  >
                    <DateTimePicker
                      label="Từ ngày"
                      value={tuNgayObj}
                      onChange={(newValue) => {
                        if (newValue) setTuNgay(newValue);
                      }}
                    />
                    <DateTimePicker
                      label="Đến ngày"
                      value={denNgayObj}
                      onChange={(newValue) => {
                        if (newValue) setDenNgay(newValue);
                      }}
                    />
                  </Stack>
                </DemoContainer>
              </LocalizationProvider>
            </Grid2>
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
      {/* Modal phê duyệt báo giá */}
      <ModalPheDuyetBaoGia
        selectedItem={selectedRow}
        showModal={modalPheDuyet}
        closeModal={handleCloseModalPheDuyet}
        refetch={refetch}
      />
    </>
  );
};

export default index;
