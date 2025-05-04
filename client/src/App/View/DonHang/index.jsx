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
import IconWord from "../../Assets/icon/word.png";
import IconExcel from "../../Assets/icon/excel.png";
import {
  useDeleteDonHangMutation,
  useGetGetDonHangListQuery,
} from "src/App/Api/DonHangApi";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
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
import CustomDatagrid from "src/App/Components/DataGrid/CustomDatagrid";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import { ModalThemMoiDonHang } from "./Modal/ModalThemMoiDonHang";
import ModalChinhSuaDonHang from "./Modal/ModalChinhSuaDonHang";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useGuiMailDonHangMutation } from "src/App/Api/MailServicesApi";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { useDownloadFileDonHangMutation } from "src/App/Api/FileApi";
import ModalChiTietDonHang from "./Modal/ModalChiTietDonHang";
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
  const [valueTuNgay, setValueTuNgay] = React.useState(
    dayjs().startOf("month")
  );
  const [valueDenNgay, setValueDenNgay] = React.useState(
    dayjs().endOf("month")
  );
  const { data: dataDonHang, refetch } = useGetGetDonHangListQuery({
    tuNgay: valueTuNgay.format("YYYY-MM-DDT00:00:00"),
    denNgay: valueDenNgay.format("YYYY-MM-DDT23:59:59"),
  });
  const [deleteDonHang] = useDeleteDonHangMutation();
  const [mailDonHang] = useGuiMailDonHangMutation();
  const [exportDonHang] = useDownloadFileDonHangMutation();
  const [modalThemMoiDonHang, setModalThemMoiDonHang] = useState(false);
  const [modalChinhSuaDonHang, setModalChinhSuaDonHang] = useState(false);
  const [openModal, setOpenModal] = useState(false);
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
  const handleOpenModal = () => setOpenModal(true);
  const handeCloseModal = () => setOpenModal(false);
  const handleOpenModalThemDonHang = () => {
    setModalThemMoiDonHang(true);
  };
  const handleCloseModalThemMoi = () => {
    setModalThemMoiDonHang(false);
  };
  const handleOpenModalChinhSuaDonHang = () => {
    if (selectedRow[0]?.tinhTrangDonHang?.id == 2) {
      setModalChinhSuaDonHang(true);
    } else {
      toast.warning("Đơn hàng đã được xác nhận nên không thể chỉnh sửa");
    }
  };
  const handleCloseModalChinhSuaDonHang = () => {
    setModalChinhSuaDonHang(false);
  };

  const handleRowSelectionChange = (selectedRows) => {
    setSelectedRow(selectedRows);
  };
  const handleDeleteDonhang = (id) => {
    if (
      userData.response.checkIsGiamDoc == false ||
      userData.response.checkIsTruongPhong == false
    ) {
      toast.warning(
        "Bạn không thể xóa đơn hàng , vui lòng liên hệ trưởng phòng để xóa đơn hàng"
      );
    } else {
      Swal.fire({
        title: "Bạn có muốn xóa đơn hàng này",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Có",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteDonHang(selectedRow[0]?.id);
          Swal.fire({
            title: "Xóa thành công",
            icon: "success",
          });
          refetch();
        }
      });
    }
  };
  const handleEmailDonHang = async (trangThaiId, donHangId) => {
    switch (trangThaiId) {
      case 2:
        {
          if (
            selectedRow[0]?.khachHangMucTieu?.email !== "" ||
            selectedRow[0]?.khachHangMucTieu?.email !== null
          ) {
            const response = await mailDonHang({
              mailRequest: null,
              donHangId: donHangId,
            });
            try {
              if (response.data.status === 200) {
                toast.success("Gửi thành công");
              } else {
                toast.error(response.data.message);
              }
            } catch (error) {
              toast.error(error);
            }
          } else {
            toast.warning(
              "Khách hàng chưa có email , vui lòng nhập email của khách hàng để tiếp tục thao tác !"
            );
          }
        }
        break;
      default:
        {
          toast.success("Đơn hàng đã được gửi");
        }
        break;
    }
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
            <span>
              <IconButton
                disabled={selectedRow.length === 0}
                style={{}}
                onClick={handleOpenModalChinhSuaDonHang}
              >
                <EditIcon color="success" />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Xóa">
            <span>
              <IconButton
                disabled={selectedRow.length === 0}
                onClick={handleDeleteDonhang}
              >
                <DeleteIcon color="error" />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Gửi mail đơn hàng ">
            <span>
              <IconButton
                disabled={selectedRow.length === 0}
                style={{}}
                onClick={() =>
                  handleEmailDonHang(
                    selectedRow[0]?.maTinhTrangDonHang,
                    selectedRow[0]?.id
                  )
                }
              >
                <ForwardToInboxIcon color="primary" />
              </IconButton>
            </span>
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
          <Person2Icon style={{ color: "#1976d2" }} />
          <span style={{ fontWeight: "500" }} onClick={handleOpenModal} >
            {params.value}
          </span>
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

  return (
    <>
      <Grid2
        container
        alignItems="center"
        spacing={3}
        sx={{
          p: 3,
          backgroundColor: "background.default",
          borderRadius: 2,
          boxShadow: 3,
        }}
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
              onClick={handleOpenModalThemDonHang}
              startIcon={<AddIcon />}
            >
              Thêm đơn hàng
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginLeft: 2 }}
              disabled={selectedRow.length == 0}
              onClick={() => exportDonHang(selectedRow[0]?.id)}
            >
              <img src={IconWord} alt="Xuất báo giá" width={24} height={24} />{" "}
              Tải đơn đặt hàng
            </Button>
            {/* <Button
              variant="contained"
              color="success"
              sx={{ marginLeft: 2 }}
              //onClick={() => downloadBaoGia(dataBaoGia?.id)}
            >
              <img src={IconExcel} alt="Xuất báo giá" width={24} height={24} />{" "}
              Tải đơn đặt hàng
            </Button> */}
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
            <Grid2 size={12}>
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
                      value={valueTuNgay}
                      onChange={(newValue) => setValueTuNgay(newValue)}
                    />
                    <DateTimePicker
                      label="Đến ngày"
                      value={valueDenNgay}
                      onChange={(newValue) => setValueDenNgay(newValue)}
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
      {/* Modal thêm mới đơn hàng */}
      <ModalThemMoiDonHang
        showModal={modalThemMoiDonHang}
        closeModal={handleCloseModalThemMoi}
        refetch={refetch}
      />
      {/* Modal chỉnh sửa đơn hàng */}
      <ModalChinhSuaDonHang
        selectedItem={selectedRow}
        openModal={modalChinhSuaDonHang}
        handleClose={handleCloseModalChinhSuaDonHang}
        refetch={refetch}
      />
      {/* Modal chi tiết đơn hàng  */}
      <ModalChiTietDonHang
        open={openModal}
        handleClose={handeCloseModal}
        selectedRow={selectedRow}
        refetch={refetch}
      />
    </>
  );
};

export default DonHang;
