
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
const index = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [tabIndex, setTabIndex] = useState(0);
  
    const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
    };
  
    const handleTabChange = (event, newValue) => {
      setTabIndex(newValue);
    };
  
    return (
      <Box>
        <AppBar position="static">
          <Toolbar>
          <IconButton>
            <ArrowBackIcon/>
          </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              BG0000008 - Công ty TNHH đầu tư xây dựng Đại dương
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
          <Tab label="Tài liệu đính kèm" />
          <Tab label="Công việc đang thực hiện" />
        </Tabs>
  
        <Box sx={{ padding: 2 }}>
          {tabIndex === 0 && (
            <Paper sx={{ padding: 2 }}>
              <Typography variant="h6">Thông tin chi tiết</Typography>
              <Grid2 container spacing={2}>
                <Grid2 item size={6}><Typography>Mã hàng hóa: GHEXOAY</Typography></Grid2>
                <Grid2 item size={6}><Typography>Diễn giải: Ghế xoay</Typography></Grid2>
                <Grid2 item size={6}><Typography>Đơn vị tính: Cái</Typography></Grid2>
                <Grid2 item size={6}><Typography>Số lượng: 200</Typography></Grid2>
                <Grid2 item size={6}><Typography>Đơn giá: 400.000</Typography></Grid2>
                <Grid2 item size={6}><Typography>Thành tiền: 80.000.000</Typography></Grid2>
                <Grid2 item size={6}><Typography>Thuế suất: 5%</Typography></Grid2>
                <Grid2 item size={6}><Typography>Tổng tiền: 76.000.000</Typography></Grid2>
              </Grid2>
            </Paper>
          )}
          {tabIndex === 1 && (
            <Paper sx={{ padding: 2 }}>
              <Typography variant="h6">Tài liệu đính kèm</Typography>
              <Typography>Không có tài liệu đính kèm.</Typography>
            </Paper>
          )}
          {tabIndex === 2 && (
            <Paper sx={{ padding: 2 }}>
              <Typography variant="h6">Công việc đang thực hiện</Typography>
              <Typography>Không có công việc nào đang thực hiện.</Typography>
            </Paper>
          )}
        </Box>
        
       
      </Box>
    );
}

export default index