import React, { useEffect, useState } from "react";
import { ActionComponents } from "./components/Action";
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Grid2,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";
import { useMemo } from "react";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AutoDeleteIcon from "@mui/icons-material/AutoDelete";
import CustomDatagrid from "src/App/Components/DataGrid/CustomDatagrid";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import { TYPE_MODAL } from "../../Until/constant";
import EmailIcon from "@mui/icons-material/Email";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ThreePIcon from "@mui/icons-material/ThreeP";
import Person2Icon from "@mui/icons-material/Person2";
import UpdateIcon from "@mui/icons-material/Update";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PhoneIcon from "@mui/icons-material/Phone";
import {
  useDeletehangLoatKhachHangTiemNangMutation,
  useDeleteKhachHangTiemNangMutation,
  useGetKhachHangTiemNangByroleQuery,
  useGetTemplatesMutation,
} from "src/App/Api/KhachHangTiemNangApi";
import UpdateKhachHangTiemNang from "./components/UpdateKhachHangTiemNang";
import ModalBanGiaoKhachHang from "./Modal/ModalBanGiaoKhachHang";
import ModalXemKhachHangDaXoa from "./Modal/ModalXemKhachHangDaXoa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import NoImage from "../../Assets/image/no-image.png";
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import ModalBanGiaoKhachHangHangHoat from "./Modal/ModalBanGiaoKhachHangHangHoat";
const KhachHangTiemNang = () => {
  const [selectedRow, setSelectedRow] = useState([]);
  const [selectRowId , setSelectedRowId] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isActionOpen, setIsActionOpen] = useState(false);
  const [KhachHangDaXoaModal, setKhachHangDaXoaModal] = useState(false);
  const handleOpen = () => setIsActionOpen(true);
  const handleClose = () => setIsActionOpen(false);
  const handleOpenModalXem = () => setKhachHangDaXoaModal(true);
  const handleCloseModalXem = () => setKhachHangDaXoaModal(false);
  const navigate = useNavigate();
  const gotoLink = () => {
    navigate("/tiemnang/themmoikhachhangtiemnang");
  };
  const gotoLinkImport = () => {
    navigate("/tiemnang/uploadkhachhang");
  };

  const columns = useMemo(
    () => [
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
              <span>
                <IconButton
                  disabled={selectedRow.length === 0}
                  onClick={onOpenModalUpdateKhachHang}
                >
                  <EditIcon color="success" />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Xóa">
              <span>
                <IconButton
                  disabled={selectedRow.length === 0}
                  onClick={() => handleDeletePhongBan(params?.id)}
                >
                  <DeleteIcon color="error" />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Bàn giao tiềm năng">
              <span>
                <IconButton
                  disabled={selectedRow.length === 0}
                  onClick={handleOpenModalBanGiaoKhachHang}
                >
                  <ThreePIcon color="primary" />
                </IconButton>
              </span>
            </Tooltip>
          </div>
        ),
      },
      {
        field: "nhanVienChamSoc",
        headerName: "Nhân viên chăm sóc",
        width: 200,
        renderCell: (params) =>
          params?.row?.nguoiDung?.ten ? (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <img
                src={
                  params?.row?.nguoiDung?.hinhAnh
                    ? `data:image/jpeg;base64,${params?.row?.nguoiDung?.hinhAnh}`
                    : NoImage
                }
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  margin: 2,
                }}
                alt="avatar"
              />
              <span>
                {params?.row?.nguoiDung?.hoVaDem} {params?.row?.nguoiDung?.ten}
              </span>
            </div>
          ) : (
            <div></div>
          ),
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
              <span style={{ fontWeight: "500" }}>{params.value}</span>
            </Link>
          </div>
        ),
      },
      {
        field: "isChuyenDoi",
        headerName: "Chuyển đổi ",
        width: 200,
        renderCell: (params) => {
          return (
            <>
              {params?.value == false ? (
                <Chip
                  label="Chưa chuyển đổi"
                  variant="outlined"
                  color="error"
                />
              ) : (
                <Chip
                  label="Đã chuyển đổi"
                  variant="outlined"
                  color="success"
                />
              )}
            </>
          );
        },
      },
      { field: "diaChi", headerName: "Địa Chỉ", width: 200 },
      {
        field: "soDienThoaiDiDong",
        headerName: "Số điện thoại cá nhân",
        width: 200,
        renderCell: (params) =>
          params.value ? (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <PhoneIcon style={{ padding: 2 }} color="success" />
              <span>{params.value}</span>
            </div>
          ) : (
            <div></div>
          ),
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
    ],
    [selectedRow]
  );
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
  const [valueTuNgay, setValueTuNgay] = React.useState(
    dayjs().startOf("month")
  );
  const [valueDenNgay, setValueDenNgay] = React.useState(
    dayjs().endOf("month")
  );
  const [openModalBanGiao, setOpenModalBanGiao] = useState(false);
  const [openModalBanGiaoHangLoat, setOpenModalBanGiaohangLoat] = useState(false);
  const [getTemplate] = useGetTemplatesMutation();

