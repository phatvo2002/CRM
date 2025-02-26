import React from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Grid,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetBaoGiaByIdQuery } from "src/App/Api/BaoGiaApi";
import { useGetHangHoaQuanTamByBaoGiaIdQuery } from "src/App/Api/HangHoaQuanTam";

const XacNhanPage = () => {
  const { id } = useParams(),
    { data: dataBaoGia } = useGetBaoGiaByIdQuery(id),
    { data: dataHangHoaQuanTam } = useGetHangHoaQuanTamByBaoGiaIdQuery(id);
  const items = [
    { id: 1, name: "ELA53 75EU", code: "", quantity: 10, price: 2990000 },
    { id: 2, name: "ARKM _8GB_3200_PC", code: "", quantity: 10, price: 450000 },
  ];

  console.log(dataBaoGia);
  console.log(dataHangHoaQuanTam);

  const total = dataHangHoaQuanTam.reduce(
    (sum, item) => sum + item.soLuong * item.donGia,
    0
  );

  return (
    <Container>
      <Paper sx={{padding : 5}}>
        <Box textAlign="center" mb={2}>
          <Typography variant="h6" fontWeight="bold">
            LOGO CÔNG TY
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            {dataBaoGia?.khachHangMucTieu?.tenKhachHang}
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography>Số: .........................</Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Typography>Địa chỉ: {dataBaoGia?.diaChi}</Typography>
          </Grid>
        </Grid>
        <Typography variant="h5" fontWeight="bold" align="center" mt={2}>
          BẢNG BÁO GIÁ
        </Typography>
        <Typography mt={2}>
          <b>Kính gửi:</b> {dataBaoGia?.khachHangMucTieu?.tenKhachHang}
        </Typography>
        <Typography mt={1}>
          Công ty ................................ xin trân trọng báo giá như
          sau:
        </Typography>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>TÊN HÀNG HÓA</TableCell>
                <TableCell>MÃ HÀNG HÓA</TableCell>
                <TableCell>SỐ LƯỢNG</TableCell>
                <TableCell>ĐƠN GIÁ</TableCell>
                <TableCell>THÀNH TIỀN</TableCell>
                <TableCell>GHI CHÚ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataHangHoaQuanTam &&
                dataHangHoaQuanTam.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.maHangHoaId}</TableCell>
                    <TableCell>{item.soLuong}</TableCell>
                    <TableCell>{item.donGia}</TableCell>
                    <TableCell>{item.thanhTien.toLocaleString()}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                ))}
              <TableRow>
                <TableCell colSpan={5} sx={{ fontWeight: "bold" }}>
                  Tổng cộng:
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  {total.toLocaleString()}
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Typography mt={2}>
          <b>Ghi chú:</b>
        </Typography>
        <Typography>- Báo giá chưa bao gồm thêm thuế và chiết khấu.</Typography>
        <Typography>
          - Báo giá có hiệu lực trong vòng 14 ngày kể từ ngày ban hành.
        </Typography>
        <Typography mt={2}>
          <b>Mọi chi tiết vui lòng liên hệ:</b>
        </Typography>
        <Typography>admin | Di động: 0708223608 | Email: admin@123</Typography>
        <Typography mt={2} fontStyle="italic">
          Trân trọng kính chào!
        </Typography>
        <Box textAlign="right" mt={2}>
          <Typography>Ngày 26 tháng 2 năm 2025</Typography>
          <Typography fontWeight="bold">CÔNG TY ............</Typography>
        </Box>
        <Box>
          Vui lòng xác nhận báo giá Thông qua nút :{" "}
          <Button variant="contained" color="success">
            Xác nhận{" "}
          </Button>{" "}
          Hoặc từ chối báo giá thông qua nút{" "}
          <Button variant="contained" color="error">
            Từ chối
          </Button>{" "}
          nếu có sai sót trong phiếu báo giá
        </Box>
      </Paper>
    </Container>
  );
};

export default XacNhanPage;
