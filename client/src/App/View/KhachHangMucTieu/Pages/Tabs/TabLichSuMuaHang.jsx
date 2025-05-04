import { Box, Button, Chip, Collapse, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useState } from 'react'

const orders = [
  {
    id: 'DH001',
    date: '2025-05-01',
    total: 1500000,
    status: 'Đã giao',
    items: [
      { name: 'Áo thun nam', quantity: 2, price: 250000 },
      { name: 'Quần jeans', quantity: 1, price: 1000000 },
    ],
  },
  {
    id: 'DH002',
    date: '2025-04-28',
    total: 800000,
    status: 'Đang xử lý',
    items: [
      { name: 'Giày thể thao', quantity: 1, price: 800000 },
    ],
  },
];

const OrderDetails = ({ items }) => (
  <Box sx={{ p: 2, bgcolor: 'grey.100' }}>
    <Typography variant="subtitle1" gutterBottom>
      Chi tiết đơn hàng
    </Typography>
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Sản phẩm</TableCell>
          <TableCell align="right">Số lượng</TableCell>
          <TableCell align="right">Đơn giá</TableCell>
          <TableCell align="right">Tổng</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.name}</TableCell>
            <TableCell align="right">{item.quantity}</TableCell>
            <TableCell align="right">{item.price.toLocaleString('vi-VN')} đ</TableCell>
            <TableCell align="right">{(item.quantity * item.price).toLocaleString('vi-VN')} đ</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Box>
);
const TabLichSuMuaHang = () => {
  const [expanded, setExpanded] = useState({});

  return (
    <>
       <Container maxWidth="lg" sx={{ py: 4 }}>
          <TableContainer component={Paper} elevation={3}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'primary.main' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Mã đơn hàng</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">Ngày đặt</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">Tổng tiền</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">Trạng thái</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">Chi tiết</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <React.Fragment key={order.id}>
                    <TableRow hover>
                      <TableCell>{order.id}</TableCell>
                      <TableCell align="right">{order.date}</TableCell>
                      <TableCell align="right">{order.total.toLocaleString('vi-VN')} đ</TableCell>
                      <TableCell align="right">
                        <Chip
                          label={order.status}
                          color={order.status === 'Đã giao' ? 'success' : 'warning'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="outlined"
                          size="small"
                          
                        >
                          {'Xem chi tiết'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
    </>
  )
}

export default TabLichSuMuaHang