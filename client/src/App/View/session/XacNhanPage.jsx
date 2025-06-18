import React, { useState } from "react";
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
import {
  useGetBaoGiaByIdQuery,
  useUpdatePheDuyetBaoGiaMutation,
} from "src/App/Api/BaoGiaApi";
import { useGetHangHoaQuanTamByBaoGiaIdQuery } from "src/App/Api/HangHoaQuanTam";
import Swal from "sweetalert2";
import IconWord from "src/App/Assets/icon/word.png";
import { useDownloadFileMutation } from "src/App/Api/FileApi";
const XacNhanPage = () => {
  const { id } = useParams(),
    { data: dataBaoGia } = useGetBaoGiaByIdQuery(id),
    { data: dataHangHoaQuanTam } = useGetHangHoaQuanTamByBaoGiaIdQuery(id),
    [xacNhanBaoGia] = useUpdatePheDuyetBaoGiaMutation(),
    [downLoadBaoGia] = useDownloadFileMutation();
  const total = Array.isArray(dataHangHoaQuanTam)
    ? dataHangHoaQuanTam.reduce((sum, item) => sum + item?.tongTien, 0)
    : 0;

  const fullDay = new Date();
  const day = fullDay.getDay();
  const month = fullDay.getMonth();
  const year = fullDay.getFullYear();

  const handleXacNhan = (xacNhanId) => {
    if (xacNhanId == 4) {
      Swal.fire({
        title: "Bạn có muốn xác nhận báo giá này",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Có",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await xacNhanBaoGia({
            baoGiaId: id,
            trangThaiId: xacNhanId,
          });

          if (response?.data?.status == 200) {
            Swal.fire({
              title: "Xác nhận báo giá thành công",
              icon: "success",
            }).then(() => {
              window.location.href = "https://mail.google.com/mail/";
            });
          } else {
            Swal.fire({
              title: "Từ chối thành công",
              icon: "success",
            });
          }
        }
      });
    } else {
      Swal.fire({
        title: "Bạn có muốn từ chối báo giá này",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Có",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await xacNhanBaoGia({
            baoGiaId: id,
            trangThaiId: xacNhanId,
          });
          if (response?.data?.status == 200) {
            Swal.fire({
              title: "Từ chối đơn hàng thành công",
              icon: "success",
            }).then(() => {
              window.location.href = "https://mail.google.com/mail/";
            });
          }
        }
      });
    }
  };

  return (
    <Container>
      <Paper sx={{ padding: 5 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginLeft: 2 }}
          onClick={() => downLoadBaoGia(id)}
        >
          <img src={IconWord} alt="Xuất báo giá" width={24} height={24} /> Tải 
          báo giá
        </Button>
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
                <TableCell>ĐƠN VỊ TÍNH </TableCell>
                <TableCell>SỐ LƯỢNG</TableCell>
                <TableCell>ĐƠN GIÁ</TableCell>
                <TableCell>THÀNH TIỀN</TableCell>
                <TableCell>THUẾ VAT</TableCell>
                <TableCell>TỔNG TIỀN</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataHangHoaQuanTam &&
                dataHangHoaQuanTam.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.tenHangHoa}</TableCell>
                    <TableCell>{item.donViTinh?.name}</TableCell>
                    <TableCell>{item.soLuong}</TableCell>
                    <TableCell>
                      {item.donGia.toLocaleString()} <span>&#x0111;</span>
                    </TableCell>
                    <TableCell>
                      {item.thanhTien.toLocaleString()} <span>&#x0111;</span>
                    </TableCell>
                    <TableCell>
                      {item.tienThue.toLocaleString()} <span>&#x0111;</span>
                    </TableCell>
                    <TableCell>
                      {item.tongTien.toLocaleString()} <span>&#x0111;</span>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                ))}
              <TableRow>
                <TableCell colSpan={7} sx={{ fontWeight: "bold" }}>
                  Tổng cộng:
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  {total.toLocaleString()} <span>&#x0111;</span>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Typography mt={2}>
          <b>Ghi chú:</b>
        </Typography>
        <Typography>
          - Báo giá có hiệu lực trong vòng 14 ngày kể từ ngày được tạo.
        </Typography>
        <Typography mt={2}>
          <b>Mọi chi tiết vui lòng liên hệ:</b>
        </Typography>
        <Typography>
          {dataBaoGia?.nguoiDung?.hoVaDem} {dataBaoGia?.nguoiDung?.ten} | Di
          động: {dataBaoGia?.nguoiDung?.soDienThoai} | Email:{" "}
          {dataBaoGia?.nguoiDung?.email}
        </Typography>
        <Typography mt={2} fontStyle="italic">
          Trân trọng kính chào!
        </Typography>
        <Box textAlign="right" mt={2}>
          <Typography>
            Ngày {day} tháng {month} năm {year}
          </Typography>
          <Typography fontWeight="bold">CÔNG TY ............</Typography>
        </Box>
        <Box marginTop={10}>
          Vui lòng xác nhận báo giá Thông qua nút :{" "}
          <Button
            variant="contained"
            color="success"
            onClick={() => handleXacNhan(4)}
          >
            Xác nhận{" "}
          </Button>{" "}
          Hoặc từ chối báo giá thông qua nút{" "}
          <Button
            variant="contained"
            color="error"
            onClick={() => handleXacNhan(5)}
          >
            Từ chối
          </Button>{" "}
          nếu có sai sót trong phiếu báo giá
        </Box>
      </Paper>
    </Container>
  );
};

export default XacNhanPage;
