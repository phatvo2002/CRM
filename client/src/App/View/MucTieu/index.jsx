import { Avatar, Button, Grid2, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import NoImage from "../../Assets/image/no-image.png";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import ModalThemMoi from "./modal/ModalThemMoi";
import { useGetAllMucTieuDoanhSoQuery } from "src/App/Api/MucTieuDoanhSo.Api";
import Moment from "react-moment";

const userData = JSON.parse(localStorage.getItem("authorizationData"));
const index = () => {
  const [valueTuNgay, setValueTuNgay] = useState(dayjs().startOf("month"));
  const [valueDenNgay, setValueDenNgay] = useState(dayjs().endOf("month"));
  const [selectedRow, setSelectedRow] = useState(null);
  const [openRowIndex, setOpenRowIndex] = useState(null);
  const [row, setRow] = useState([]);
  const { data: dataMucTieu, refetch: refetch } = useGetAllMucTieuDoanhSoQuery({
    tuNgay: valueTuNgay.format("YYYY-MM-DD HH:mm:ss.SSS"),
    denNgay: valueDenNgay.format("YYYY-MM-DD HH:mm:ss.SSS"),
  });

  const checkPermission = userData?.response?.checkIsTruongPhong
  const checkAdminPerMission =  userData?.response?.phongBan?.id
  const [open, setOpen] = useState(false);
  const [modalThemMoiMucTieu, setModalThemMoiMucTieu] = useState();

  const handleOpenModalThemMoiMucTieu = () => {
    setModalThemMoiMucTieu(true);
  };
  const handleCloseModalThemMoi = () => {
    setModalThemMoiMucTieu(false);
  };

  useEffect(() => {
    if (dataMucTieu) {
      setRow(dataMucTieu);
    }
  }, [dataMucTieu]);


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
            Mục tiêu doanh số
          </Typography>
        </Grid2>
        <Grid2 sx={12}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", sm: "center" }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: 2, textTransform: "none", boxShadow: 3 }}
              onClick={handleOpenModalThemMoiMucTieu}
              startIcon={<AddIcon />}
            >
              Thêm mục tiêu
            </Button>
          </Stack>
        </Grid2>
        <Grid2 size={12}>
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
        <Grid2 xs={12}>
          <Paper>
            <Box sx={{ maxHeight: 500, overflow: "auto" }}>
              <Table
                sx={{
                  minWidth: "2550px",
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                  overflow: "auto",
                }}
              >
                <TableHead>
                  <TableRow sx={{ backgroundColor: "background.primary" }}>
                    <TableCell
                      sx={{ fontWeight: "bold", color: "#333", width: "300px" }}
                    >
                      Hành động
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        color: "#333",
                        width: "300px",
                        flex: 1,
                      }}
                    >
                      Tên KPI
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold", color: "#333", width: "300px" }}
                    >
                      Tên phòng ban
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold", color: "#333", width: "300px" }}
                    >
                      Nhân viên phụ trách
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold", color: "#333", width: "300px" }}
                    >
                      Ngày bắt đầu
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold", color: "#333", width: "300px" }}
                    >
                      Ngày kết thúc
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold", color: "#333", width: "300px" }}
                    >
                      SL Cuộc Gọi / Thực Tế
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold", color: "#333", width: "300px" }}
                    >
                      SL Lịch Hẹn / Thực Tế
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold", color: "#333", width: "300px" }}
                    >
                      SL Email Tương Tác Khách Hàng / Thực Tế
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold", color: "#333", width: "300px" }}
                    >
                      SL Tiềm Năng Đã Chuyển Đổi / Thực tế
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold", color: "#333", width: "300px" }}
                    >
                      SL Email Báo Giá/ Thực tế
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold", color: "#333", width: "300px" }}
                    >
                      Doanh Số / Thực tế
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold", color: "#333", width: "300px" }}
                    >
                      Tổng tỷ lệ (%)
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold", color: "#333", width: "300px" }}
                    >
                      Đánh giá
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold", color: "#333", width: "300px" }}
                    >
                      Tình Trạng
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.length > 0 &&
                    row.map((item, index) => (
                      <>
                        <TableRow
                          key={index}
                          hover
                          onClick={() => setSelectedRow(item)}
                          selected={selectedRow?.id === item.id}
                          sx={{
                            cursor: "pointer",
                            backgroundColor:
                              selectedRow?.id === item.id
                                ? "#e3f2fd"
                                : "inherit",
                          }}
                        >
                          <TableCell sx={{ width: 100 }}>
                            <IconButton
                              size="small"
                              onClick={() => setOpen(!open)}
                            >
                              {open ? (
                                <KeyboardArrowUp />
                              ) : (
                                <KeyboardArrowDown />
                              )}
                            </IconButton>
                            <IconButton color="success">
                              <EditIcon />
                            </IconButton>
                            <IconButton color="error">
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                          <TableCell sx={{ color: "#555" }}>
                            {item?.tenKPI}
                          </TableCell>
                          <TableCell align="center" sx={{ color: "#555" }}>
                            {item?.phongBan?.tenPhongBan}
                          </TableCell>
                          <TableCell align="center" sx={{ color: "#555" }}>
                            <div
                              style={{ alignItem: "center", marginLeft: "30%" }}
                            >
                              {" "}
                              {item?.nguoiDung?.hinhAnh == null ? (
                                <>
                                  <Avatar alt="" src={NoImage} />
                                </>
                              ) : (
                                <>
                                  <Avatar
                                    alt=""
                                    src={
                                      "data:image/jpeg;base64," +
                                      item?.nguoiDung?.hinhAnh
                                    }
                                  />
                                </>
                              )}
                            </div>
                            {item?.nguoiDung?.hoVaDem}
                            {item?.nguoiDung?.ten}
                          </TableCell>
                          <TableCell align="center" sx={{ color: "#555" }}>
                            <Moment format="DD/MM/YYYY ">
                              {new Date(item?.ngayBatDau)}
                            </Moment>
                          </TableCell>
                          <TableCell align="center" sx={{ color: "#555" }}>
                            <Moment format="DD/MM/YYYY ">
                              {new Date(item?.ngayKetThuc)}
                            </Moment>
                          </TableCell>
                          <TableCell align="center" sx={{ color: "#555" }}>
                            <div>
                              {item?.soCuocGoi} / {item?.soCuocGoiThucTe}
                            </div>
                            <p>{item?.tileCuocGoiThucTe} %</p>
                          </TableCell>
                          <TableCell align="center" sx={{ color: "#555" }}>
                            <div>
                              {item?.soLichHen} / {item?.soLichHenThucTe}
                            </div>
                            <p>{item?.tileLichHenThucTe} %</p>
                          </TableCell>
                          <TableCell align="center" sx={{ color: "#555" }}>
                            <div>
                              {item?.soKhachHangTiemNangDaChuyenDoi} /{" "}
                              {item?.soKhachHangTiemNangDaChuyenDoiThucTe}
                            </div>
                            <p>
                              {item?.tiLeSoKhachHangTiemNangDaChuyenDoiThucTe} %
                            </p>
                          </TableCell>
                          <TableCell align="center" sx={{ color: "#555" }}>
                            <div>
                              {item?.soEmailTuongTacKhachHang} /{" "}
                              {item?.soEmailTruongTacKhachHangThucTe}
                            </div>
                            <p>{item?.tileEmailTuongTacThucTe} %</p>
                          </TableCell>
                          <TableCell align="center" sx={{ color: "#555" }}>
                            <div>
                              {item?.soEmailBaoGia} /{" "}
                              {item?.soEmailBaoGiaThucTe}
                            </div>
                            <p>{item?.tiLeEmailBaoGiaThucTe} %</p>
                          </TableCell>
                          <TableCell align="center" sx={{ color: "#555" }}>
                            <div>
                              {item?.doanhSo.toLocaleString("vi-VN")} /{" "}
                              {item?.doanhSoThucTe.toLocaleString("vi-VN")}
                            </div>
                            <p>{item?.tiLeDoanhSoThucTe} %</p>
                          </TableCell>
                          <TableCell align="center" sx={{ color: "#555" }}>
                            <p>{item?.tongTiLeThucTe} %</p>
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ color: "#555" }}
                          ></TableCell>
                          <TableCell
                            align="center"
                            sx={{ color: "#555" }}
                          ></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={12} sx={{ padding: 0 }}>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                              <Box
                                sx={{
                                  margin: 2,
                                  backgroundColor: "#fff",
                                  borderRadius: "4px",
                                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                }}
                              >
                                <Typography
                                  variant="h6"
                                  gutterBottom
                                  sx={{ padding: "8px 16px", color: "#1976d2" }}
                                >
                                  Thông tin KPI chi tiết
                                </Typography>
                                <Table size="small">
                                  <TableHead>
                                    <TableRow
                                      sx={{ backgroundColor: "#f5f5f5" }}
                                    >
                                      <TableCell sx={{ width: "5%" }} />
                                      <TableCell />
                                      <TableCell sx={{ fontWeight: "bold" }}>
                                        Nhân viên
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        sx={{ fontWeight: "bold" }}
                                      >
                                        Ngày bắt đầu
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        sx={{ fontWeight: "bold" }}
                                      >
                                        Ngày kết thúc
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        sx={{ fontWeight: "bold" }}
                                      >
                                        SL cuộc gọi / Thực tế
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        sx={{ fontWeight: "bold" }}
                                      >
                                        SL lịch hẹn / Thực tế
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        sx={{ fontWeight: "bold" }}
                                      >
                                        SL Email tương tác / Thực tế
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        sx={{ fontWeight: "bold" }}
                                      >
                                        SL báo giá / Thực tế
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        sx={{ fontWeight: "bold" }}
                                      >
                                        SL tiềm năng đã chuyển đổi / Thực tế
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        sx={{ fontWeight: "bold" }}
                                      >
                                        Doanh số / Thực tế
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        sx={{ fontWeight: "bold" }}
                                      >
                                        Tổng phần trăm
                                      </TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {/* Dữ liệu chi tiết KPI */}
                                  </TableBody>
                                </Table>
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </Paper>
        </Grid2>
      </Grid2>

      {/* Modal thêm mới */}
      <ModalThemMoi
        showModal={modalThemMoiMucTieu}
        closeModal={handleCloseModalThemMoi}
        refetch={refetch}
        checkpermission={checkPermission}
        checkAdminPerMission={checkAdminPerMission}
      />
    </>
  );
};

export default index;
