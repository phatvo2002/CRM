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
  Button,
  Stack,
  Divider,
  CircularProgress,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import DownloadIcon from "@mui/icons-material/Download";
import ReplayIcon from "@mui/icons-material/Replay";
import { useParams } from "react-router-dom";
import {
  useGetGetDonHangByIdQuery,
  useXacNhanDonhangMutation,
} from "src/App/Api/DonHangApi";
import { useGetHangHoaQuanTamByDonHangIdQuery } from "src/App/Api/HangHoaQuanTam";
import Moment from "react-moment";
import Swal from "sweetalert2";
import { useDownloadFileDonHangMutation } from "src/App/Api/FileApi";

const ChiTietDonHang = () => {
  const { id } = useParams();
  const {
    data: dataDonhang,
    isLoading: loadingDonhang,
    refetch,
  } = useGetGetDonHangByIdQuery(id);
  const { data: dataHangHoa, isLoading: loadingHangHoa } =
    useGetHangHoaQuanTamByDonHangIdQuery(id);
  const [xacNhanDonhang] = useXacNhanDonhangMutation();
  const [lyDoHuyDon, setLydoHuyDon] = useState(null);
  const [downLoadDonHang] = useDownloadFileDonHangMutation()
  if (loadingDonhang || loadingHangHoa) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!dataDonhang) {
    return (
      <Container>
        <Typography variant="h6" color="error" align="center">
          Không tìm thấy thông tin đơn hàng.
        </Typography>
      </Container>
    );
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };
  const tongTienHang = Array.isArray(dataHangHoa)
    ? dataHangHoa.reduce(
        (total, item) => total + (Number(item.thanhTien) || 0),
        0
      )
    : 0;

  const tongTienThue = Array.isArray(dataHangHoa)
    ? dataHangHoa.reduce(
        (total, item) => total + (Number(item.tienThue) || 0),
        0
      )
    : 0;

  const tongChietKhau = Array.isArray(dataHangHoa)
    ? dataHangHoa.reduce(
        (total, item) => total + (Number(item.ChiecKhauDonHang) || 0),
        0
      )
    : 0;

  const tongCong = tongTienHang + tongTienThue - tongChietKhau;

  const handleXacNhanDonHang = async () => {
    Swal.fire({
      title: "Bạn có muốn xác nhận đơn hàng ? ",
      text: "Lưu ý : sau khi xác nhận đơn hàng của bạn sẽ không thể hoàn hủy đơn hàng",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = {
          id: id,
          type: 1,
          lyDoHuyDon: "",
        };
        const response = await xacNhanDonhang(data);
        if (response?.data?.status == 200) {
          Swal.fire({
            title: "Xác nhận đơn hàng thành công",
            icon: "success",
          }).then(() => {
            window.location.href = "https://mail.google.com/mail/";
          });
        } else {
          Swal.fire({
            title: "Đã có lỗi xảy ra ",
            icon: "warning",
          });
        }
      }
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 2, boxShadow: 3 }}>
        {/* Header Section */}
        <Box textAlign="center" mb={4}>
          <Typography variant="h5" fontWeight="bold">
            CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
          </Typography>
          <Typography variant="h6" color="text.secondary" mb={1}>
            Độc lập – Tự do – Hạnh phúc
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h4" fontWeight="bold" color="primary">
            ĐƠN ĐẶT HÀNG
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Số: {dataDonhang?.soDonHang || "......"}
          </Typography>
        </Box>

        {/* Company Information */}
        <Box mb={4}>
          <Typography variant="body1" mb={1}>
            <strong>Kính gửi:</strong>{" "}
            {dataDonhang?.khachHangMucTieu?.TenKhachHang ||
              "Công ty ............................................................"}
          </Typography>
          <Typography variant="body1">
            Công ty{" "}
            {dataDonhang?.tenCongTyBenMua ||
              "............................................................"}{" "}
            có nhu cầu đặt hàng tại Quý công ty theo mẫu yêu cầu.
          </Typography>
        </Box>

        {/* Order Details */}
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Nội dung đặt hàng
        </Typography>
        <TableContainer component={Paper} sx={{ mb: 4, borderRadius: 1 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "primary.light" }}>
                <TableCell sx={{ fontWeight: "bold" }}>STT</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Tên hàng hóa</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>ĐVT</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Số lượng</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Đơn giá</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Thành tiền</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Tiền thuế</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Tổng tiền</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataHangHoa?.length > 0 ? (
                dataHangHoa.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.tenHangHoa}</TableCell>
                    <TableCell>{item.donViTinh?.name}</TableCell>
                    <TableCell>{item.soLuong}</TableCell>
                    <TableCell>{formatCurrency(item.donGia)}</TableCell>
                    <TableCell>{formatCurrency(item.thanhTien)}</TableCell>
                    <TableCell>{formatCurrency(item.tienThue)}</TableCell>
                    <TableCell>{formatCurrency(item.tongTien)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Không có mặt hàng nào.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Summary Section */}
        <Box mb={4}>
          <Typography variant="body1" fontWeight="bold">
            Tổng tiền hàng:{" "}
            {formatCurrency(
              Array.isArray(dataHangHoa)
                ? dataHangHoa.reduce(
                    (total, item) => total + (Number(item.thanhTien) || 0),
                    0
                  )
                : 0
            )}
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            Thuế VAT:{" "}
            {formatCurrency(
              Array.isArray(dataHangHoa)
                ? dataHangHoa.reduce(
                    (total, item) => total + (Number(item.tienThue) || 0),
                    0
                  )
                : 0
            )}
          </Typography>
          {/* <Typography variant="body1" fontWeight="bold">
            Phí vận chuyển: {formatCurrency(dataDonhang?.phiVanChuyen || 0)}
          </Typography> */}
          <Typography variant="body1" fontWeight="bold" color="primary">
            Tổng tiền thanh toán: {formatCurrency(tongCong)}
          </Typography>
        </Box>

        {/* Delivery Information */}
        <Box mb={4}>
          <Typography variant="body1" fontWeight="bold">
            Thời gian giao hàng:{" "}
            {(
              <Moment format="DD/MM/YYYY ">
                {new Date(dataDonhang.hanGiaoHang)}
              </Moment>
            ) || "......"}
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            Địa điểm giao hàng: {dataDonhang?.ThongTinGiaoHang || "......"}
          </Typography>
        </Box>

        {/* Payment Terms */}
        <Box mb={4}>
          <Typography variant="h6" fontWeight="bold" mb={1}>
            Phương thức thanh toán
          </Typography>
          <Typography variant="body1">
            {dataDonhang?.phuongThucThanhToan}
          </Typography>
        </Box>

        {/* Additional Notes */}
        <Box mb={4}>
          <Typography variant="h6" fontWeight="bold" mb={1}>
            Ghi chú khác
          </Typography>
          <Typography variant="body2">
            {dataDonhang?.ghiChu || "Không có ghi chú."}
          </Typography>
        </Box>

        {/* Signature Section */}
        {/* <Stack direction="row" justifyContent="space-between" mb={4}>
          <Box textAlign="center">
            <Typography variant="body2">
              {dataDonhang?.diaDiem || "..........."}, ngày {dataDonhang?.ngay || "..."} tháng {dataDonhang?.thang || "..."} năm {dataDonhang?.nam || "......."}
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              BÊN BÁN
            </Typography>
            <Typography variant="body2" fontStyle="italic">
              (Ký ghi rõ họ tên)
            </Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="body2">
              {dataDonhang?.diaDiem || "..........."}, ngày {dataDonhang?.ngay || "..."} tháng {dataDonhang?.thang || "..."} năm {dataDonhang?.nam || "......."}
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              BÊN MUA
            </Typography>
            <Typography variant="body2" fontStyle="italic">
              (Ký ghi rõ họ tên)
            </Typography>
          </Box>
        </Stack> */}

        {/* Action Buttons */}
        <Stack direction="row" spacing={2} justifyContent="center">
          {dataDonhang?.maTinhTrangDonhang === 3 &&
            ( (
              <>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<DoneIcon />}
                  onClick={handleXacNhanDonHang}
                  sx={{ minWidth: 160, py: 1 }}
                >
                  Xác nhận đơn hàng
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<ReplayIcon />}
                  sx={{ minWidth: 160, py: 1 }}
                >
                  Hủy đơn hàng
                </Button>
              </>
            ))}

          <Button
            variant="contained"
            color="primary"
            startIcon={<DownloadIcon />}
            onClick={() => downLoadDonHang(id)}
            sx={{ minWidth: 160, py: 1 }}
          >
            Tải đơn hàng
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default ChiTietDonHang;
