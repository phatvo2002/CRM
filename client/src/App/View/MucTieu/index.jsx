import { Button, Grid2, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import SearchIcon from "@mui/icons-material/Search";
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
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import ModalThemMoi from "./modal/ModalThemMoi";
import { useGetAllMucTieuDoanhSoQuery } from "src/App/Api/MucTieuDoanhSo.Api";
const index = () => {
  const [valueTuNgay, setValueTuNgay] = useState(dayjs().startOf("month"));
  const [valueDenNgay, setValueDenNgay] = useState(dayjs().endOf("month"));

  const { data: dataMucTieu, refetch: refetch } = useGetAllMucTieuDoanhSoQuery({
    tuNgay: valueTuNgay.format("YYYY-MM-DD HH:mm:ss.SSS"),
    denNgay: valueDenNgay.format("YYYY-MM-DD HH:mm:ss.SSS"),
  });

  const [open, setOpen] = useState(false);
  const [modalThemMoiMucTieu, setModalThemMoiMucTieu] = useState();

  const handleOpenModalThemMoiMucTieu = () => {
    setModalThemMoiMucTieu(true);
  };
  const handleCloseModalThemMoi = () => {
    setModalThemMoiMucTieu(false);
  };

  const getSampleData = () => [
    {
      name: "Frozen yoghurt",
      calories: 159,
      fat: 6.0,
      carbs: 24,
      protein: 4.0,
      price: 3.99,
      history: [
        { date: "2020-01-05", customerId: "11091700", amount: 3 },
        { date: "2020-01-02", customerId: "Anonymous", amount: 1 },
      ],
    },
    {
      name: "Ice cream sandwich",
      calories: 237,
      fat: 9.0,
      carbs: 37,
      protein: 4.3,
      price: 4.99,
      history: [{ date: "2020-01-10", customerId: "12345678", amount: 2 }],
    },
  ];
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
          <Paper sx={{ width: "100%", overflow: "auto" }}>
            <Table
              sx={{
                minWidth: 650,
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell sx={{ width: "5%" }} />
                  <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
                    Tên KPI
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", color: "#333" }}
                  >
                    Tên phòng ban
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", color: "#333" }}
                  >
                    Ngày bắt đầu
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", color: "#333" }}
                  >
                    Ngày kết thúc
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", color: "#333" }}
                  >
                    SL cuộc gọi / Thực tế
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", color: "#333" }}
                  >
                    SL lịch hẹn / Thực tế
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", color: "#333" }}
                  >
                    SL Email báo giá / Thực tế
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", color: "#333" }}
                  >
                    SL tiềm năng chuyển đổi / Thực tế
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", color: "#333" }}
                  >
                    Doanh số / Thực tế
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", color: "#333" }}
                  >
                    Tổng tỷ lệ (%)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow sx={{ "&:hover": { backgroundColor: "#fafafa" } }}>
                  <TableCell>
                    <IconButton size="small" onClick={() => setOpen(!open)}>
                      {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                  </TableCell>
                  <TableCell sx={{ color: "#555" }}>
                    KPI phòng kinh doanh 1
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#555" }}>
                    Phòng kinh doanh 1
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#555" }}>
                    02/04/2025
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#555" }}>
                    10/04/2025
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#555" }}>
                    50 / 0
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#555" }}>
                    50 / 0
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#555" }}>
                    50 / 0
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#555" }}>
                    50 / 0
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#555" }}>
                    50 / 0
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "#555", fontWeight: "bold" }}
                  >
                    0%
                  </TableCell>
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
                            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
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
                          <TableBody>{/* Dữ liệu chi tiết KPI */}</TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid2>
      </Grid2>

      {/* Modal thêm mới */}
      <ModalThemMoi
        showModal={modalThemMoiMucTieu}
        closeModal={handleCloseModalThemMoi}
        refetch={refetch}
      />
    </>
  );
};

export default index;
