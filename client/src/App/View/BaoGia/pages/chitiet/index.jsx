
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Tabs,
  Tab,
  Button,
  Paper,
  Grid2,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import EmailIcon from '@mui/icons-material/Email';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconWord from "../../../../Assets/icon/word.png";
import ThongTinChiTietTab from "../Tabs/ThongTinChiTietTab";
import DonHangTab from "../Tabs/DonHangTab";
import HangHoaTab from "../Tabs/HangHoaTab";
import CongViecDangThucHienTab from "../Tabs/CongViecDangThucHienTab";
import CongViecDaHoanThanhTab from "../Tabs/CongViecDaHoanThanhTab";
import { useNavigate, useParams } from "react-router-dom";
import { useGetBaoGiaByIdQuery } from "src/App/Api/BaoGiaApi";
const index = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [tabIndex, setTabIndex] = useState(0);
    const navigate = useNavigate()
    const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const {id} = useParams(),
    {data : dataBaoGia} = useGetBaoGiaByIdQuery(id) 
    const handleMenuClose = () => {
      setAnchorEl(null);
    };
    
    const handlePreviousPage = ()=>
    {
        navigate("/baogia")
    }
    const handleTabChange = (event, newValue) => {
      setTabIndex(newValue);
    };

    console.log(dataBaoGia)
  
    return (
      <Box>
        <AppBar position="static" style={{backgroundColor:"text.primary"}}>
          <Toolbar>
          <IconButton onClick={handlePreviousPage}>
            <ArrowBackIcon/>
          </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              {dataBaoGia?.tenBaoGia}
            </Typography>
            <Button variant="contained" color="secondary" startIcon={<EmailIcon/>} sx={{marginLeft:2}}>Gửi mail</Button>
            <Button variant="contained" color="info" startIcon={<EditIcon/>} sx={{marginLeft:2}}>Sửa</Button>
            <Button variant="contained" color="primary" sx={{marginLeft:2}} ><img src={IconWord} alt="Xuất báo giá" width={24} height={24} /> Xuất báo giá</Button>
            <Button variant="contained" color="info" startIcon={<ShoppingCartIcon/>} sx={{marginLeft:2}}>Sinh đơn hàng</Button>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={handleMenuClose}>Nhật ký</MenuItem>
              <MenuItem onClick={handleMenuClose}>Nhân bản</MenuItem>
              <MenuItem onClick={handleMenuClose}>Xóa</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        
        <Tabs value={tabIndex} onChange={handleTabChange}>
          <Tab label="Thông tin chi tiết" />
          <Tab label="Hàng hóa" />
          <Tab label="Đơn hàng" />
          <Tab label="Công việc đang thực hiện" />
          <Tab label="Công việc đã hoàn thành" />
        </Tabs>
  
        <Box sx={{ padding: 2 }}>
          {tabIndex === 0 && (
            <Paper sx={{ padding: 2 }}>
                <ThongTinChiTietTab baoGiaData={dataBaoGia}/>
            </Paper>
          )}
          {tabIndex === 1 && (
            <Paper sx={{ padding: 2 }}>
               <HangHoaTab/>
            </Paper>
          )}
          {tabIndex === 2 && (
            <Paper sx={{ padding: 2 }}>
               <DonHangTab/>
            </Paper>
          )}
          {tabIndex === 3 && (
            <Paper sx={{ padding: 2 }}>
               <CongViecDangThucHienTab/>
            </Paper>
          )}
          {tabIndex === 4 && (
            <Paper sx={{ padding: 2 }}>
               <CongViecDaHoanThanhTab/>
            </Paper>
          )}
        </Box>
        
       
      </Box>
    );
}

export default index