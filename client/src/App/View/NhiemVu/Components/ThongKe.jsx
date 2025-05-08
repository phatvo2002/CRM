import {
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
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SouthIcon from "@mui/icons-material/South";
import NorthIcon from "@mui/icons-material/North";

import AddTaskIcon from "@mui/icons-material/AddTask";
import dayjs from "dayjs";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import Piechart from "src/App/Components/Customchart/CustomPieChart/Piechart";
import {
  useGetBaoCaoNhiemVuQuery,
  useGetBaoCaoNhiemVuTheoTrangThaiQuery,
  useGetBaoCaoTop3NhanVienHoanThanhNhiemVuQuery,
} from "src/App/Api/BaoCao.api";
import NoImage from "src/App/Assets/image/no-image.png";


const ThongKe = () => {
  const [valueTuNgay, setValueTuNgay] = useState(dayjs().startOf("month"));
  const [valueDenNgay, setValueDenNgay] = useState(dayjs().endOf("month"));
  const [baoCaoTongNhiemVu, setBaoCaoTongNhiemVu] = useState(null);
  const { data: dataTongNhiemVu } = useGetBaoCaoNhiemVuQuery({
    tuNgay: valueTuNgay.format("YYYY-MM-DDT00:00:00"),
    denNgay: valueDenNgay.format("YYYY-MM-DDT23:59:59"),
  });

  const { data: dataTop3NhanVienHoanThanhNhiemVu } =
    useGetBaoCaoTop3NhanVienHoanThanhNhiemVuQuery({
      tuNgay: valueTuNgay.format("YYYY-MM-DDT00:00:00"),
      denNgay: valueDenNgay.format("YYYY-MM-DDT23:59:59"),
    });
  const {data : dataNhiemVuTheoTrangThai} =
  useGetBaoCaoNhiemVuTheoTrangThaiQuery({
    tuNgay: valueTuNgay.format("YYYY-MM-DDT00:00:00"),
    denNgay: valueDenNgay.format("YYYY-MM-DDT23:59:59"),
  })
  const percentChange =
    baoCaoTongNhiemVu?.soNhiemVuThangTruoc === 0
      ? baoCaoTongNhiemVu?.soNhiemVuThangHienTai > 0
        ? 100
        : 0
      : Math.round(
          ((baoCaoTongNhiemVu?.soNhiemVuThangHienTai -
            baoCaoTongNhiemVu?.soNhiemVuThangTruoc) /
            baoCaoTongNhiemVu?.soNhiemVuThangTruoc) *
            100
        );
  const isIncrease = percentChange >= 0;
  const ChangeIcon = isIncrease ? NorthIcon : SouthIcon;

  useEffect(() => {
    if (dataTongNhiemVu) setBaoCaoTongNhiemVu(dataTongNhiemVu);
    else setBaoCaoTongNhiemVu([]);
  }, [dataTongNhiemVu]);
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
                {baoCaoTongNhiemVu?.soNhiemVuThangHienTai}
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
                  so với tháng trước ({baoCaoTongNhiemVu?.soNhiemVuThangTruoc})
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
                    <TableCell align="center"  >Nhân viên</TableCell>
                    <TableCell align="center" >
                      Số nhiệm vụ đã hoàn thành
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(dataTop3NhanVienHoanThanhNhiemVu) &&
                    dataTop3NhanVienHoanThanhNhiemVu.length > 0 &&
                    dataTop3NhanVienHoanThanhNhiemVu.map((nv, index) => (
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
                                  src={"data:image/jpeg;base64," + nv?.hinhAnh}
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
                                color: "#1a1a1a",
                              }}
                            >
                              {nv.tenNhanVien}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Typography
                            sx={{ fontWeight: 500, color: "#2e7d32" }}
                          >
                            {nv.tongSoNhiemVuDaHoanThanh}
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
          {Array.isArray(dataNhiemVuTheoTrangThai) &&
           dataNhiemVuTheoTrangThai.length >0 &&
           (<Piechart data={dataNhiemVuTheoTrangThai} dataKey={"number"} />)}
        </Grid2>
      </Grid2>
    </>
  );
};

export default ThongKe;