const tuNgayString = valueTuNgay.format("YYYY-MM-DD HH:mm:ss.SSS");
const denNgayString = valueDenNgay.format("YYYY-MM-DD HH:mm:ss.SSS"); 

  const { data: dataKHByRole, refetch: refetchkh } =
    useGetKhachHangTiemNangByroleQuery({
      tuNgay: tuNgayString,
      denNgay: denNgayString,
    });
  const [deleteNguoiDung] = useDeleteKhachHangTiemNangMutation();
  const [deleteHangLoat] = useDeletehangLoatKhachHangTiemNangMutation();
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
  };
  const handleCloseModalBanGiaoKhachHang = () => {
    setOpenModalBanGiao(false);
    setTypeModal("");
  };
  const handleOpenModalBanGiaoKhachHangHangLoat = () => setOpenModalBanGiaohangLoat(true)
  const handleCloseModalBanGiaoKhachHangHangLoat = () => setOpenModalBanGiaohangLoat(false)

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
        refetchkh();
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
        refetchkh();
      }
    });
  };

  const handleGetTemplates = async () => {
    try {
      const result = await getTemplate({
        path: "Templates/ThongTinTiemNang.xlsx",
        filename: "ThongTinTiemNang",
      }).unwrap();

      if (result instanceof Blob) {
        const url = window.URL.createObjectURL(result);
        const a = document.createElement("a");
        a.href = url;
        a.download = "ThongTinTiemNang.xlsx";
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        console.error("Không có dữ liệu để tải file.");
      }
    } catch (error) {
      console.error("Lỗi khi tải template:", error);
    }
  };

  useEffect(() => {
    setRows(dataKHByRole);
  }, [dataKHByRole]);

  const handleRowSelectionChange = (selectedRows) => {
    setSelectedRow(selectedRows);
    let selectedRow = selectedRows.map(r=>r.id)
    setSelectedRowId(selectedRow)
  };
  return (
    <Box
      className="modern-crm-page"
      sx={{ p: 3, bgcolor: "background.default" }}
    >
      {/* Header Section */}
      <div style={{padding : 2}}>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "#1a237e",
            letterSpacing: "-0.5px",
          }}
        >
          Tiềm Năng
        </Typography>
        <Typography>
          {"Tiềm năng"} là những khách hàng hoặc cơ hội có khả năng chuyển đổi
          thành khách hàng thực sự trong tương lai, giúp đội ngũ kinh doanh tập
          trung vào những cơ hội quan trọng để tối ưu hóa quy trình bán hàng.
        </Typography>
        </div>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >

        <Stack direction="row" spacing={1.5} >
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
            startIcon={<GetAppIcon />}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              px: 2.5,
              py: 1,
              borderColor: "#e0e0e0",
              color: "#424242",
            }}
            onClick={gotoLinkImport}
          >
            Nhập dữ liệu
          </Button>

          <Button
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
          <Button
            variant="outlined"
            startIcon={<UpdateIcon />}
            sx={{
              textTransform: "none",
              color: "#616161",
              "&:hover": { bgcolor: "#f5f5f5" },
            }}
            onClick={handleOpen}
          >
            Lịch sử tương tác
          </Button>
          <Button
            variant="outlined"
            startIcon={<PeopleOutlineIcon />}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              px: 2.5,
              py: 1,
              borderColor: "#e0e0e0",
              color: "#424242",
            }}
            disabled={selectRowId.length == 0}
            onClick={handleOpenModalBanGiaoKhachHangHangLoat}
          >
            Bàn giao
          </Button>
        </Stack>
      </Stack>

      {/* Dropdown Menu */}
      <Menu
        id="crm-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseDrop}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1,
            borderRadius: 2,
            minWidth: 200,
            "& .MuiMenuItem-root": { py: 1 },
          },
        }}
      >
        <MenuItem onClick={handleGetTemplates}>
          <Stack direction="row" spacing={1} alignItems="center">
            <ImportExportIcon color="primary" />
            <Typography>Xuất mẫu</Typography>
          </Stack>
        </MenuItem>

        <MenuItem onClick={handleOpenModalXem}>
          <Stack direction="row" spacing={1} alignItems="center">
            <AutoDeleteIcon color="primary" />
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
            <Typography color={selectedRow.length ? "error" : "text.disabled"}>
              Xóa hàng loạt
            </Typography>
          </Stack>
        </MenuItem>
      </Menu>

      {/* Main Content */}
      <Paper
        elevation={2}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          bgcolor: "background.default",
        }}
      >
     
        <Grid2 size={12} sx={{ marginTop: 3, marginLeft: 3 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
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
            height={500}
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
      <Slide direction="left" in={isActionOpen} mountOnEnter unmountOnExit>
        <Box
          sx={{
            width: "360px",
            position: "fixed",
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 1300,
            bgcolor: "background.paper",
            boxShadow: 3,
            overflowY: "auto",
          }}
        >
          <ActionComponents
            selectedItem={selectedRow}
            onClose={handleClose}
            isOpen={isActionOpen}
          />
        </Box>
      </Slide>
      {/* Modals and Action Components */}
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
        refetch={refetchkh}
      />

      <ModalXemKhachHangDaXoa
        handleClose={handleCloseModalXem}
        open={KhachHangDaXoaModal}
        refetch={refetchkh}
      />

      {/* Modal bàn giao hàng loạt */}
      <ModalBanGiaoKhachHangHangHoat
         selectedItem={selectRowId}
         closeModal={handleCloseModalBanGiaoKhachHangHangLoat}
         typeModal={typeModal}
         setTypeModal={setTypeModal}
         showModal={openModalBanGiaoHangLoat}
         setLoading={setLoading}
         refetch={refetchkh}
      />
    </Box>
  );
};

export default KhachHangTiemNang;
