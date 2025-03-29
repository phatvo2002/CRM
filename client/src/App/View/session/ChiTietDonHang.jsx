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
import ReplayIcon from "@mui/icons-material/Replay";
import { useParams } from "react-router-dom";
import { useGetGetDonHangByIdQuery } from "src/App/Api/DonHangApi";
import { useGetHangHoaQuanTamByDonHangIdQuery } from "src/App/Api/HangHoaQuanTam";
const ChiTietDonHang = () => {
  const { id } = useParams(),
    { data: dataDonhang, refetch } = useGetGetDonHangByIdQuery(id),
    { data: dataHangHoa } = useGetHangHoaQuanTamByDonHangIdQuery(id);
  console.log(dataDonhang, dataHangHoa);
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

          <Typography gutterBottom>Số: .........</Typography>

          <Typography gutterBottom>
            Kính gửi: 
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
                  <TableCell>Thành tiền</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
               
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Tổng tiền hàng:
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Thuế VAT (nếu có):
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Phí vận chuyển (nếu có): :
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Tổng tiền thanh toán: :
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Thời gian giao hàng:</Typography>
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Địa điểm giao hàng:</Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Phương thức thanh toán:
          </Typography>
          <Typography>
            - Thanh toán bằng tiền mặt hoặc chuyển khoản.
            <br />- Thanh toán trước 50% giá trị hợp đồng, 50% còn lại thanh
            toán sau khi giao hàng.
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            GHI CHÚ KHÁC :
          </Typography>
          <Stack
            spacing={12}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Box textAlign="right" sx={{ mt: 3 }} style={{ marginBottom: 20 }}>
              <Typography>
                ..........., ngày ... tháng ... năm .......
              </Typography>
              <Typography variant="h6" fontWeight="bold" textAlign={"center"}>
                BÊN BÁN
              </Typography>
              <Typography variant="h6" fontWeight="bold" textAlign={"center"}>
                <i>(Ký ghi rõ họ tên)</i>
              </Typography>
            </Box>
            <Box textAlign="right" sx={{ mt: 3 }} style={{ marginBottom: 20 }}>
              <Typography>
                ..........., ngày ... tháng ... năm .......
              </Typography>
              <Typography variant="h6" fontWeight="bold" textAlign={"center"}>
                BÊN MUA
              </Typography>
              <Typography variant="h6" fontWeight="bold" textAlign={"center"}>
                <i>(Ký ghi rõ họ tên)</i>
              </Typography>
            </Box>
          </Stack>
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
