import {
  Autocomplete,
  Avatar,
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

import PersonIcon from "@mui/icons-material/Person";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import CasesIcon from "@mui/icons-material/Cases";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import SouthIcon from "@mui/icons-material/South";
import NorthIcon from "@mui/icons-material/North";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import Piechart from "src/App/Components/Customchart/CustomPieChart/Piechart";

import {
  useGetBaoCaoSoSanhDoanhThuNhanVienQuery,
  useGetBaoCaoTheoBaoGiaQuery,
  useGetBaoCaoTheoDonHangQuery,
  useGetBaoCaoTop5NhanVienCoDoanhThuCaoNhatQuery,
  useGetBaoTongTheQuery,
} from "src/App/Api/BaoCao.api";
import NoImage from "src/App/Assets/image/no-image.png";
import CustomBarchartDouble from "src/App/Components/Customchart/CustomBarchartDouble/CustomBarchartDouble";

const userData = JSON.parse(localStorage.getItem("authorizationData"));
const index = () => {
  const [valueTuNgay, setValueTuNgay] = useState(dayjs().startOf("month"));
  const [valueDenNgay, setValueDenNgay] = useState(dayjs().endOf("month"));
  const [dataBaoCao, setDataBaoCao] = useState(null);
  const { data: dataBaoCaoTongThe } = useGetBaoTongTheQuery({
    tuNgay: valueTuNgay.format("YYYY-MM-DDT00:00:00"),
    denNgay: valueDenNgay.format("YYYY-MM-DDT23:59:59"),
  });
  const { data: dataTop5NhanVienCoDoanhThuCaoNhat } =
    useGetBaoCaoTop5NhanVienCoDoanhThuCaoNhatQuery({
      tuNgay: valueTuNgay.format("YYYY-MM-DDT00:00:00"),
      denNgay: valueDenNgay.format("YYYY-MM-DDT23:59:59"),
    });
  const { data: dataSoSanhDoanhThuNhaVien } =
    useGetBaoCaoSoSanhDoanhThuNhanVienQuery({
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
  const statistics = [
    {
      title: "Tổng số tiềm năng đã chuyển đổi",
      value: 2,
      description: "",
      icon: <PersonIcon fontSize="large" />,
      increase: <NorthIcon fontSize="large" />,
      decrease: <SouthIcon fontSize="large" />,
      color: "#00bcd4",
      currentMonthValue: dataBaoCao?.khachHangTiemNangHienTai,
      previousMonthValue: dataBaoCao?.khachHangTiemNangThangTruoc,
    },
    {
      title: "Tỷ lệ chuyển đổi tiềm năng thành khách hàng (%)",
      value: 2,
      description: "",
      icon: <ChangeCircleIcon fontSize="large" />,
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
      color: "#4caf50",
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
      title: "Tổng doanh thu",
      description: "",
      icon: <PersonIcon fontSize="large" />,
      increase: <NorthIcon fontSize="large" />,
      decrease: <SouthIcon fontSize="large" />,
      color: "#00bcd4",
      currentMonthValue: dataBaoCao?.tongDoanhThuHienTai,
      previousMonthValue: dataBaoCao?.tongDoanhThuThangTruoc,
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
        <Grid2 container spacing={2} sx={{ padding: 2 }}>
          <Grid2 size={12}>
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              <b>BÀN LÀM VIỆC - Nhân Viên {userData?.response?.ten}</b>
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
          {statistics.map((item, index) => (
            <Grid2 item size={3} sm={6} md={3} key={index}>
              <StatisticCard {...item} />
            </Grid2>
          ))}
        </Grid2>
        <Grid2 container spacing={2}>
          <Grid2 size={6}>
            <Paper sx={{ padding: 2 }}>
              <Typography variant="body1" sx={{ textAlign: "center" }}>
                <b> Top 5 Nhân Viên Có Doanh Thu Cao Nhất</b>
              </Typography>
              <TableContainer
                component={Paper}
                sx={{
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  borderRadius: "12px",
                  height: 400,
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
                        backgroundColor: "background.primary",
                        "& .MuiTableCell-head": {
                          fontWeight: 600,
                          color: "#1a1a1a",
                          fontSize: "0.9rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        },
                      }}
                    >
                      <TableCell sx={{ width: "10%" }}>STT</TableCell>
                      <TableCell>Nhân viên</TableCell>
                      <TableCell align="center">Doanh thu</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array.isArray(dataTop5NhanVienCoDoanhThuCaoNhat) &&
                      dataTop5NhanVienCoDoanhThuCaoNhat.length > 0 &&
                      dataTop5NhanVienCoDoanhThuCaoNhat.map((nv, index) => (
                        <TableRow
                          key={nv.tenNhanVien}
                          hover
                          sx={{
                            "&:hover": {
                              backgroundColor: "background.primary",
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
                              {nv?.hinhAnh == null ? (
                                <>
                                  <Avatar
                                    src={NoImage}
                                    sx={{
                                      width: 40,
                                      height: 40,
                                      border: "2px solid #e0e0e0",
                                      bgcolor: "#f0f0f0",
                                    }}
                                  />
                                </>
                              ) : (
                                <>
                                  <Avatar
                                    src={
                                      "data:image/jpeg;base64," + nv?.hinhAnh
                                    }
                                    sx={{
                                      width: 40,
                                      height: 40,
                                      border: "2px solid #e0e0e0",
                                      bgcolor: "#f0f0f0",
                                    }}
                                  />
                                </>
                              )}
                              <Typography
                                sx={{
                                  fontWeight: 500,
                                  fontSize: "1rem",
                                  color: "background.primary",
                                }}
                              >
                                {nv.tenNhanVien}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell align="right">
                            <Typography
                              sx={{
                                fontWeight: 500,
                                color: "background.primary",
                              }}
                            >
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(nv.doanhThu)}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid2>
          <Grid2 size={6}>
            <Typography variant="body1" sx={{ textAlign: "center" }}>
              <b>So sánh doanh số theo mục tiêu</b>
            </Typography>{" "}
            {Array.isArray(dataSoSanhDoanhThuNhaVien) &&
              dataSoSanhDoanhThuNhaVien.length > 0 && (
                <CustomBarchartDouble
                  data={dataSoSanhDoanhThuNhaVien}
                  dataKeyName={"name"}
                  dataKey1={"mucTieu"}
                  dataKey2={"doanhSoThucTe"}
                  height={440}
                />
              )}
          </Grid2>
          <Grid2 size={6}>
            <Paper sx={{ height: 400 }}>
              <Typography variant="body1" sx={{ textAlign: "center" }}>
                <b>Báo giá theo trạng thái</b>
              </Typography>{" "}
              {Array.isArray(dataBaoGia) && dataBaoGia.length > 0 && (
                <Piechart
                  data={dataBaoGia}
                  dataKey={"number"}
                  fill={"#03a9f4"}
                  height={300}
                />
              )}
            </Paper>
          </Grid2>
          <Grid2 size={6}>
            <Paper sx={{ height: 400 }}>
              <Typography variant="body1" sx={{ textAlign: "center" }}>
                <b>Đơn hàng theo trạng thái</b>
              </Typography>{" "}
              {Array.isArray(dataDonHang) && dataDonHang.length > 0 && (
                <Piechart
                  data={dataDonHang}
                  dataKey={"number"}
                  fill={"#03a9f4"}
                  height={300}
                />
              )}
            </Paper>
          </Grid2>
        </Grid2>
      </Paper>
    </>
  );
};

export default index;
