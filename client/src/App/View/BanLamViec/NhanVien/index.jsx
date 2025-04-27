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
import PersonIcon from "@mui/icons-material/Person";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import CasesIcon from "@mui/icons-material/Cases";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { useState } from "react";
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
import { coHoiData, cuocGoiTheoTrangThai } from "src/App/Until/DataDefault";
import { baoGiaTheoTrangThai } from "src/App/Until/DataDefault";
import Piechart from "src/App/Components/Customchart/CustomPieChart/Piechart";
import { khachHangTuongTacGanDay } from "src/App/Until/DataDefault";
const hieuSuatBanHangData = [
  {
    title: "Tổng số tiềm năng đã chuyển đổi",
    value: 2,
    description: "",
    icon: <Person2Icon fontSize="large" />,
    increase: <NorthIcon fontSize="large" />,
    decrease: <SouthIcon fontSize="large" />,
    color: "#b28900",
    currentMonthValue: 15,
    previousMonthValue: 10,
  },
  {
    title: "Tỷ lệ chuyển đổi tiềm năng thành khách hàng (%)",
    value: 2,
    description: "",
    icon: <PersonPinIcon fontSize="large" />,
    increase: <NorthIcon fontSize="large" />,
    decrease: <SouthIcon fontSize="large" />,
    color: "#f44336",
    currentMonthValue: 50,
    previousMonthValue: 30,
  },
  {
    title: "Tổng số cơ hội mới",
    value: 0,
    description: "",
    icon: <CasesIcon fontSize="large" />,
    increase: <NorthIcon fontSize="large" />,
    decrease: <SouthIcon fontSize="large" />,
    color: "#ff7043",
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
    title: "Doanh thu tháng này",
    description: "",
    icon: <PaidIcon fontSize="large" />,
    increase: <NorthIcon fontSize="large" />,
    decrease: <SouthIcon fontSize="large" />,
    color: "#84c887",
    currentMonthValue: 100000000,
    previousMonthValue: 50000000,
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
    currentMonthValue: 15,
    previousMonthValue: 10,
  },
  {
    title: "Cuộc gọi đã thực hiện",
    value: 0,
    description: "",
    icon: <PhoneForwardedIcon fontSize="large" />,
    increase: <NorthIcon fontSize="large" />,
    decrease: <SouthIcon fontSize="large" />,
    color: "#4caf50",
    currentMonthValue: 15,
    previousMonthValue: 10,
  },
  {
    title: "Lịch hẹn đã thực hiện",
    value: 0,
    description: "",
    icon: <CalendarMonthIcon fontSize="large" />,
    increase: <NorthIcon fontSize="large" />,
    decrease: <SouthIcon fontSize="large" />,
    color: "#ffea00",
    currentMonthValue: 15,
    previousMonthValue: 10,
  },
];
const index = () => {
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
              <Barchart data={coHoiData} dataKey={"soLuong"} height={500} />
            </Paper>
          </Grid2>
          <Grid2 size={12}>
            <Typography variant="h5" sx={{ textAlign: "left" }}>
              <b>Kết quả bán hàng </b>
            </Typography>{" "}
          </Grid2>
          <Grid2 size={4}>
            <Typography variant="body1" sx={{ textAlign: "left" }}>
              <b>Báo giá theo trạng thái</b>
            </Typography>{" "}
            <Piechart data={baoGiaTheoTrangThai} dataKey={"number"} />
          </Grid2>
          <Grid2 size={4}>
            <Typography variant="body1" sx={{ textAlign: "left" }}>
              <b>Đơn hàng theo trạng thái</b>
            </Typography>{" "}
            <Piechart data={baoGiaTheoTrangThai} dataKey={"number"} />
          </Grid2>
          <Grid2 size={4}>
            <Typography variant="body1" sx={{ textAlign: "left" }}>
              <b>Khách hàng tiềm năng chuyển đổi</b>
            </Typography>{" "}
            <Piechart data={baoGiaTheoTrangThai} dataKey={"number"} />
          </Grid2>
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
                    <TableCell sx={{  }}>STT</TableCell>
                    <TableCell sx={{  }}>Tên khách hàng</TableCell>
                    <TableCell align="right" sx={{  }}>
                      Hoạt động
                    </TableCell>
                    <TableCell align="right" sx={{  }}>
                      Thời gian
                    </TableCell>
                    <TableCell align="right" sx={{  }}>
                      Trạng thái
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {khachHangTuongTacGanDay.map((khachhang, index) => (
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
                            {khachhang.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Typography >
                          {khachhang.active}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography >
                          {khachhang.time}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography >
                          {khachhang.status}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid2>
          <Grid2 size={4}>
              <Piechart data={cuocGoiTheoTrangThai} dataKey={"number"}/>
          </Grid2>
        </Grid2>
      </Paper>
    </>
  );
};

export default index;
