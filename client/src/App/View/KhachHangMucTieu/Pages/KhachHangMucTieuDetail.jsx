import React from "react";
import {
  Box,
  Typography,
  Tabs,
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
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TodayIcon from "@mui/icons-material/Today";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import { useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import TextsmsIcon from "@mui/icons-material/Textsms";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { useState } from "react";
import { TabContext } from "@mui/lab";
import TabTongQuan from "./Tabs/TabTongQuan";
import TabThongTinChiTiet from "./Tabs/TabThongTinChiTiet";
import TabLienHe from "./Tabs/TabLienHe";
import TabBanHang from "./Tabs/TabBanHang";
import TabHoatDong from "./Tabs/TabHoatDong";
import TabLichSuMuaHang from "./Tabs/TabLichSuMuaHang";
const KhachHangMucTieuDetail = () => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  const backPreviousPage = () => {
    navigate("/khachhang");
  };
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <>
      <Grid2 container spacing={2} sx={{ padding: 2 }}>
        <Grid2 size={4}>
          <IconButton onClick={() => backPreviousPage()}>
            <ArrowBackIcon />
          </IconButton>
        </Grid2>

        <Grid2 size={8}>
          <Button
            variant="outlined"
            style={{ margin: 5 }}
            endIcon={<LocalPhoneIcon />}
          >
            Gọi Điện thoại
          </Button>
          <Button
            variant="outlined"
            style={{ margin: 5 }}
            endIcon={<MarkunreadIcon />}
          >
            Gửi mail
          </Button>
          <Button
            variant="outlined"
            style={{ margin: 5 }}
            endIcon={<TextsmsIcon />}
          >
            Gửi SMS
          </Button>
          <Button
            variant="outlined"
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            endIcon={<ChangeCircleIcon />}
          >
            Chuyển đổi
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>Sinh đơn hàng</MenuItem>
            <MenuItem onClick={handleClose}>Sinh cơ hội</MenuItem>
          </Menu>

        </Grid2>
      </Grid2>
      <Box>
        <Box display="flex" flexDirection="row" height="100vh">
          {/* Sidebar */}
          <Paper

          >
            <Box
              width="250px"
              bgcolor="#f9f9f9"
              p={2}
              display="flex"
              flexDirection="column"
              borderRight="1px solid #ddd"
            >
              <Box textAlign="center" mb={2}>
                <Avatar
                  alt="Phat"
                  sx={{ width: 80, height: 80, margin: "0 auto", marginTop: 3 }}
                />
                <Typography variant="h6" mt={2}>
                  Phat
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Mã số thuế: - <br />
                  Điện thoại: -
                </Typography>
              </Box>
              <Divider />
              <Box>
                <IconButton sx={{ margin: 1, border: "1px solid #4caf50", alignItems: "center" }}>
                  <LocalPhoneIcon sx={{ textAlign: "center", color: "#4caf50" }} />
                </IconButton>
                <IconButton sx={{ margin: 1, border: "1px solid #2196f3", alignItems: "center" }}>
                  <TodayIcon sx={{ textAlign: "center", color: "#2196f3" }} />
                </IconButton>
                <IconButton sx={{ margin: 1, border: "1px solid #f44336", alignItems: "center" }}>
                  <PermContactCalendarIcon sx={{ textAlign: "center", color: "#f44336" }} />
                </IconButton>
              </Box>
              <Box mt={2}>
                <Typography variant="body2" color="text.secondary">
                  Ngành nghề: Không chọn
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  Doanh thu: Không chọn
                </Typography>
              </Box>
              {/* <Box mt={2} textAlign="center">
          <Button variant="contained" size="small" startIcon={<CallIcon />}>
            Thêm thẻ
          </Button>
        </Box> */}
            </Box>
          </Paper>

          {/* Main Content */}
          <Box

            sx={{
              border: 0,
              paddingLeft: 3
            }}
          >
            {/* Tabs */}
            <Paper style={{width: "100%"}}>
              <Box sx={{height :"100vh", typography: "body1" }}>
                <TabContext value={value} >
                  <Box
                    sx={{ border: 0, borderColor: "Highlight", fontFamily: "inherit", boxShadow: 3 }}
                  >
                    <TabList onChange={handleChange} aria-label="lab" scrollButtons={"auto"}>
                      <Tab label="Tổng quan" value="1" />
                      <Tab label="Thông tin chi tiết" value="2" />
                      <Tab label="Liên hệ" value="3" />
                      <Tab label="Hoạt động" value="4" />
                      <Tab label="Bán hàng" value="5" />
                      <Tab label="Lịch sử mua hàng" value="6" />
                      <Tab label="Ghi chú" value="7" />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    <TabTongQuan/>
                  </TabPanel>
                  <TabPanel value="2">
                    <TabThongTinChiTiet/>
                  </TabPanel>
                  <TabPanel value="3">
                     <TabLienHe/>
                  </TabPanel>
                  <TabPanel value="4">
                     <TabHoatDong/>
                  </TabPanel>
                  <TabPanel value="5">
                     <TabBanHang />
                  </TabPanel>
                  <TabPanel value="6">
                     <TabLichSuMuaHang/>
                  </TabPanel>
                </TabContext>
              </Box>
            </Paper>

          </Box>
        </Box>
      </Box>
    </>
  );
};

export default KhachHangMucTieuDetail;
