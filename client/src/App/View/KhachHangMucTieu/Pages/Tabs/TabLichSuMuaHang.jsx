import {
  Box,
  Card,
  CardContent,
  Collapse,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useGetGetLichSuMuaHangQuery } from "src/App/Api/DonHangApi";
import { useParams } from "react-router-dom";
import Moment from "react-moment";

// Styled components for modern look
const ModernCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 6px 24px rgba(0, 0, 0, 0.15)",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.grey[50],
  },
  transition: "background-color 0.2s ease",
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(1.5),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const HeaderTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.common.white,
  fontWeight: 600,
  padding: theme.spacing(2),
}));

const Row = ({ row }) => {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <StyledTableRow>
        <StyledTableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            sx={{ color: "primary.main" }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell>{row?.tenDonHang}</StyledTableCell>
        <StyledTableCell align="right">
          <Moment format="DD/MM/YYYY HH:mm">{new Date(row?.ngayDatHang)}</Moment>
        </StyledTableCell>
        <StyledTableCell align="right">
          {row.giaTriDonHang.toLocaleString()} VNĐ
        </StyledTableCell>
        <StyledTableCell align="right">
          {row.soTienConPhaiThu.toLocaleString()} VNĐ
        </StyledTableCell>
        <StyledTableCell align="right">
          {row.thucThuDonHang.toLocaleString()} VNĐ
        </StyledTableCell>
      </StyledTableRow>
      <TableRow>
        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2, bgcolor: "grey.50", borderRadius: 2, p: 2 }}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                Chi tiết hàng hóa
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Mã Hàng Hóa</StyledTableCell>
                    <StyledTableCell align="center">Tên Hàng Hóa</StyledTableCell>
                    <StyledTableCell align="center">Số lượng</StyledTableCell>
                    <StyledTableCell align="center">Đơn vị tính</StyledTableCell>
                    <StyledTableCell align="center">Đơn giá</StyledTableCell>
                    <StyledTableCell align="center">Thành tiền</StyledTableCell>
                    <StyledTableCell align="center">Tiền thuế</StyledTableCell>
                    <StyledTableCell align="center">Tổng tiền</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.hangHoaDTOs.map((item, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell align="center">{item.maHangHoaId}</StyledTableCell>
                      <StyledTableCell align="center">{item.tenHangHoa}</StyledTableCell>
                      <StyledTableCell align="center">{item.soLuong}</StyledTableCell>
                      <StyledTableCell align="center">{item.tenDonViTinh}</StyledTableCell>
                      <StyledTableCell align="center">
                        {item.donGia.toLocaleString()} VNĐ
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {item.thanhTien.toLocaleString()} VNĐ
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {item.tienThue.toLocaleString()} VNĐ
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {item.tongTien.toLocaleString()} VNĐ
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
};

const TabLichSuMuaHang = () => {
  const { id } = useParams();
  const { data: dataLichSuMuaHang } = useGetGetLichSuMuaHangQuery(id);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(dataLichSuMuaHang || []);
  }, [dataLichSuMuaHang]);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight="bold" color="text.primary" gutterBottom>
        Lịch sử mua hàng
      </Typography>
      <ModernCard>
        <CardContent sx={{ p: 0 }}>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <HeaderTableCell />
                  <HeaderTableCell>Tên đơn hàng</HeaderTableCell>
                  <HeaderTableCell align="right">Ngày đặt hàng</HeaderTableCell>
                  <HeaderTableCell align="right">Giá trị đơn hàng</HeaderTableCell>
                  <HeaderTableCell align="right">Số tiền còn phải thu</HeaderTableCell>
                  <HeaderTableCell align="right">Thực thu đơn hàng</HeaderTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length > 0 ? (
                  rows.map((row, index) => <Row key={index} row={row} />)
                ) : (
                  <TableRow>
                    <StyledTableCell colSpan={6} align="center">
                      <Typography color="text.secondary" sx={{ py: 4 }}>
                        Không có dữ liệu
                      </Typography>
                    </StyledTableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </ModernCard>
    </Container>
  );
};

export default TabLichSuMuaHang;