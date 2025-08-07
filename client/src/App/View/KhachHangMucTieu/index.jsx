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
  Chip,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ModalUpdateKHMucTieu from "./Modal/ModalUpdateKHMucTieu";
import ModalBanGiaoKhachHangMucTieu from "./Modal/ModalBanGiaoKhachHangMucTieu";
import {
  useGetTemplatesMutation,
} from "src/App/Api/KhachHangTiemNangApi";
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
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import CustomButtonAction from "src/App/Components/CustomButtonAction/CustomButtonAction";
import { useDateCustomer, useMenuStore } from "src/App/Hooks/hook";
import { useGetMenuByIdQuery } from "src/App/Api/MenuApi";
const KhachHangMucTieu = () => {
  const { tuNgay, denNgay, setTuNgay, setDenNgay } = useDateCustomer(),
    { menuId, setMenuId } = useMenuStore(),
    { data: menuData } = useGetMenuByIdQuery(menuId),
    tuNgayObj = useMemo(() => dayjs(tuNgay), [tuNgay]),
    denNgayObj = useMemo(() => dayjs(denNgay), [denNgay]),
    [selectedRow, setSelectedRow] = useState([]),
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
            <span>
              <IconButton onClick={handleOpenModalUpdateKhachHang} disabled={!menuData?.menuRoles[0]?.sua || !(selectedRow?.length > 0)}>
                <EditIcon color={(!menuData?.menuRoles[0]?.sua || !(selectedRow?.length > 0)) ? "disabled" : "success"} />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Xóa">
            <span>
              <IconButton onClick={() => handleDeleteKhachHang(params?.id)} disabled={!menuData?.menuRoles[0]?.xoa || !(selectedRow?.length > 0)}>
                <DeleteIcon color={(!menuData?.menuRoles[0]?.xoa || !(selectedRow?.length > 0)) ? "disabled" : "error"} />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Bàn giao khách hàng">
            <span>
              <IconButton onClick={handleOpenModalBanGiao} disabled={!menuData?.menuRoles[0]?.sua || !(selectedRow?.length > 0)}>
                <ThreePIcon color={(!menuData?.menuRoles[0]?.sua || !(selectedRow?.length > 0)) ? "disabled" : "info"} />
              </IconButton>
            </span>
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
              {params?.row?.nguoiDung?.hinhAnh == "" ? (
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
            state={{ menuId: menuId }}
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
    {
      field: "phanLoaiKhachHang",
      headerName: "Phân loại khách hàng",
      width: 200,
      renderCell: (params) => {
        const name = params?.row?.phanLoaiKhachHang?.id || "";

        const getColor = (name) => {
          switch (name) {
            case 1:
              return "#FFD700";
            case 2:
              return "#90EE90";
            case 3:
              return "#ADD8E6";
            case 4:
              return "#FFA07A";
            case 5:
              return "#e32d14";
            default:
              return "#FFFFFF";
          }
        };

        return (
          <Chip label={params?.row?.phanLoaiKhachHang?.name} sx={{ backgroundColor: getColor(name), color: "white" }} />
        );
      },
    },
    { field: "tenVietTat", headerName: "Tên viết tắt", width: 200 },
    { field: "maSoThue", headerName: "Mã số thuế", width: 200 },
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
    useGetKhachHangMucTieuByNguoiDungIdQuery({
      tuNgay: tuNgay,
      denNgay: denNgay,
    });
  const [getTemplate] = useGetTemplatesMutation();
  const [deleteNguoiDung] = useDeleteKhachHangMucTieuMutation();
  const [deleteHangLoat] = useDeletehangLoatKhachHangMucTieuMutation();

  const handleDeleteKhachHang = async (id) => {
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
  const handleGetTemplates = async () => {
    try {
      const result = await getTemplate({
        path: "Templates/ThongTinKhachHang.xlsx",
        filename: "ThongTinKhachHang",
      }).unwrap();

      if (result instanceof Blob) {
        const url = window.URL.createObjectURL(result);
        const a = document.createElement("a");
        a.href = url;
        a.download = "ThongTinKhachHang.xlsx";
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
              <div>
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
                <Typography>
                  danh sách này lưu trữ thông tin chi tiết như lịch sử mua hàng,
                  nhu cầu, và tương tác, giúp đội ngũ bán hàng và tiếp thị cá
                  nhân hóa trải nghiệm khách hàng. Quản lý hiệu quả danh sách
                  này giúp xây dựng mối quan hệ bền vững, tối ưu hóa chiến lược
                  chăm sóc, và thúc đẩy doanh thu dài hạn
                </Typography>
              </div>
            </Stack>
            <Stack direction="row" spacing={1.5}>
              <Button variant={"contained"} style={{ fontWeight: "bold" }} color="primary" onClick={gotoLink} startIcon={<AddIcon />} disabled={!menuData?.menuRoles[0]?.them}>
                Thêm Khách hàng
              </Button>
              <Button variant={"contained"} style={{ fontWeight: "bold" }} color="success" onClick={handleOpenModalImportKhachHang} startIcon={<FileDownloadDoneIcon />} disabled={!menuData?.menuRoles[0]?.them}>
                Nhập khẩu Khách hàng
              </Button>
              <Button variant={"contained"} style={{ fontWeight: "bold" }} color="info" onClick={handleOpenModalImportKhachHang} startIcon={<SupervisedUserCircleIcon />} disabled={!menuData?.menuRoles[0]?.them}>
                Bàn giao Khách hàng
              </Button>
              <Button variant={"contained"} style={{ fontWeight: "bold" }} color="inherit" onClick={handleOpen} startIcon={<UpdateIcon />} disabled={!menuData?.menuRoles[0]?.them}>
                Lịch sử mua hàng
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
            <MenuItem onClick={handleGetTemplates} disabled={!menuData?.menuRoles[0]?.sua}>
              <Stack direction="row" spacing={1} alignItems="center">
                <GetAppIcon color="primary" />
                <Typography>Xuất mẫu</Typography>
              </Stack>
            </MenuItem>
            <MenuItem onClick={handleOpenKhDaXoa} disabled={!menuData?.menuRoles[0]?.xem}>
              <Stack direction="row" spacing={1} alignItems="center">
                <DeleteIcon color="error" />
                <Typography>Đã xóa</Typography>
              </Stack>
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem onClick={handleDeleteMuliple} disabled={!menuData?.menuRoles[0]?.xoa}>
              <Stack direction="row" spacing={1} alignItems="center">
                <DeleteOutlineIcon color="error" />
                <Typography>Xóa nhiều dòng</Typography>
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
