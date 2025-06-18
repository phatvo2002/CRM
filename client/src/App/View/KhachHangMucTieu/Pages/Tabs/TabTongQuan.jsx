import React from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  Divider,
  Avatar,
  Button,
  Grid2,
  IconButton,
  Paper,
  Menu,
  MenuItem,
  Icon,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetBaoCaoKhachHangQuery } from "src/App/Api/BaoCao.api";
const TabTongQuan = ({customerData}) => {
  const { id } = useParams();

  const { data: baoCaoKhachHang } = useGetBaoCaoKhachHangQuery(id);

  return (
    <>
      <Box mt={3}>
        {/* Grid Layout */}
        <Grid2 container spacing={2}>
          <Grid2 item size={3} sm={6} md={4}>
            <Card sx={{ height: "130px" }}>
              <CardContent>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  gutterBottom
                >
                  Số lượng đơn hàng
                </Typography>
                <Typography variant="h5">
                  {baoCaoKhachHang?.soLuongDonHang}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
          <Grid2 item size={3} sm={6} md={4}>
            <Card sx={{ height: "130px" }}>
              <CardContent>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  gutterBottom
                >
                  Giá trị đơn hàng
                </Typography>
                <Typography variant="h5">
                  {baoCaoKhachHang?.giaTriDonHang.toLocaleString("vi-VN")} Triệu
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
          <Grid2 item size={3} sm={6} md={4}>
            <Card sx={{ height: "130px" }}>
              <CardContent>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  gutterBottom
                >
                  Công nợ
                </Typography>
                <Typography variant="h5" color="error">
                  {baoCaoKhachHang?.congNo.toLocaleString("vi-VN")} Triệu
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
          <Grid2 item size={3} sm={6} md={4}>
            <Card sx={{ height: "130px" }}>
              <CardContent>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  gutterBottom
                >
                  Chu kỳ mua hàng
                </Typography>
                <Typography variant="h5">0 Ngày</Typography>
              </CardContent>
            </Card>
          </Grid2>
        </Grid2>
        {/* Phần thông tin chi tiết khách hàng */}
        <Box mt={4}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6">Thông tin chi tiết khách hàng</Typography>
            {/* <Button variant="outlined" onClick={handleEditToggle}>
              {isEditing ? "Lưu" : "Chỉnh sửa"}
            </Button> */}
          </Box>

          {/* Thông tin cơ bản */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Thông tin cơ bản
              </Typography>
              <Grid2 container spacing={2}>
                <Grid2 item size={12} sm={6}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Mã khách hàng
                  </Typography>
                  <Typography variant="body1">{customerData?.id}</Typography>
                </Grid2>
                <Grid2 item size={12} sm={6}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Tên khách hàng
                  </Typography>
                  <Typography variant="body1">
                    {customerData?.tenKhachHang}
                  </Typography>
                </Grid2>
                <Grid2 item size={12} sm={6}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Mã số thuế
                  </Typography>
                  <Typography variant="body1">
                    {customerData?.maSoThue || "Chưa có"}
                  </Typography>
                </Grid2>
                <Grid2 item size={12} sm={6}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Nguồn gốc khách hàng
                  </Typography>
                  <Typography variant="body1">
                    {customerData?.nguonGocKhachHang?.tenNguonGoc}
                  </Typography>
                </Grid2>
                <Grid2 item size={12} sm={6}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Loại khách hàng
                  </Typography>
                  <Typography variant="body1">
                    {customerData?.isKhachHangCaNhan
                      ? "Cá nhân"
                      : "Doanh nghiệp"}
                    {customerData?.isNhaPhanPhoi ? ", Nhà phân phối" : ""}
                  </Typography>
                </Grid2>
              </Grid2>
            </CardContent>
          </Card>

          {/* Thông tin liên hệ */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Thông tin liên hệ
              </Typography>
              <Grid2 container spacing={2}>
                <Grid2 item size={12} sm={6}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Số điện thoại
                  </Typography>
                  <Typography variant="body1">
                    {customerData?.soDienThoai}
                  </Typography>
                </Grid2>
                <Grid2 item size={12} sm={6}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1">
                    {customerData?.email || "Chưa có"}
                  </Typography>
                </Grid2>
                <Grid2 item size={12} sm={6}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Website
                  </Typography>
                  <Typography variant="body1">
                    {customerData?.website || "Chưa có"}
                  </Typography>
                </Grid2>
              </Grid2>
            </CardContent>
          </Card>

          {/* Thông tin giao hàng */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Thông tin giao hàng
              </Typography>
              <Grid2 container spacing={2}>
                <Grid2 item size={12}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Địa chỉ giao hàng
                  </Typography>
                  <Typography variant="body1">
                    {customerData?.thongTinGiaoHang || "Chưa có"}
                  </Typography>
                </Grid2>
                <Grid2 item size={12}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Thông tin hóa đơn
                  </Typography>
                  <Typography variant="body1">
                    {customerData?.thongTinHoaDon || "Chưa có"}
                  </Typography>
                </Grid2>
              </Grid2>
            </CardContent>
          </Card>

          {/* Thông tin bổ sung */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Thông tin bổ sung
              </Typography>
              <Grid2 container spacing={2}>
                <Grid2 item size={12} sm={6}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Mô tả
                  </Typography>
                  <Typography variant="body1">
                    {customerData?.moTa || "Chưa có"}
                  </Typography>
                </Grid2>
                <Grid2 item size={12} sm={6}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Tài khoản ngân hàng
                  </Typography>
                  <Typography variant="body1">
                    {customerData?.taiKhoanNganHang || "Chưa có"}
                  </Typography>
                </Grid2>
                <Grid2 item size={12} sm={6}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Ngày thành lập
                  </Typography>
                  <Typography variant="body1">
                    {new Date(customerData?.ngayThanhLap).toLocaleDateString(
                      "vi-VN"
                    ) === "01/01/0001"
                      ? "Chưa có"
                      : new Date(customerData?.ngayThanhLap).toLocaleDateString(
                          "vi-VN"
                        )}
                  </Typography>
                </Grid2>
              </Grid2>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default TabTongQuan;
