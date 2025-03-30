import { Button, Grid2, Stack, Typography } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import SearchIcon from '@mui/icons-material/Search';
const index = () => {
  const [valueTuNgay, setValueTuNgay] = React.useState(
    dayjs().startOf("month")
  );
  const [valueDenNgay, setValueDenNgay] = React.useState(
    dayjs().endOf("month")
  );
  
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
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SearchIcon/>}
                  // onClick={handleSearch}
                  sx={{ height: "55px" }}
                >
                  Tìm kiếm
                </Button>
              </Stack>
            </DemoContainer>
          </LocalizationProvider>
        </Grid2>
      </Grid2>
    </>
  );
};

export default index;
