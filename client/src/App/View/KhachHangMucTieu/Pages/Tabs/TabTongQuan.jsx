import React from 'react'
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
import { useParams } from 'react-router-dom';
import { useGetBaoCaoKhachHangQuery } from 'src/App/Api/BaoCao.api';
const TabTongQuan = () => {
  const {id}=useParams()

  const {data : baoCaoKhachHang} = useGetBaoCaoKhachHangQuery(id)

  return (
    <>
       <Box mt={3}>
                {/* Grid Layout */}
                <Grid2 container spacing={2}>
                  {/* Tổng quan */}
                  <Grid2 item size={3} sm={6} md={4}>
                    <Card sx={{height:"130px"}}>
                      <CardContent>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          gutterBottom
                        >
                          Số lượng đơn hàng
                        </Typography>
                        <Typography variant="h5">{baoCaoKhachHang?.soLuongDonHang}</Typography>
                      </CardContent>
                    </Card>
                  </Grid2>
                  <Grid2 item size={3} sm={6} md={4}>
                    <Card sx={{height:"130px"}}>
                      <CardContent>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          gutterBottom
                        >
                          Giá trị đơn hàng
                        </Typography>
                        <Typography variant="h5">{baoCaoKhachHang?.giaTriDonHang.toLocaleString("vi-VN")} Triệu</Typography>
                      </CardContent>
                    </Card>
                  </Grid2>
                  <Grid2 item size={3} sm={6} md={4}>
                    <Card sx={{height:"130px"}}>
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
                    <Card sx={{height:"130px"}}>
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
              </Box>
    </>
  )
}

export default TabTongQuan