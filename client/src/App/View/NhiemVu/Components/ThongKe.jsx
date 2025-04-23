import { Avatar, Box, Grid2, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { useState } from "react";
import SouthIcon from "@mui/icons-material/South";
import NorthIcon from "@mui/icons-material/North";
import PersonIcon from "@mui/icons-material/Person";
import AddTaskIcon from "@mui/icons-material/AddTask";
import dayjs from "dayjs";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import Piechart from "src/App/Components/Customchart/CustomPieChart/Piechart";

const topNhanVien = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    doanhThu: 13,
    avatar: "https://i.pravatar.cc/40?img=1",
  },
  {
    id: 2,
    name: "Trần Thị B",
    doanhThu: 20,
    avatar: "https://i.pravatar.cc/40?img=2",
  },
  {
    id: 3,
    name: "Lê Văn C",
    doanhThu: 10,
    avatar: "https://i.pravatar.cc/40?img=3",
  },

];

const trangThaiNhiemVu = [
    {
        name :"Chưa thực hiện",
        value :10
    },
    {
        name :"Đang thực hiện",
        value :10
    },
    {
        name :"Hoàn thành",
        value :30
    },
    {
        name :"Trễ hạn",
        value :5
    },
]
const ThongKe = () => {
  const [valueTuNgay, setValueTuNgay] = useState(dayjs().startOf("month"));
  const [valueDenNgay, setValueDenNgay] = useState(dayjs().endOf("month"));

  const data = {
    title: "Tổng số khách tiềm năng mới",
    value: 2,
    description: "",
    icon: <PersonIcon fontSize="large" />,
    increase: <NorthIcon fontSize="large" />,
    decrease: <SouthIcon fontSize="large" />,
    color: "#00bcd4",
    currentMonthValue: 15,
    previousMonthValue: 10,
  };
  const percentChange =
    data.previousMonthValue === 0
      ? data.currentMonthValue > 0
        ? 100
        : 0
      : Math.round(
          ((data.currentMonthValue - data.previousMonthValue) /
            data.previousMonthValue) *
            100
        );
  const isIncrease = percentChange >= 0;
  const ChangeIcon = isIncrease ? NorthIcon : SouthIcon;
  return (
    <>
      <Grid2 container spacing={2}>
        <Grid2 size={12} marginLeft={"30%"}>
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
        <Grid2 size={4}></Grid2>
        <Grid2 size={4}>
          {" "}
          <Paper
            elevation={3}
            sx={{
              display: "flex",
              alignItems: "center",
              p: 2,
              borderLeft: `8px solid red`,
              backgroundColor: "background.primary",
              height: "150px",
            }}
          >
            <Box sx={{ mr: 2 }}>{<AddTaskIcon fontSize="medium" />}</Box>
            <Box>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                // color={color}
                sx={{ height: "40px", overflow: "hidden" }}
              >
                Tổng số nhiệm vụ được giao
              </Typography>

              <Typography variant="h5" fontWeight="bold">
                {15}
              </Typography>

              <Stack direction="row" alignItems="center" spacing={1}>
                <ChangeIcon
                  fontSize="small"
                  sx={{ color: isIncrease ? "green" : "red" }}
                />
                <Typography
                  variant="caption"
                  color={isIncrease ? "green" : "red"}
                >
                  {isIncrease ? "+" : ""}
                  {percentChange}%
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  so với tháng trước (
                  {data.previousMonthValue.toLocaleString("vi-VN")})
                </Typography>
              </Stack>

              {/* <Typography variant="body2">{description}</Typography> */}
            </Box>
          </Paper>
        </Grid2>
        <Grid2 size={4}></Grid2>
        <Grid2 size={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              <b> Top 3 nhân viên hoàn thành nhiệm vụ nhiều nhất</b>
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
                  minWidth: 650,
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
                    <TableCell sx={{ width: "60%" }}>Nhân viên</TableCell>
                    <TableCell align="right" sx={{ width: "30%" }}>
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
                        <Typography sx={{ fontWeight: 500, color: "#2e7d32" }}>
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
            <Piechart data={trangThaiNhiemVu} dataKey={"value"}/>
        </Grid2>
      </Grid2>
    </>
  );
};

export default ThongKe;
