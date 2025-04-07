import {
  Button,
  Grid2,
  Paper,
  Tooltip,
  IconButton,
  MenuItem,
  Menu,
  Box,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import GetAppIcon from "@mui/icons-material/GetApp";
import AddIcon from "@mui/icons-material/Add";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from "react-router-dom";
import ModalUpdateKHMucTieu from "./Modal/ModalUpdateKHMucTieu";
import ModalBanGiaoKhachHangMucTieu from "./Modal/ModalBanGiaoKhachHangMucTieu";
import { useGetTemplatesMutation, useGetTemplatesQuery } from "src/App/Api/KhachHangTiemNangApi";
import ModalImportKhachHang from "./Modal/ModalImportKhachHang";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import ModalKhachHangMucTieuDaXoa from "./Modal/ModalKhachHangMucTieuDaXoa";
import NoImage from "../../Assets/image/no-image.png";
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
const KhachHangMucTieu = () => {
  const [selectedRow, setSelectedRow] = useState([]),
    [rows, setRows] = useState([]),
    [anchorEl, setAnchorEl] = useState(null),
    [modalUpdateKhachHang, setModalUpdateKhachHang] = useState(false),
    [modalbanGiao, setModalBanGiao] = useState(false),
    [modalKhDaXoa, setModalKhDaXoa] = useState(false),
    [valueTuNgay, setValueTuNgay] = React.useState(dayjs().startOf("month")),
    [valueDenNgay, setValueDenNgay] = React.useState(dayjs().endOf("month")),
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
            <div>
              {params?.row?.nguoiDung?.hinhAnh == null ? (
                <div>
                  <img
                    src={NoImage}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      margin: 2,
                    }}
                  />
                </div>
              ) : (
                <div>
                  <img
                    src={
                      "data:image/jpeg;base64," +
                      params?.row?.nguoiDung?.hinhAnh
                    }
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      margin: 2,
                    }}
                  />
                </div>
              )}
            </div>
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
  const { data: dataKhachHangByNguoiDung, refetch } =
    useGetKhachHangMucTieuByNguoiDungIdQuery({tuNgay : valueTuNgay.format("YYYY-MM-DD HH:mm:ss.SSS"), denNgay:valueDenNgay.format("YYYY-MM-DD HH:mm:ss.SSS")});
  const [ getTemplate ] = useGetTemplatesMutation({
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
      <Box sx={{ p: 3, bgcolor: "background.default", minHeight: "100vh" }}>
        <Grid2 container spacing={3}>
          {/* Header Section */}
          <Grid2 size={12}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: "#1a237e",
                  letterSpacing: "-0.5px",
                }}
              >
                Tất Cả Khách Hàng
              </Typography>

              <Stack direction="row" spacing={1.5}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    px: 2.5,
                    py: 1,
                    bgcolor: "#1976d2",
                    "&:hover": { bgcolor: "#1565c0" },
                  }}
                  onClick={gotoLink}
                >
                  Thêm mới
                </Button>

                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<FileDownloadDoneIcon />}
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    px: 2.5,
                    py: 1,
                    borderColor: "#e0e0e0",
                    color: "#424242",
                  }}
                  onClick={handleOpenModalImportKhachHang}
                >
                  Nhập dữ liệu
                </Button>

                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  variant="outlined"
                  startIcon={<OpenInNewIcon />}
                  endIcon={<KeyboardArrowDownIcon />}
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    px: 2.5,
                    py: 1,
                    borderColor: "#e0e0e0",
                    color: "#424242",
                  }}
                  onClick={handleClick}
                >
                  Tùy chỉnh
                </Button>
              </Stack>
            </Stack>
          </Grid2>

          {/* Dropdown Menu */}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              elevation: 3,
              sx: {
                mt: 1,
                borderRadius: 2,
                minWidth: 220,
                "& .MuiMenuItem-root": { py: 1 },
              },
            }}
          >
            <MenuItem onClick={handleGetTemplates}>
              <Stack direction="row" spacing={1} alignItems="center">
                <GetAppIcon color="primary" />
                <Typography>Xuất mẫu</Typography>
              </Stack>
            </MenuItem>

            <MenuItem onClick={handleOpenKhDaXoa}>
              <Stack direction="row" spacing={1} alignItems="center">
                <AutoDeleteIcon color="error" />
                <Typography>Đã xóa</Typography>
              </Stack>
            </MenuItem>

            <Divider sx={{ my: 0.5 }} />

            <MenuItem
              onClick={handleDeleteMuliple}
              disabled={selectedRow.length === 0}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <DeleteOutlineIcon
                  color={selectedRow.length ? "error" : "disabled"}
                />
                <Typography
                  color={selectedRow.length ? "error" : "text.disabled"}
                >
                  Xóa hàng loạt
                </Typography>
              </Stack>
            </MenuItem>
          </Menu>

          {/* Data Grid Section */}
          <Grid2 size={12}>
            <Paper
              elevation={2}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                bgcolor: "background.default",
              }}
            >
              <Box sx={{ p: 2, borderBottom: "1px solid #e0e0e0" }}>
                <Button
                  variant="text"
                  startIcon={<UpdateIcon />}
                  sx={{
                    textTransform: "none",
                    color: "#616161",
                    "&:hover": { bgcolor: "#f5f5f5" },
                  }}
                  onClick={handleOpen}
                >
                  Lịch sử mua hàng
                </Button>
              </Box>
              <Grid2 size={12} sx={{ marginTop: 3, marginLeft: 3 }}>
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

              <Box sx={{ p: 2 }}>
                <CustomDatagrid
                  rows={rows}
                  columns={columns}
                  pageSizeOptions={[10, 25, 50]}
                  initialPageSize={25}
                  checkboxSelection={true}
                  showTopToolbar={true}
                  onRowSelectionChange={handleRowSelectionChange}
                  sx={{
                    "& .MuiDataGrid-root": {
                      border: "none",
                      "& .MuiDataGrid-cell": {
                        borderBottom: "1px solid #f0f0f0",
                      },
                    },
                  }}
                />
              </Box>
            </Paper>
          </Grid2>
        </Grid2>

        {/* Action Components and Modals */}
        {isActionOpen && (
          <ActionComponents
            selectedItem={selectedRow}
            onClose={handleCloseAction}
            isOpen={isActionOpen}
          />
        )}

        <ModalUpdateKHMucTieu
          showModal={modalUpdateKhachHang}
          closeModal={handleCloseModalUpdateKhachHang}
          selectedItem={selectedRow}
          refetch={refetch}
        />

        <ModalImportKhachHang
          showModal={modalImportKhachHangMucTeu}
          closeModal={handleCloseOpenModalImportKhachHang}
          refetch={refetch}
        />

        <ModalBanGiaoKhachHangMucTieu
          showModal={modalbanGiao}
          closeModal={handleCloseModalBanGiao}
          refetch={refetch}
          selectedItem={selectedRow}
        />

        <ModalKhachHangMucTieuDaXoa
          open={modalKhDaXoa}
          handleClose={handleCloseKhDaXoa}
          refetch={refetch}
        />
      </Box>
    </>
  );
};

export default KhachHangMucTieu;
