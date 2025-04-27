import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import PersonIcon from "@mui/icons-material/Person";
import PaidIcon from "@mui/icons-material/Paid";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SouthIcon from "@mui/icons-material/South";
import NorthIcon from "@mui/icons-material/North";
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
import { Grid } from "@mui/joy";
import { useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers";
import LineCh from "src/App/Components/Customchart/CustomLine/LineCh";
import Barchart from "src/App/Components/Customchart/CustomBarchart/Barchart";
import {
  doanhThuTheoNamData,
  top5NhanVienSuatSac,
} from "src/App/Until/DataDefault";
import { dataDoanhThuPhongBan } from "src/App/Until/DataDefault";
import { dataTheoMucTieu } from "src/App/Until/DataDefault";
import { dataCoHoiTheoGiaiDoan } from "src/App/Until/DataDefault";
import { topNhanVien } from "src/App/Until/DataDefault";
import { hieuSuatNhanVien } from "src/App/Until/DataDefault";
import { phanBoNguonKhachHang } from "src/App/Until/DataDefault";
import CustomBarchartDouble from "src/App/Components/Customchart/CustomBarchartDouble/CustomBarchartDouble";
import FunnelChart from "src/App/Components/Customchart/CustomFunnelChart/FunnelChart";
import StackedBarChart from "src/App/Components/Customchart/CustomStackedBarChart/StackedBarChart";
import Piechart from "src/App/Components/Customchart/CustomPieChart/Piechart";
const BanLamViec = () => {
  const [valueTuNgay, setValueTuNgay] = useState(dayjs().startOf("month"));
  const [valueDenNgay, setValueDenNgay] = useState(dayjs().endOf("month"));
  const [selectedYear, setSelectedYear] = useState(dayjs());

  const doanhThuData = [
    {
      title: "Doanh thu hiện tại",
      value: 0,
      description: "",
      icon: <PaidIcon fontSize="large" />,
      increase: <NorthIcon fontSize="large" />,
      decrease: <SouthIcon fontSize="large" />,
      color: "#ffea00",
      currentMonthValue: 15,
      previousMonthValue: 10,
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

    return (
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
          borderLeft: `8px solid ${color}`,
          backgroundColor: "background.primary",
          height: "320px",
        }}
      >
        <Box sx={{ mr: 2, color }}>{icon}</Box>
        <Box>
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            color={color}
            sx={{ height: "40px", overflow: "hidden", fontSize: "2rem" }}
          >
            {title}
          </Typography>

          <Typography variant="h5" fontWeight="bold">
            {currentMonthValue.toLocaleString("vi-VN")}
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
              so với tháng trước ({previousMonthValue.toLocaleString("vi-VN")})
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  alignItems={{ xs: "stretch", sm: "center" }}
                >
                  <DatePicker
                    label="Từ ngày"
                    value={valueTuNgay}
                    onChange={(newValue) => setValueTuNgay(newValue)}
                  />
                  <DatePicker
                    label="Đến ngày"
                    value={valueDenNgay}
                    onChange={(newValue) => setValueDenNgay(newValue)}
                  />
                  <DatePicker
                    views={["year"]}
                    label="Chọn năm"
                    value={selectedYear}
                    onChange={(newValue) => setSelectedYear(newValue)}
                  />
                </Stack>
              </DemoContainer>
            </LocalizationProvider>
          </Grid2>
          <Grid2 size={12}>
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              <b>Tông quan doanh thu</b>
            </Typography>
          </Grid2>
          {doanhThuData.map((item, index) => (
            <Grid2 item size={4} sm={6} md={3} key={index}>
              <StatisticCard {...item} />
            </Grid2>
          ))}
          <Grid2 size={8}>
            <Paper>
              <Typography variant="body1" sx={{ textAlign: "left" }}>
                <b>Tổng quan doanh thu theo năm</b>
              </Typography>
              <LineCh
                data={doanhThuTheoNamData}
                height={300}
                dataKey1={"thang"}
                dataKey2={"doanhThu"}
              />
            </Paper>
          </Grid2>
          <Grid2 size={6}>
            <Paper>
              <Typography variant="h6" sx={{ textAlign: "left" }}>
                <b>Tổng quan doanh thu theo phòng ban</b>
              </Typography>
              <Barchart
                data={dataDoanhThuPhongBan}
                dataKey={"doanhThu"}
                height={440}
              />
            </Paper>
          </Grid2>
          <Grid2 size={6}>
            <Paper>
              <Typography variant="h5" sx={{ textAlign: "center" }}>
                <b>So sánh doanh số theo mục tiêu</b>
              </Typography>
              <CustomBarchartDouble
                data={dataTheoMucTieu}
                dataKeyName={"thang"}
                dataKey1={"mucTieu"}
                dataKey2={"mucTieuThucTe"}
                height={440}
              />
            </Paper>
          </Grid2>
        
          
          <Grid2 size={12}>
            <Typography variant="body1" sx={{ textAlign: "center" }}>
              <b>Tổng quan khách hàng</b>
            </Typography>
          </Grid2>
          <Grid2 size={6}>
            <Paper>
              <Typography variant="body1" sx={{ textAlign: "center" }}>
                <b>Cơ hội theo giai đoạn</b>
              </Typography>
              <FunnelChart
                data={dataCoHoiTheoGiaiDoan}
                dataKey={"soLuong"}
                nameKey={"tenCoHoi"}
                fill={"mauSac"}
              />
            </Paper>
          </Grid2>
          <Grid2 size={6}>
              <Typography variant="body1" sx={{ textAlign: "center" }}>
                <b>Nguồn gốc khách hàng</b>
              </Typography>
              <Piechart data={phanBoNguonKhachHang} dataKey={"value"} height={400} />
          </Grid2>
          <Grid2 size={12}>
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              <b>Hiệu suất nhân viên</b>
            </Typography>
          </Grid2>
          <Grid2 size={6}>
            <Typography variant="body1" sx={{ textAlign: "center" }}>
              <b>Top 5 nhân viên suất sắc nhất</b>
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
                    <TableCell align="center">Cuộc gọi hoàn thành</TableCell>
                    <TableCell align="center">Lịch hẹn hoàn thành</TableCell>
                    <TableCell align="center">Nhiệm vụ hoàn thành</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {top5NhanVienSuatSac.map((nv, index) => (
                    <TableRow
                      key={nv.id}
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
                          <Avatar
                            src={nv.avatar}
                            sx={{
                              width: 40,
                              height: 40,
                              border: "2px solid #e0e0e0",
                              bgcolor: "#f0f0f0",
                            }}
                          />
                          <Typography
                            sx={{
                              fontWeight: 500,
                              fontSize: "1rem",
                              color: "background.primary",
                            }}
                          >
                            {nv.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">{nv.cuocgoi}</TableCell>
                      <TableCell align="right">{nv.lichHen}</TableCell>
                      <TableCell align="right">{nv.NhiemVuHoanThanh}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid2>
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
                    {topNhanVien.map((nv, index) => (
                      <TableRow
                        key={nv.id}
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
                            <Avatar
                              src={nv.avatar}
                              sx={{
                                width: 40,
                                height: 40,
                                border: "2px solid #e0e0e0",
                                bgcolor: "#f0f0f0",
                              }}
                            />
                            <Typography
                              sx={{
                                fontWeight: 500,
                                fontSize: "1rem",
                                color: "background.primary",
                              }}
                            >
                              {nv.name}
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
                <b>Hoạt động nhân viên</b>
              </Typography>
            <StackedBarChart
              data={hieuSuatNhanVien}
              dataKeyName={"tenNhanVien"}
              dataKey1={"cuocGoi"}
              dataKey2={"lichHen"}
              dataKey3={"nhiemVu"}
              height={400}
            />
          </Grid2>
        </Grid2>
      </Paper>
    </>
  );
};

export default BanLamViec;
