import { Grid2, IconButton, TextField, Typography } from "@mui/material";
import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker, DateTimeField } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useGetHangHoaQuanTamByBaoGiaIdQuery } from "src/App/Api/HangHoaQuanTam";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGetAllHangHoaQuery } from "src/App/Api/HangHoa";
const ThongTinChiTietTab = ({ baoGiaData }) => {
   const { data: hangHoas } = useGetAllHangHoaQuery(undefined);
    const { data: rows } = useGetHangHoaQuanTamByBaoGiaIdQuery(baoGiaData?.id);
  const columns = [
    {
      field: "maHangHoaId",
      headerName: "Hàng Hóa",
      width: 350,
      editable: true,
      type: "singleSelect",
      valueOptions:
        hangHoas?.map((item) => ({ value: item.id, label: item.tenHangHoa })) ||
        [],
      renderCell: (params) => {
        const selectedItem = hangHoas?.find((item) => item.id === params.value);
        return selectedItem ? selectedItem.tenHangHoa : "";
      },
    },
    {
      field: "soLuong",
      headerName: "Số Lượng",
      width: 300,
      editable: true,
    },
    {
      field: "donGia",
      headerName: "Đơn giá",
      width: 200,
      editable: false,
      renderCell: (params) => {
        const selectedItem = hangHoas?.find(
          (item) => item.id === params.row.maHangHoaId
        );
        return selectedItem ? selectedItem.donGia.toLocaleString("vi-VN") : 0;
      },
    },
    {
      field: "thueSuat",
      headerName: "Thuế suất (%)",
      width: 150,
      editable: true,
    },

    {
      field: "tienThue",
      headerName: "Tiền thuế",
      width: 200,
      editable: false,
      renderCell: (params) =>
        params.value ? params.value.toLocaleString("vi-VN") : 0,
    },
    {
      field: "thanhTien",
      headerName: "Thành Tiền",
      width: 200,
      editable: false,
      renderCell: (params) =>
        params.value ? params.value.toLocaleString("vi-VN") : 0,
    },
    {
      field: "chiecKhauDonHang",
      headerName: "Chiết Khấu đơn hàng",
      width: 200,
      editable: true,
      renderCell: (params) => {
        const value = Number(params.value) || 0;
        return value.toLocaleString("vi-VN");
      },
    },
    {
      field: "tongTien",
      headerName: "Tổng Tiền",
      width: 200,
      renderCell: (params) =>
        params.value ? params.value.toLocaleString("vi-VN") : 0,
    },
  ];
  return (
    <Grid2>
      <Typography variant="h6" sx={{ flexGrow: 1 , paddingTop : 2 }}>
        Thông tin chi tiết
      </Typography>
      <Grid2 container spacing={2}>
        <Grid2 size={6} sx={{ display: "flex", alignItems: "center", gap: 5 }}>
          <Typography
            variant="body1"
            sx={{
              width: 150,
              textAlign: "right",
              lineHeight: "1.4375em",
              paddingTop: 2,
            }}
          >
            Mã báo giá
          </Typography>
          <TextField
            id="standard-basic"
            value={baoGiaData?.id}
            variant="outlined"
            fullWidth
          />
        </Grid2>
        <Grid2 size={6} sx={{ display: "flex", alignItems: "center", gap: 5 }}>
          <Typography
            variant="body1"
            sx={{
              width: 150,
              textAlign: "right",
              lineHeight: "1.4375em",
              paddingTop: 2,
            }}
          >
            Tên báo giá
          </Typography>
          <TextField
            id="standard-basic"
            value={baoGiaData?.tenBaoGia}
            variant="outlined"
            fullWidth
          />
        </Grid2>
        <Grid2 size={6} sx={{ display: "flex", alignItems: "center", gap: 5 }}>
          <Typography
            variant="body1"
            sx={{
              width: 150,
              textAlign: "right",
              lineHeight: "1.4375em",
              paddingTop: 2,
            }}
          >
            Ngày báo giá
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Ngày báo giá"
              value={dayjs(baoGiaData?.ngayBaoGia)}
              format="DD/MM/YYYY"
              slotProps={{
                textField: { fullWidth: true , disabled: true},
              }}
            />
          </LocalizationProvider>
        </Grid2>
        <Grid2 size={6} sx={{ display: "flex", alignItems: "center", gap: 5 }}>
          <Typography
            variant="body1"
            sx={{
              width: 150,
              textAlign: "right",
              lineHeight: "1.4375em",
              paddingTop: 2,
            }}
          >
            Ngày hết hạn
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Ngày hết hạn"
              value={dayjs(baoGiaData?.ngayHetHan)}
              format="DD/MM/YYYY"
              slotProps={{
                textField: { fullWidth: true , disabled: true},
              }}
            />
          </LocalizationProvider>
        </Grid2>

        <Grid2 size={6} sx={{ display: "flex", alignItems: "center", gap: 5 }}>
          <Typography
            variant="body1"
            sx={{
              width: 150,
              textAlign: "right",
              lineHeight: "1.4375em",
              paddingTop: 2,
            }}
          >
            Tình trạng báo giá
          </Typography>
          <TextField
            id="standard-basic"
            value={baoGiaData?.tinhTrangBaoGia?.name}
            variant="outlined"
            fullWidth
          />
        </Grid2>

        <Grid2 size={6} sx={{ display: "flex", alignItems: "center", gap: 5 }}>
          <Typography
            variant="body1"
            sx={{
              width: 150,
              textAlign: "right",
              lineHeight: "1.4375em",
              paddingTop: 2,
            }}
          >
            Khách hàng
          </Typography>
          <TextField
            id="standard-basic"
            value={baoGiaData?.khachHangMucTieu?.tenKhachHang}
            variant="outlined"
            fullWidth
          />
        </Grid2>

        <Grid2 size={6} sx={{ display: "flex", alignItems: "center", gap: 5 }}>
          <Typography
            variant="body1"
            sx={{
              width: 150,
              textAlign: "right",
              lineHeight: "1.4375em",
              paddingTop: 2,
            }}
          >
            Mã số thuế
          </Typography>
          <TextField
            id="standard-basic"
            value={baoGiaData?.maSoThue}
            variant="outlined"
            fullWidth
          />
        </Grid2>
        <Grid2 size={6} sx={{ display: "flex", alignItems: "center", gap: 5 }}>
          <Typography
            variant="body1"
            sx={{
              width: 150,
              textAlign: "right",
              lineHeight: "1.4375em",
              paddingTop: 2,
            }}
          >
            Địa chỉ
          </Typography>
          <TextField
            id="standard-basic"
            value={baoGiaData?.diaChi}
            variant="outlined"
            fullWidth
          />
        </Grid2>
        
      </Grid2>
      <Typography variant="h6" sx={{ flexGrow: 1 , paddingTop : 4 }}>
        Thông tin hàng hóa
      </Typography>
      <Grid2 container spacing={2}>
          <Grid2 size={12} sx={{padding :3}}>
            <DataGrid
              rows={rows}
              columns={columns}
              editMode="row"
              sx={{ width: "100%" }}
              style={{ fontSize: "1rem" }}
              // processRowUpdate={processRowUpdate}
              componentsProps={{
                footer: {
                  style: {
                    padding: "10px",
                    fontWeight: "bold",
                    textAlign: "right",
                  },
                },
              }}
            />
          </Grid2>
        </Grid2>
    </Grid2>
  );
};

export default ThongTinChiTietTab;
