import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import {
  Card,
  CardContent,
  Divider,
  Grid2,
  List,
  ListItem,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useGetAllTinhTrangDonHangQuery } from "src/App/Api/GetDataApi";
import { useGetHangHoaQuanTamByDonHangIdQuery } from "src/App/Api/HangHoaQuanTam";
import ModalCapNhatThucThuDonHang from "./ModalCapNhatThucThuDonHang";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ModalChiTietDonHang = ({ open, handleClose, selectedRow ,refetch }) => {
   const [modalUpdate , setModalUpdate] = useState(false)
    const handleOpenModalUpdate = () => setModalUpdate(true)
    const handleCloseModalUpdate = () => setModalUpdate(false)
    const { data: dataTinhTrangDonHang } = useGetAllTinhTrangDonHangQuery(null, {
    skip: open == false,
  });
  const { data: dataThongTinHangHoa } = useGetHangHoaQuanTamByDonHangIdQuery(
    selectedRow[0]?.id,
    { skip: open == false }
  );


  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        sx={{ "& .MuiDialog-paper": { backgroundColor: "#f4f6f8" } }}
      >
        <AppBar sx={{ position: "relative", backgroundColor: "#1976d2" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              CHI TIẾT ĐƠN HÀNG: {selectedRow[0]?.maQuanLy}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ p: 4, maxWidth: "1200px", mx: "auto" }}>
          <Grid2 container spacing={3}>
            <Button variant="contained" onClick={handleOpenModalUpdate}>Cập nhật thực thu đơn hàng</Button>
            <Button variant="contained">Tải đơn đặt hàng</Button>
            {/* Order Status Stepper */}
            <Grid2 size={12}>
              <Card sx={{ boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Trạng thái đơn hàng
                  </Typography>
                  <Stepper
                    activeStep={selectedRow[0]?.tinhTrangDonHang?.id}
                    alternativeLabel
                    className="custom-stepper"
                  >
                    {Array.isArray(dataTinhTrangDonHang) &&
                      dataTinhTrangDonHang.map((item) => (
                        <Step key={item.id}>
                          <StepLabel>{item.name}</StepLabel>
                        </Step>
                      ))}
                  </Stepper>
                </CardContent>
              </Card>
            </Grid2>

            {/* Order Information */}
            <Grid2 size={4}>
              <Card sx={{ boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Thông tin đơn hàng
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Mã đơn hàng"
                        secondary={selectedRow[0]?.maQuanLy}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Khách hàng"
                        secondary={
                          selectedRow[0]?.khachHangMucTieu?.tenKhachHang
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Ngày đặt hàng"
                        secondary={selectedRow[0]?.createAt}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Tổng tiền"
                        secondary={`${selectedRow[0]?.giaTriDonHang.toLocaleString()} VND`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Thực thu đơn hàng"
                        secondary={`${selectedRow[0]?.thucThuDonHang.toLocaleString()} VND`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Số tiền còn phải trả"
                        secondary={`${selectedRow[0]?.soTienConPhaiThu.toLocaleString()} VND`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Địa chỉ giao hàng"
                        secondary={selectedRow[0]?.thongTinGiaoHang}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid2>

            {/* Order Items */}
            <Grid2 size={8}>
              <Card sx={{ boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Chi tiết sản phẩm
                  </Typography>
                  <List>
                    <React.Fragment>
                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 800 }} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>STT</TableCell>
                              <TableCell align="center">Tên Hàng Hóa</TableCell>
                              <TableCell align="center">Đơn vị tính</TableCell>
                              <TableCell align="center">
                                Số lượng
                              </TableCell>
                              <TableCell align="center">
                                Đơn giá
                              </TableCell>
                              <TableCell align="center">
                                Thành tiền
                              </TableCell>
                              <TableCell align="center">
                                Thuế
                              </TableCell>
                              <TableCell align="center">
                                Chiết khấu
                              </TableCell>
                              <TableCell align="center">
                                Tổng tiền
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {Array.isArray(dataThongTinHangHoa)
                            && dataThongTinHangHoa.length >0 &&
                            dataThongTinHangHoa.map((item ,index) => (
                              <TableRow
                                key={item.id}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell component="th" scope="row">
                                  {index + 1}
                                </TableCell>
                                <TableCell align="center">
                                  {item?.tenHangHoa}
                                </TableCell>
                                <TableCell align="center">{item?.donViTinh?.name}</TableCell>
                                <TableCell align="center">{item?.soLuong}</TableCell>
                                <TableCell align="center">
                                  {item?.donGia}
                                </TableCell>
                                <TableCell align="center">
                                  {item?.thanhTien}
                                </TableCell>
                                <TableCell align="center">
                                  {item?.tienThue}
                                </TableCell>
                                <TableCell align="center">
                                  {item?.ChiecKhauDonHang}
                                </TableCell>
                                <TableCell align="center">
                                  {item?.tongTien}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </React.Fragment>
                  </List>
                </CardContent>
              </Card>
            </Grid2>
          </Grid2>
        </Box>
      </Dialog>
      {/* modal */}
      <ModalCapNhatThucThuDonHang refetch={refetch} showModal={modalUpdate} handleClose={handleCloseModalUpdate} Id={selectedRow[0]?.id}/>
    </React.Fragment>
  );
};

export default ModalChiTietDonHang;
