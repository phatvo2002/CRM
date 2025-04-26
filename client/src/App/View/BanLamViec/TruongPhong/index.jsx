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
import { useState } from "react";
import dayjs from "dayjs";
import { Grid } from "@mui/joy";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import Piechart from "src/App/Components/Customchart/CustomPieChart/Piechart";
import LineCh from "src/App/Components/Customchart/CustomLine/LineCh";
import { topNhanVien } from "src/App/Until/DataDefault";
import { coHoiData } from "src/App/Until/DataDefault";
import { doanhSoTheoHangHoaData } from "src/App/Until/DataDefault";
import { donHangTheoTrangThai } from "src/App/Until/DataDefault";
const index = () => {
  const statistics = [
    {
      title: "Tổng số khách tiềm năng mới",
      value: 2,
      description: "",
      icon: <PersonIcon fontSize="large" />,
      increase: <NorthIcon fontSize="large" />,
      decrease: <SouthIcon fontSize="large" />,
      color: "#00bcd4",
      currentMonthValue: 15,
      previousMonthValue: 10,
    },
    {
      title: "Tổng số tiềm năng đã chuyển đổi",
      value: 2,
      description: "",
      icon: <ChangeCircleIcon fontSize="large" />,
      increase: <NorthIcon fontSize="large" />,
      decrease: <SouthIcon fontSize="large" />,
      color: "#f44336",
      currentMonthValue: 15,
      previousMonthValue: 10,
    },
    {
      title: "Tổng số cơ hội mới",
      value: 0,
      description: "",
      icon: <CasesIcon fontSize="large" />,
      increase: <NorthIcon fontSize="large" />,
      decrease: <SouthIcon fontSize="large" />,
      color: "#4caf50",
      currentMonthValue: 15,
      previousMonthValue: 10,
    },
    {
      title: "Tổng số báo giá mới",
      value: 0,
      description: "",
      icon: <RequestQuoteIcon fontSize="large" />,
      increase: <NorthIcon fontSize="large" />,
      decrease: <SouthIcon fontSize="large" />,
      color: "#b22a00",
      currentMonthValue: 15,
      previousMonthValue: 10,
    },
    {
      title: "Tổng số đơn hàng",
      value: 0,
      description: "",
      icon: <LocalMallIcon fontSize="large" />,
      increase: <NorthIcon fontSize="large" />,
      decrease: <SouthIcon fontSize="large" />,
      color: "#b26500",
      currentMonthValue: 15,
      previousMonthValue: 10,
    },
    {
      title: "Tổng doanh thu",
      description: "",
      icon: <PersonIcon fontSize="large" />,
      increase: <NorthIcon fontSize="large" />,
      decrease: <SouthIcon fontSize="large" />,
      color: "#00bcd4",
      currentMonthValue: 100000000,
      previousMonthValue: 50000000,
    },
  ];
  const [valueTuNgay, setValueTuNgay] = useState(dayjs().startOf("month"));
  const [valueDenNgay, setValueDenNgay] = useState(dayjs().endOf("month"));

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
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              <b>BÀN LÀM VIỆC - TRƯỞNG PHÒNG</b>
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
              <Typography variant="h5" sx={{ textAlign: "center" }}>
                <b> Top 5 Nhân Viên Có Doanh Thu Cao Nhất</b>
              </Typography>
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
                      <TableCell sx={{ width: "10%" }}>STT</TableCell>
                      <TableCell >Nhân viên</TableCell>
                      <TableCell align="center" >
                        Doanh thu
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topNhanVien.map((nv, index) => (
                      <TableRow
                        key={nv.id}
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
                                color: "#1a1a1a",
                              }}
                            >
                              {nv.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Typography
                            sx={{ fontWeight: 500, color: "#2e7d32" }}
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
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              <b>Doanh số theo hàng hóa</b>
            </Typography>{" "}
            <LineCh
              data={doanhSoTheoHangHoaData}
              dataKey1={"name"}
              dataKey2={"cost"}
              height={500}
            />
          </Grid2>
          <Grid2 size={6}>
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              <b>Cơ hội theo giai đoạn</b>
            </Typography>{" "}
            <Piechart
              data={coHoiData}
              dataKey={"soLuong"}
              fill={"#03a9f4"}
              height={500}
            />
          </Grid2>
          <Grid2 size={6}>
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              <b>Đơn hàng theo trạng thái</b>
            </Typography>{" "}
            <Piechart
              data={donHangTheoTrangThai}
              dataKey={"number"}
              fill={"#03a9f4"}
              height={500}
            />
          </Grid2>
        </Grid2>
      </Paper>
    </>
  );
};

export default index;
