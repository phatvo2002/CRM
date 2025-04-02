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
const index = () => {
  const [valueTuNgay, setValueTuNgay] = useState(dayjs().startOf("month"));
  const [valueDenNgay, setValueDenNgay] = useState(dayjs().endOf("month"));
  const [open, setOpen] = useState(false);

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
              // onClick={handleOpenModalThemDonHang}
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
            <Table>
              <TableHead>
                <TableCell></TableCell>
                <TableCell>Tên KPI</TableCell>
                <TableCell align="center">Tên phòng ban</TableCell>
                <TableCell align="center">Ngày bắt đầu</TableCell>
                <TableCell align="center">Ngày kết thúc</TableCell>
                <TableCell align="center">SL cuộc gọi / Thực tế</TableCell>
                <TableCell align="center">SL lịch hẹn / Thực tế</TableCell>
                <TableCell align="center">SL Email Báo giá/ thực tế</TableCell>
                <TableCell align="center">
                  SL Tiềm năng chuyển đổi / Thực tế
                </TableCell>
                <TableCell align="center">
                  Doanh số / Doanh số thực tế
                </TableCell>
                <TableCell align="center">Tổng tỉ lệ phần trăm</TableCell>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <IconButton size="small" onClick={() => setOpen(!open)}>
                      {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                  </TableCell>
                  <TableCell>KPI phòng kinh doanh 1</TableCell>
                  <TableCell align="center">Phòng kinh doanh 1</TableCell>
                  <TableCell align="center">02/04/2025</TableCell>
                  <TableCell align="center">10/04/2025</TableCell>
                  <TableCell align="center">50 / 0</TableCell>
                  <TableCell align="center">50 / 0</TableCell>
                  <TableCell align="center">50 / 0</TableCell>
                  <TableCell align="center">50 / 0</TableCell>
                  <TableCell align="center">50 / 0</TableCell>
                  <TableCell align="center">0</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    colSpan={12}
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                  >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                      <Box margin={1}>
                        <Typography variant="h6">Thông tin KPI chi tiết</Typography>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                              <TableCell>Nhân viên</TableCell>
                              <TableCell>Ngày bắt đầu</TableCell>
                              <TableCell align="center">Ngày kết thúc</TableCell>
                              <TableCell align="center">
                                Sl Cuộc Gọi / Thực Tế
                              </TableCell>
                              <TableCell align="center">
                                Sl Lịch Hẹn / Thực Tế
                              </TableCell>
                              <TableCell align="center">
                                Sl Email Tương tác / Thực tế
                              </TableCell>
                              <TableCell align="center">
                                Sl Báo giá / Thực tế
                              </TableCell>
                              <TableCell align="center">
                                Sl Tiềm Năng Đã Chuyển Đổi / Thực tế
                              </TableCell>
                              <TableCell align="center">
                                Doanh số / Thực tế
                              </TableCell>
                              <TableCell align="center">
                                Tổng phần trăm
                              </TableCell>

                            </TableRow>
                          </TableHead>
                          <TableBody>
                            
                          </TableBody>
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
    </>
  );
};

export default index;
