import {
  Autocomplete,
  Box,
  Grid2,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import SouthIcon from "@mui/icons-material/South";
import NorthIcon from "@mui/icons-material/North";
import CasesIcon from "@mui/icons-material/Cases";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import Person2Icon from "@mui/icons-material/Person2";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import PaidIcon from "@mui/icons-material/Paid";
import Barchart from "src/App/Components/Customchart/CustomBarchart/Barchart";
import Piechart from "src/App/Components/Customchart/CustomPieChart/Piechart";
import {
  useGetBaoCaoHoatDongQuery,
  useGetBaoCaoTheoBaoGiaQuery,
  useGetBaoCaoTheoCoHoiQuery,
  useGetBaoCaoTheoDonHangQuery,
  useGetBaoTongTheQuery,
  useGetCuocGoiTheoTrangThaiQuery,
  useGetTop5KhachHangTuongTacQuery,
} from "src/App/Api/BaoCao.api";
import FunnelChartCustom from "src/App/Components/Customchart/CustomFunnelChart/FunnelChart";
import Moment from "react-moment";

const index = () => {
  const [valueTuNgay, setValueTuNgay] = useState(dayjs().startOf("month"));
  const [valueDenNgay, setValueDenNgay] = useState(dayjs().endOf("month"));
  const [dataBaoCao, setDataBaoCao] = useState(null);
  const [baoCaoTheoCoHoiState, setBaoCaoTheoCoHoiState] = useState(null);
  const [baoCaoBaoGiaState, setBaoCaoBaoGiaState] = useState(null);
  const [baoCaoDonHangState, setBaoCaoDonHangState] = useState(null);
  const [baoCaoHoatDongState, setBaoCaoHoatDongState] = useState(null);
  const [baoCaoTop5KhTuongTacGanDay, setBaoCaoTop5KhachHangTuongTacGanDay] =
    useState(null);
  const [baoCaoCuocGoiTheoTrangThaiState, setBaoCaoCuocGoiTheoTrangThaiState] =
    useState(null);
  const { data: dataBaoCaoTongThe } = useGetBaoTongTheQuery({
    tuNgay: valueTuNgay.format("YYYY-MM-DDT00:00:00"),
    denNgay: valueDenNgay.format("YYYY-MM-DDT23:59:59"),
  });
  const { data: dataBaoCaoTheoCoHoi } = useGetBaoCaoTheoCoHoiQuery({
    tuNgay: valueTuNgay.format("YYYY-MM-DDT00:00:00"),
    denNgay: valueDenNgay.format("YYYY-MM-DDT23:59:59"),
  });
  const { data: dataBaoGia } = useGetBaoCaoTheoBaoGiaQuery({
    tuNgay: valueTuNgay.format("YYYY-MM-DDT00:00:00"),
    denNgay: valueDenNgay.format("YYYY-MM-DDT23:59:59"),
  });
  const { data: dataDonHang } = useGetBaoCaoTheoDonHangQuery({
    tuNgay: valueTuNgay.format("YYYY-MM-DDT00:00:00"),
    denNgay: valueDenNgay.format("YYYY-MM-DDT23:59:59"),
  });
  const { data: dataHoatDong } = useGetBaoCaoHoatDongQuery({
    tuNgay: valueTuNgay.format("YYYY-MM-DDT00:00:00"),
    denNgay: valueDenNgay.format("YYYY-MM-DDT23:59:59"),
  });
  const { data: dataTop5KhachHangTuongTacGanDay } =
    useGetTop5KhachHangTuongTacQuery({
      tuNgay: valueTuNgay.format("YYYY-MM-DDT00:00:00"),
      denNgay: valueDenNgay.format("YYYY-MM-DDT23:59:59"),
    });
  const { data: dataBaoCaoCuocGoiTheoTrangThai } =
    useGetCuocGoiTheoTrangThaiQuery({
      tuNgay: valueTuNgay.format("YYYY-MM-DDT00:00:00"),
      denNgay: valueDenNgay.format("YYYY-MM-DDT23:59:59"),
    });
  const hieuSuatBanHangData = [
    {
      title: "Tổng số tiềm năng đã chuyển đổi",
      value: 2,
      description: "",
      icon: <Person2Icon fontSize="large" />,
      increase: <NorthIcon fontSize="large" />,
      decrease: <SouthIcon fontSize="large" />,
      color: "#b28900",
      currentMonthValue: dataBaoCao?.khachHangTiemNangHienTai,
      previousMonthValue: dataBaoCao?.khachHangTiemNangThangTruoc,
    },
    {
      title: "Tỷ lệ chuyển đổi tiềm năng thành khách hàng (%)",
      value: 2,
      description: "",
      icon: <PersonPinIcon fontSize="large" />,
      increase: <NorthIcon fontSize="large" />,
      decrease: <SouthIcon fontSize="large" />,
      color: "#f44336",
      currentMonthValue: dataBaoCao?.tiLeChuyenDoiKhachHangThangHienTai,
      previousMonthValue: dataBaoCao?.tiLeChuyenDoiKhachHangThangTruoc,
    },
    {
      title: "Tổng số cơ hội mới",
      value: 0,
      description: "",
      icon: <CasesIcon fontSize="large" />,
      increase: <NorthIcon fontSize="large" />,
      decrease: <SouthIcon fontSize="large" />,
      color: "#ff7043",
      currentMonthValue: dataBaoCao?.tongSoCoHoiHienTai,
      previousMonthValue: dataBaoCao?.tongSoCoHoiThangTruoc,
    },
    {
      title: "Tổng số báo giá mới",
      value: 0,
      description: "",
      icon: <RequestQuoteIcon fontSize="large" />,
      increase: <NorthIcon fontSize="large" />,
      decrease: <SouthIcon fontSize="large" />,
      color: "#b22a00",
      currentMonthValue: dataBaoCao?.tongSoBaoGiaHienTai,
      previousMonthValue: dataBaoCao?.tongSoBaoGiaThangTruoc,
    },
    {
      title: "Tổng số đơn hàng",
      value: 0,
      description: "",
      icon: <LocalMallIcon fontSize="large" />,
      increase: <NorthIcon fontSize="large" />,
      decrease: <SouthIcon fontSize="large" />,
      color: "#b26500",
      currentMonthValue: dataBaoCao?.tongSoDonHangHienTai,
      previousMonthValue: dataBaoCao?.tongSoDonHangThangTruoc,
    },
    {
      title: "Doanh thu tháng này",
      description: "",
      icon: <PaidIcon fontSize="large" />,
      increase: <NorthIcon fontSize="large" />,
      decrease: <SouthIcon fontSize="large" />,
      color: "#84c887",
      currentMonthValue: dataBaoCao?.tongDoanhThuHienTai,
      previousMonthValue: dataBaoCao?.tongDoanhThuThangTruoc,
    },
  ];
  const hoatDongTuongTacData = [
    {
      title: "Tổng số nhiệm vụ đã hoàn thành",
      value: 0,
      description: "",
      icon: <TaskAltIcon fontSize="large" />,
      increase: <NorthIcon fontSize="large" />,
      decrease: <SouthIcon fontSize="large" />,
      color: "#b2102f",
      currentMonthValue: baoCaoHoatDongState?.tongSoNhiemVuDaHoanThanhhienTai,
      previousMonthValue:
        baoCaoHoatDongState?.tongSoNhiemVuDaHoanThanhThangTruoc,
    },
    {
      title: "Cuộc gọi đã thực hiện",
      value: 0,
      description: "",
      icon: <PhoneForwardedIcon fontSize="large" />,
      increase: <NorthIcon fontSize="large" />,
      decrease: <SouthIcon fontSize="large" />,
      color: "#4caf50",
      currentMonthValue: baoCaoHoatDongState?.tongSoCuocGoiHienTai,
      previousMonthValue: baoCaoHoatDongState?.tongSoCuocGoiThangTruoc,
    },
    {
      title: "Lịch hẹn đã thực hiện",
      value: 0,
      description: "",
      icon: <CalendarMonthIcon fontSize="large" />,
      increase: <NorthIcon fontSize="large" />,
      decrease: <SouthIcon fontSize="large" />,
      color: "#ffea00",
      currentMonthValue: baoCaoHoatDongState?.tongSoLichHenHienTai,
      previousMonthValue: baoCaoHoatDongState?.tongSoLichHenCuaThangTruoc,
    },
  ];
  const StatisticCard = ({
    title,
    currentMonthValue,
    previousMonthValue,
    description,
    icon,
    color,
  }) => {
    const percentChange =
      previousMonthValue === 0
        ? currentMonthValue > 0
          ? 100
          : 0
        : Math.round(
            ((currentMonthValue - previousMonthValue) / previousMonthValue) *
              100
          );

    const isIncrease = percentChange >= 0;
    const ChangeIcon = isIncrease ? NorthIcon : SouthIcon;

    useEffect(() => {
      if (dataBaoCaoTongThe) {
        setDataBaoCao(dataBaoCaoTongThe);
      }
    }, [dataBaoCaoTongThe]);

    useEffect(() => {
      if (dataBaoCaoTheoCoHoi) {
        setBaoCaoTheoCoHoiState(dataBaoCaoTheoCoHoi);
      } else {
        setBaoCaoTheoCoHoiState([]);
      }
    }, [dataBaoCaoTheoCoHoi]);

    useEffect(() => {
      if (dataBaoGia) {
        setBaoCaoBaoGiaState(dataBaoGia);
      } else {
        setBaoCaoBaoGiaState([]);
      }
    }, [dataBaoGia]);

    useEffect(() => {
      if (dataDonHang) {
        setBaoCaoDonHangState(dataDonHang);
      } else {
        setBaoCaoDonHangState([]);
      }
    }, [dataDonHang]);
    useEffect(() => {
      if (dataHoatDong) {
        setBaoCaoHoatDongState(dataHoatDong);
      } else {
        setBaoCaoHoatDongState([]);
      }
    }, [dataHoatDong]);

    useEffect(() => {
      if (dataTop5KhachHangTuongTacGanDay) {
        setBaoCaoTop5KhachHangTuongTacGanDay(dataTop5KhachHangTuongTacGanDay);
      } else {
        setBaoCaoTop5KhachHangTuongTacGanDay([]);
      }
    }, [dataTop5KhachHangTuongTacGanDay]);

    useEffect(() => {
      if (dataBaoCaoCuocGoiTheoTrangThai) {
        setBaoCaoCuocGoiTheoTrangThaiState(dataBaoCaoCuocGoiTheoTrangThai);
      } else {
        setBaoCaoCuocGoiTheoTrangThaiState([]);
      }
    }, [dataBaoCaoCuocGoiTheoTrangThai]);

    return (
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
          borderLeft: `8px solid ${color}`,
          backgroundColor: "background.primary",
          height: "150px",
        }}
      >
        <Box sx={{ mr: 2, color }}>{icon}</Box>
        <Box>
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            color={color}
            sx={{ height: "40px", overflow: "hidden" }}
          >
            {title}
          </Typography>

          <Typography variant="h5" fontWeight="bold">
            {currentMonthValue}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={1}>
            <ChangeIcon
              fontSize="small"
              sx={{ color: isIncrease ? "green" : "red" }}
            />
            <Typography variant="caption" color={isIncrease ? "green" : "red"}>
              {isIncrease ? "+" : ""}
              {percentChange}%
            </Typography>
            <Typography variant="caption" color="text.secondary">
              so với tháng trước ({previousMonthValue})
            </Typography>
          </Stack>

          <Typography variant="body2">{description}</Typography>
        </Box>
      </Paper>
    );
  };
  return (
    <>
      <Paper>
        <Grid2 container sx={{ padding: 5 }} spacing={2}>
          <Grid2 size={12}>
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              <b>BÀN LÀM VIỆC - NHÂN VIÊN </b>
            </Typography>{" "}
          </Grid2>
          <Grid2 size={12}>
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
          </Grid2>
          <Grid2 size={12}>
            <Typography variant="h5" sx={{ textAlign: "left" }}>
              <b>Tổng quan hiệu suất bán hàng </b>
            </Typography>{" "}
          </Grid2>
          {hieuSuatBanHangData.map((item, index) => (
            <Grid2 item size={3} sm={6} md={3} key={index}>
              <StatisticCard {...item} />
            </Grid2>
          ))}
          <Grid2 size={12}>
            <Typography variant="h5" sx={{ textAlign: "left" }}>
              <b>Cơ hội theo giai đoạn bán hàng </b>
            </Typography>{" "}
            <Paper>
              {Array.isArray(baoCaoTheoCoHoiState) &&
                baoCaoTheoCoHoiState.length > 0 && (
                  <FunnelChartCustom
                    data={baoCaoTheoCoHoiState}
                    dataKey="soLuong"
                    nameKey="tenCoHoi"
                    fill="mauSac"
                  />
                )}
            </Paper>
          </Grid2>
          <Grid2 size={12}>
            <Typography variant="h5" sx={{ textAlign: "left" }}>
              <b>Kết quả bán hàng </b>
            </Typography>{" "}
          </Grid2>
          <Grid2 size={6}>
            <Typography variant="body1" sx={{ textAlign: "left" }}>
              <b>Báo giá theo trạng thái</b>
            </Typography>{" "}
            {Array.isArray(baoCaoBaoGiaState) &&
              baoCaoBaoGiaState.length > 0 && (
                <Piechart data={baoCaoBaoGiaState} dataKey={"number"} />
              )}
          </Grid2>
          <Grid2 size={6}>
            <Typography variant="body1" sx={{ textAlign: "left" }}>
              <b>Đơn hàng theo trạng thái</b>
            </Typography>{" "}
            {Array.isArray(baoCaoDonHangState) &&
              baoCaoDonHangState.length > 0 && (
                <Piechart data={baoCaoDonHangState} dataKey={"number"} />
              )}
          </Grid2>
          {/* <Grid2 size={4}>
            <Typography variant="body1" sx={{ textAlign: "left" }}>
              <b>Khách hàng tiềm năng chuyển đổi</b>
            </Typography>{" "}
            <Piechart data={baoGiaTheoTrangThai} dataKey={"number"} />
          </Grid2> */}
          <Grid2 size={12}>
            <Typography variant="h5" sx={{ textAlign: "left" }}>
              <b>Tổng quan hoạt động tương tác</b>
            </Typography>{" "}
          </Grid2>
          {hoatDongTuongTacData.map((item, index) => (
            <Grid2 item size={4} sm={6} md={3} key={index}>
              <StatisticCard {...item} />
            </Grid2>
          ))}
          <Grid2 size={8}>
            <Typography variant="h5" sx={{ textAlign: "left" }}>
              <b>Top 5 khách hàng tương tác gần đây</b>
            </Typography>{" "}
            <TableContainer
              component={Paper}
              sx={{
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                borderRadius: "12px",
              }}
            >
              <Table
                sx={{
                  "& .MuiTableCell-root": { padding: "12px 16px" },
                }}
              >
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: "#f5f7fa",
                      "& .MuiTableCell-head": {
                        fontWeight: 600,
                        color: "#1a1a1a",
                        fontSize: "0.9rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      },
                    }}
                  >
                    <TableCell sx={{}}>STT</TableCell>
                    <TableCell sx={{}}>Tên khách hàng</TableCell>
                    <TableCell align="center" sx={{}}>
                      Hoạt động
                    </TableCell>
                    <TableCell align="center" sx={{}}>
                      Thời gian
                    </TableCell>
                    <TableCell align="center" sx={{}}>
                      Trạng thái
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(baoCaoTop5KhTuongTacGanDay) &&
                    baoCaoTop5KhTuongTacGanDay.length > 0 &&
                    baoCaoTop5KhTuongTacGanDay.map((khachhang, index) => (
                      <TableRow
                        key={khachhang.id}
                        hover
                        sx={{
                          "&:hover": {
                            backgroundColor: "#f9fafb",
                            transition: "background-color 0.2s ease",
                          },
                          "& .MuiTableCell-body": {
                            fontSize: "0.95rem",
                            color: "#333",
                            borderBottom: "1px solid #e8ecef",
                          },
                        }}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1.5,
                            }}
                          >
                            <Typography
                              sx={{
                                fontWeight: 500,
                                fontSize: "1rem",
                                color: "#1a1a1a",
                              }}
                            >
                              {khachhang.tenKhachHang}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Typography>{khachhang.tenHoatDong}</Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography>
                            {" "}
                            <Moment format="DD/MM/YYYY ">
                              {new Date(khachhang.thoiGian)}
                            </Moment>
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography>{khachhang.trangThaiThucHien}</Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid2>
          <Grid2 size={4}>
            {Array.isArray(baoCaoCuocGoiTheoTrangThaiState) &&
              baoCaoCuocGoiTheoTrangThaiState.length > 0 && (
                <Piechart data={baoCaoCuocGoiTheoTrangThaiState} dataKey={"number"} />
              )}
          </Grid2>
        </Grid2>
      </Paper>
    </>
  );
};

export default index;
