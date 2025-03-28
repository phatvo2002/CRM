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
  Button,
  Stack,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import DownloadIcon from "@mui/icons-material/Download";
import ReplayIcon from '@mui/icons-material/Replay';
const ChiTietDonHang = () => {
  return (
    <>
      <Container>
        <Paper sx={{ padding: 10 }} elevation={3}>
          <Typography variant="h5" align="center" gutterBottom>
            CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
          </Typography>
          <Typography variant="h6" align="center" gutterBottom>
            Độc lập – Tự do – Hạnh phúc
          </Typography>
          <Typography variant="h5" align="center" gutterBottom>
            ĐƠN ĐẶT HÀNG
          </Typography>

          <Typography gutterBottom>Số: ........</Typography>

          <Typography gutterBottom>
            Kính gửi: Công ty
            .............................................................
          </Typography>
          <Typography gutterBottom>
            Công ty ............................................................
            có nhu cầu đặt hàng tại Quý công ty theo mẫu yêu cầu.
          </Typography>

          <Typography variant="h6" gutterBottom>
            Nội dung đặt hàng như sau:
          </Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell>Tên mặt hàng</TableCell>
                  <TableCell>ĐVT</TableCell>
                  <TableCell>Số lượng</TableCell>
                  <TableCell>Đơn giá</TableCell>
                  <TableCell>Tiền thuế</TableCell>
                  <TableCell>Thành tiền</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[...Array(3)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>...................................</TableCell>
                    <TableCell>......</TableCell>
                    <TableCell>......</TableCell>
                    <TableCell>......</TableCell>
                    <TableCell>......</TableCell>
                    <TableCell>......</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Chiết khấu:
            .............................................................
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Tổng cộng:
            .............................................................
          </Typography>

          <Typography gutterBottom>
            Thời gian giao hàng: ___________________________________________
          </Typography>
          <Typography gutterBottom>
            Địa điểm giao hàng: ___________________________________________
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Phương thức thanh toán:
          </Typography>
          <Typography>
            - Thanh toán bằng tiền mặt hoặc chuyển khoản.
            <br />- Thanh toán trước 50% giá trị hợp đồng, 50% còn lại thanh
            toán sau khi giao hàng.
          </Typography>

          <Box textAlign="right" sx={{ mt: 3 }}>
            <Typography>..........., ngày ... tháng ... năm .......</Typography>
            <Typography variant="h6" fontWeight="bold">
              GIÁM ĐỐC
            </Typography>
          </Box>
          <Stack spacing={2} direction="row" justifyContent="center">
            <Button
              variant="contained"
              color="success"
              startIcon={<DoneIcon />}
            >
              Xác nhận đơn hàng
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<ReplayIcon />}
            >
              Đề nghị trả hàng
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<DownloadIcon />}
            >
              Tải đơn hàng
            </Button>
          </Stack>
        </Paper>
      </Container>
    </>
  );
};

export default ChiTietDonHang;
