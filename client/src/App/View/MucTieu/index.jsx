import {
  Avatar,
  Button,
  Checkbox,
  Grid2,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconExcel from "../../Assets/icon/excel.png";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import NoImage from "../../Assets/image/no-image.png";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import ModalThemMoi from "./modal/ModalThemMoi";
import { useGetAllMucTieuDoanhSoQuery } from "src/App/Api/MucTieuDoanhSo.Api";
import Moment from "react-moment";
import ModalChinhSua from "./modal/ModalChinhSua";

const userData = JSON.parse(localStorage.getItem("authorizationData"));
const index = () => {
  const [valueTuNgay, setValueTuNgay] = useState(dayjs().startOf("month"));
  const [valueDenNgay, setValueDenNgay] = useState(dayjs().endOf("month"));
  const [selectedRow, setSelectedRow] = useState(null);
  const [openRow, setOpenRow] = useState(null);
  const [row, setRow] = useState([]);
  const [modalThemMoiMucTieu, setModalThemMoiMucTieu] = useState();
  const [modalChinhSua, setModalChinhSua] = useState();
  const { data: dataMucTieu, refetch: refetch } = useGetAllMucTieuDoanhSoQuery({
    tuNgay: valueTuNgay.format("YYYY-MM-DD HH:mm:ss.SSS"),
    denNgay: valueDenNgay.format("YYYY-MM-DD HH:mm:ss.SSS"),
  });

  const checkPermission = userData?.response?.checkIsTruongPhong;
  const checkAdminPerMission = userData?.response?.phongBan?.id;


  const handleOpenModalThemMoiMucTieu = () => {
    setModalThemMoiMucTieu(true);
  };
  const handleCloseModalThemMoi = () => {
    setModalThemMoiMucTieu(false);
  };
  const handleOpenModalChinhSua = () => {
    setModalChinhSua(true);
  };
  const handleCloseModalChinhSua = () => {
    setModalChinhSua(false);
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
            <Button
              variant="contained"
              color="success"
              sx={{ borderRadius: 2, textTransform: "none", boxShadow: 3 }}
              //   onClick={handleOpenModalThemMoiMucTieu}
            >
              <img
                src={IconExcel}
                alt="Xuất thống kê"
                width={24}
                height={24}
                style={{ marginRight: 10 }}
              />{" "}
              Xuất excel
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
                  backgroundColor: "#fff",
                }}
              >
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableCell
                      sx={{ borderRight: "1px solid #e0e0e0", width: "60px" }}
                    />
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "bold",
                        color: "#333",
                        borderRight: "1px solid #e0e0e0",
                        width: "120px",
                      }}
                    >
                      Hành động
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "bold",
                        color: "#333",
                        borderRight: "1px solid #e0e0e0",
                        width: "200px",
                      }}
                    >
                      Trưởng phòng phụ trách
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "bold",
                        color: "#333",
                        borderRight: "1px solid #e0e0e0",
                        width: "200px",
                      }}
                    >
                      Tên KPI
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "bold",
                        color: "#333",
                        borderRight: "1px solid #e0e0e0",
                        width: "200px",
                      }}
                    >
                      Tên phòng ban
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "bold",
                        color: "#333",
                        borderRight: "1px solid #e0e0e0",
                        width: "150px",
                      }}
                    >
                      Ngày bắt đầu
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "bold",
                        color: "#333",
                        borderRight: "1px solid #e0e0e0",
                        width: "150px",
                      }}
                    >
                      Ngày kết thúc
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "bold",
                        color: "#333",
                        borderRight: "1px solid #e0e0e0",
                        width: "200px",
                      }}
                    >
                      SL Cuộc Gọi / Thực Tế
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "bold",
                        color: "#333",
                        borderRight: "1px solid #e0e0e0",
                        width: "200px",
                      }}
                    >
                      SL Lịch Hẹn / Thực Tế
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "bold",
                        color: "#333",
                        borderRight: "1px solid #e0e0e0",
                        width: "200px",
                      }}
                    >
                      SL Email Tương Tác / Thực Tế
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "bold",
                        color: "#333",
                        borderRight: "1px solid #e0e0e0",
                        width: "200px",
                      }}
                    >
                      SL Tiềm Năng Đã Chuyển Đổi / Thực Tế
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "bold",
                        color: "#333",
                        borderRight: "1px solid #e0e0e0",
                        width: "200px",
                      }}
                    >
                      SL Email Báo Giá / Thực Tế
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "bold",
                        color: "#333",
                        borderRight: "1px solid #e0e0e0",
                        width: "200px",
                      }}
                    >
                      Doanh Số / Thực Tế
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "bold",
                        color: "#333",
                        borderRight: "1px solid #e0e0e0",
                        width: "150px",
                      }}
                    >
                      Tổng tỷ lệ (%)
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "bold",
                        color: "#333",
                        borderRight: "1px solid #e0e0e0",
                        width: "150px",
                      }}
                    >
                      Đánh giá
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.length > 0 &&
                    row.map((item, index) => (
                      <React.Fragment key={index}>
                        <TableRow
                          hover
                          selected={selectedRow?.id === item.id}
                          sx={{
                            cursor: "pointer",
                            backgroundColor:
                              selectedRow?.id === item.id
                                ? "#e3f2fd"
                                : "inherit",
                            "& > *": { borderBottom: "1px solid #e0e0e0" },
                          }}
                        >
                          <TableCell
                            padding="checkbox"
                            sx={{ borderRight: "1px solid #e0e0e0" }}
                          >
                            {checkPermission === false && (
                              <Checkbox
                                color="primary"
                                checked={selectedRow?.id === item.id}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedRow(item);
                                  } else {
                                    setSelectedRow(null);
                                  }
                                }}
                              />
                            )}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              borderRight: "1px solid #e0e0e0",
                              width: "120px",
                            }}
                          >
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenRow(openRow === index ? null : index);
                              }}
                            >
                              {openRow === index ? (
                                <KeyboardArrowUp />
                              ) : (
                                <KeyboardArrowDown />
                              )}
                            </IconButton>
                            {checkPermission === false && (
                              <IconButton
                                color="success"
                                disabled={selectedRow == null}
                                onClick={handleOpenModalChinhSua}
                              >
                                <EditIcon />
                              </IconButton>
                            )}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              borderRight: "1px solid #e0e0e0",
                              width: "200px",
                            }}
                          >
                            <Box
                              display="flex"
                              flexDirection="column"
                              alignItems="center"
                            >
                              <Avatar
                                alt=""
                                src={
                                  item?.nguoiDung?.hinhAnh == null
                                    ? NoImage
                                    : `data:image/jpeg;base64,${item?.nguoiDung?.hinhAnh}`
                                }
                                sx={{
                                  width: 40,
                                  height: 40,
                                  mb: 0.5,
                                  margin: "0 auto",
                                }}
                              />
                              <Typography variant="body2">
                                {item?.nguoiDung?.hoVaDem}{" "}
                                {item?.nguoiDung?.ten}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              color: "#555",
                              borderRight: "1px solid #e0e0e0",
                              width: "200px",
                            }}
                          >
                            {item?.tenKPI}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              color: "#555",
                              borderRight: "1px solid #e0e0e0",
                              width: "200px",
                            }}
                          >
                            {item?.phongBan?.tenPhongBan}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              color: "#555",
                              borderRight: "1px solid #e0e0e0",
                              width: "150px",
                            }}
                          >
                            <Moment format="DD/MM/YYYY">
                              {item?.ngayBatDau}
                            </Moment>
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              color: "#555",
                              borderRight: "1px solid #e0e0e0",
                              width: "150px",
                            }}
                          >
                            <Moment format="DD/MM/YYYY">
                              {item?.ngayKetThuc}
                            </Moment>
                          </TableCell>
                          {[
                            {
                              value1: item?.soCuocGoi,
                              value2: item?.soCuocGoiThucTe,
                              percent: item?.tileCuocGoiThucTe,
                            },
                            {
                              value1: item?.soLichHen,
                              value2: item?.soLichHenThucTe,
                              percent: item?.tileLichHenThucTe,
                            },
                            {
                              value1: item?.soEmailTuongTacKhachHang,
                              value2: item?.soEmailTruongTacKhachHangThucTe,
                              percent: item?.tileEmailTuongTacThucTe,
                            },
                            {
                              value1: item?.soKhachHangTiemNangDaChuyenDoi,
                              value2:
                                item?.soKhachHangTiemNangDaChuyenDoiThucTe,
                              percent:
                                item?.tiLeSoKhachHangTiemNangDaChuyenDoiThucTe,
                            },
                            {
                              value1: item?.soEmailBaoGia,
                              value2: item?.soEmailBaoGiaThucTe,
                              percent: item?.tiLeEmailBaoGiaThucTe,
                            },
                          ].map((data, i) => (
                            <TableCell
                              align="center"
                              key={i}
                              sx={{
                                borderRight: "1px solid #e0e0e0",
                                width: "200px",
                              }}
                            >
                              <Typography variant="body2">
                                {data.value1} / {data.value2}
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{ color: "#777" }}
                              >
                                {data.percent} %
                              </Typography>
                            </TableCell>
                          ))}
                          <TableCell
                            align="center"
                            sx={{
                              borderRight: "1px solid #e0e0e0",
                              width: "200px",
                            }}
                          >
                            <Typography variant="body2">
                              {item?.doanhSo.toLocaleString("vi-VN")} /{" "}
                              {item?.doanhSoThucTe.toLocaleString("vi-VN")}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ color: "#777" }}
                            >
                              {item?.tiLeDoanhSoThucTe} %
                            </Typography>
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              borderRight: "1px solid #e0e0e0",
                              width: "150px",
                            }}
                          >
                            <Typography variant="body2">
                              {item?.tongTiLeThucTe.toFixed(2)} %
                            </Typography>
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              borderRight: "1px solid #e0e0e0",
                              width: "150px",
                            }}
                          >
                            <Typography variant="body2">
                              {item.xepLoai || ""}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "60px",
                              }}
                            >
                              <Box
                                sx={{
                                  width: "50px",
                                  height: "50px",
                                  backgroundColor: item?.color,
                                  borderRadius: "4px",
                                }}
                              />
                            </Box>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            colSpan={15}
                            sx={{ padding: 0, borderBottom: "none" }}
                          >
                            <Collapse
                              in={openRow === index}
                              timeout="auto"
                              unmountOnExit
                            >
                              <Box
                                sx={{
                                  m: 2,
                                  backgroundColor: "#fafafa",
                                  borderRadius: "8px",
                                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                  border: "1px solid #e0e0e0",
                                  p: 2,
                                }}
                              >
                                <Typography
                                  variant="h6"
                                  gutterBottom
                                  sx={{ color: "#1976d2", fontWeight: 600 }}
                                >
                                  Thông tin KPI chi tiết
                                </Typography>
                                <Table
                                  size="small"
                                  sx={{ border: "1px solid #e0e0e0" }}
                                >
                                  <TableHead>
                                    <TableRow
                                      sx={{ backgroundColor: "#f5f5f5" }}
                                    >
                                      {[
                                        "",
                                        "Hành động",
                                        "Nhân viên",
                                        "Ngày bắt đầu",
                                        "Ngày kết thúc",
                                        "SL cuộc gọi / Thực tế",
                                        "SL lịch hẹn / Thực tế",
                                        "SL Email tương tác / Thực tế",
                                        "SL tiềm năng đã chuyển đổi / Thực tế",
                                        "SL báo giá / Thực tế",
                                        "Doanh số / Thực tế",
                                        "Tổng phần trăm",
                                        "Đánh giá",
                                        "",
                                      ].map((text, idx) => (
                                        <TableCell
                                          key={idx}
                                          align="center"
                                          sx={{
                                            fontWeight: "bold",
                                            color: "#333",
                                            borderRight: "1px solid #e0e0e0",
                                            width:
                                              idx === 0 || idx === 13
                                                ? "60px"
                                                : idx === 1
                                                  ? "120px"
                                                  : idx === 2
                                                    ? "200px"
                                                    : "150px",
                                          }}
                                        >
                                          {text}
                                        </TableCell>
                                      ))}
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {item?.kpiNhanViens.map((kpi, subIndex) => (
                                      <TableRow
                                        key={subIndex}
                                        sx={{
                                          "& > *": {
                                            borderBottom: "1px solid #e0e0e0",
                                          },
                                        }}
                                      >
                                        <TableCell
                                          padding="checkbox"
                                          sx={{
                                            borderRight: "1px solid #e0e0e0",
                                            width: "60px",
                                          }}
                                        >
                                          {checkPermission === true && (
                                            <Checkbox
                                              color="primary"
                                              checked={
                                                selectedRow?.id === kpi?.id
                                              }
                                              onChange={(e) => {
                                                if (e.target.checked) {
                                                  setSelectedRow(kpi);
                                                } else {
                                                  setSelectedRow(null);
                                                }
                                              }}
                                            />
                                          )}
                                        </TableCell>
                                        <TableCell
                                          align="center"
                                          sx={{
                                            borderRight: "1px solid #e0e0e0",
                                            width: "120px",
                                          }}
                                        >
                                          {checkPermission === true && (
                                            <IconButton
                                              color="success"
                                              disabled={selectedRow == null}
                                              onClick={handleOpenModalChinhSua}
                                            >
                                              <EditIcon />
                                            </IconButton>
                                          )}
                                        </TableCell>
                                        <TableCell
                                          align="center"
                                          sx={{
                                            borderRight: "1px solid #e0e0e0",
                                            width: "200px",
                                          }}
                                        >
                                          <Box
                                            display="flex"
                                            flexDirection="column"
                                            alignItems="center"
                                          >
                                            <Avatar
                                              alt=""
                                              src={
                                                kpi?.nguoiDung?.hinhAnh == null
                                                  ? NoImage
                                                  : `data:image/jpeg;base64,${kpi.nguoiDung.hinhAnh}`
                                              }
                                              sx={{
                                                width: 40,
                                                height: 40,
                                                mb: 0.5,
                                                margin: "0 auto",
                                              }}
                                            />
                                            <Typography variant="body2">
                                              {kpi.nguoiDung.hoVaDem}{" "}
                                              {kpi.nguoiDung.ten}
                                            </Typography>
                                          </Box>
                                        </TableCell>
                                        <TableCell
                                          align="center"
                                          sx={{
                                            borderRight: "1px solid #e0e0e0",
                                            width: "150px",
                                          }}
                                        >
                                          <Moment format="DD/MM/YYYY">
                                            {kpi?.ngayBatDau}
                                          </Moment>
                                        </TableCell>
                                        <TableCell
                                          align="center"
                                          sx={{
                                            borderRight: "1px solid #e0e0e0",
                                            width: "150px",
                                          }}
                                        >
                                          <Moment format="DD/MM/YYYY">
                                            {kpi?.ngayKetThuc}
                                          </Moment>
                                        </TableCell>
                                        <TableCell
                                          align="center"
                                          sx={{
                                            borderRight: "1px solid #e0e0e0",
                                            width: "150px",
                                          }}
                                        >
                                          <Typography variant="body2">
                                            {kpi.soCuocGoi} /{" "}
                                            {kpi.soCuocGoiThucTe}
                                          </Typography>
                                          <Typography
                                            variant="caption"
                                            sx={{ color: "#777" }}
                                          >
                                            {kpi.tileCuocGoiThucTe} %
                                          </Typography>
                                        </TableCell>
                                        <TableCell
                                          align="center"
                                          sx={{
                                            borderRight: "1px solid #e0e0e0",
                                            width: "150px",
                                          }}
                                        >
                                          <Typography variant="body2">
                                            {kpi.soLichHen} /{" "}
                                            {kpi.soLichHenThucTe}
                                          </Typography>
                                          <Typography
                                            variant="caption"
                                            sx={{ color: "#777" }}
                                          >
                                            {kpi.tileLichHenThucTe} %
                                          </Typography>
                                        </TableCell>
                                        <TableCell
                                          align="center"
                                          sx={{
                                            borderRight: "1px solid #e0e0e0",
                                            width: "150px",
                                          }}
                                        >
                                          <Typography variant="body2">
                                            {kpi.soEmailTuongTacKhachHang} /{" "}
                                            {
                                              kpi.soEmailTruongTacKhachHangThucTe
                                            }
                                          </Typography>
                                          <Typography
                                            variant="caption"
                                            sx={{ color: "#777" }}
                                          >
                                            {kpi.tileEmailTuongTacThucTe} %
                                          </Typography>
                                        </TableCell>
                                        <TableCell
                                          align="center"
                                          sx={{
                                            borderRight: "1px solid #e0e0e0",
                                            width: "150px",
                                          }}
                                        >
                                          <Typography variant="body2">
                                            {kpi.soKhachHangTiemNangDaChuyenDoi}{" "}
                                            /{" "}
                                            {
                                              kpi.soKhachHangTiemNangDaChuyenDoiThucTe
                                            }
                                          </Typography>
                                          <Typography
                                            variant="caption"
                                            sx={{ color: "#777" }}
                                          >
                                            {
                                              kpi.tiLeSoKhachHangTiemNangDaChuyenDoiThucTe
                                            }{" "}
                                            %
                                          </Typography>
                                        </TableCell>
                                        <TableCell
                                          align="center"
                                          sx={{
                                            borderRight: "1px solid #e0e0e0",
                                            width: "150px",
                                          }}
                                        >
                                          <Typography variant="body2">
                                            {kpi.soEmailBaoGia} /{" "}
                                            {kpi.soEmailBaoGiaThucTe}
                                          </Typography>
                                          <Typography
                                            variant="caption"
                                            sx={{ color: "#777" }}
                                          >
                                            {kpi.tiLeEmailBaoGiaThucTe} %
                                          </Typography>
                                        </TableCell>
                                        <TableCell
                                          align="center"
                                          sx={{
                                            borderRight: "1px solid #e0e0e0",
                                            width: "150px",
                                          }}
                                        >
                                          <Typography variant="body2">
                                            {kpi.doanhSo.toLocaleString(
                                              "vi-VN"
                                            )}{" "}
                                            /{" "}
                                            {kpi.doanhSoThucTe.toLocaleString(
                                              "vi-VN"
                                            )}
                                          </Typography>
                                          <Typography
                                            variant="caption"
                                            sx={{ color: "#777" }}
                                          >
                                            {kpi.tiLeDoanhSoThucTe} %
                                          </Typography>
                                        </TableCell>
                                        <TableCell
                                          align="center"
                                          sx={{
                                            borderRight: "1px solid #e0e0e0",
                                            width: "150px",
                                          }}
                                        >
                                          <Typography variant="body2">
                                            {kpi.tongTiLeThucTe.toFixed(2)} %
                                          </Typography>
                                        </TableCell>
                                        <TableCell
                                          align="center"
                                          sx={{
                                            borderRight: "1px solid #e0e0e0",
                                            width: "150px",
                                          }}
                                        >
                                          <Typography variant="body2">
                                            {kpi.xepLoai || ""}
                                          </Typography>
                                          <Box
                                            sx={{
                                              display: "flex",
                                              justifyContent: "center",
                                              alignItems: "center",
                                              height: "60px",
                                            }}
                                          >
                                            <Box
                                              sx={{
                                                width: "50px",
                                                height: "50px",
                                                backgroundColor: kpi.color,
                                                borderRadius: "4px",
                                              }}
                                            />
                                          </Box>
                                        </TableCell>
                                        <TableCell
                                          sx={{
                                            borderRight: "1px solid #e0e0e0",
                                            width: "60px",
                                          }}
                                        />
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
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
      {/* Modal chỉnh sửa */}
      <ModalChinhSua
        showModal={modalChinhSua}
        closeModal={handleCloseModalChinhSua}
        refetch={refetch}
        checkpermission={checkPermission}
        selectedRow={selectedRow}
      />
    </>
  );
};

export default index;
