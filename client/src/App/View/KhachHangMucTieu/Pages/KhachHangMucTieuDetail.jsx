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
import ContactMailIcon from '@mui/icons-material/ContactMail';
import CachedIcon from '@mui/icons-material/Cached';
import { useGetKhachHangMucTieuByIdQuery } from "src/App/Api/KhachHangMucTieuApi";
import ModlaAddCuocGoi from "../Modal/ModalAddCuocGoi";
import ModalAddLichHen from "../Modal/ModalAddLichHen";
const KhachHangMucTieuDetail = () => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [modalCuocGoi, setModalCuocGoi] = useState(false);
  const [modalLichHen, setModalLichHen] = useState(false);
  const { id } = useParams();
  const { data: KhachhangData } = useGetKhachHangMucTieuByIdQuery(id)
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
  const handleOpenModalCuocGoi = () => setModalCuocGoi(true)
  const handleCloseMoldalCuocGoi = () => setModalCuocGoi(false)
  const handelOpenModalLichHen = () => setModalLichHen(true)
  const handleCloseMdodalLichHen = () => setModalLichHen(false)
  return (
    <>
      <Grid2 container spacing={2} sx={{ padding: 2 }}>
        <Grid2 size={4}>
          <IconButton onClick={() => backPreviousPage()}>
            <ArrowBackIcon />
          </IconButton>
          <IconButton onClick={() => window.location.reload()}>
            <CachedIcon />
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
      <Grid2 container spacing={2}>
        <Grid2 size={2}>
          <Paper
          >
            <Box
              bgcolor="#f9f9f9"
              p={2}
              display="flex"
              flexDirection="column"
              borderRight="1px solid #ddd"
            >
              <Box textAlign="center" mb={2}>
                <Avatar
                  alt=""
                  sx={{ width: 80, height: 80, margin: "0 auto", marginTop: 3 }}
                />
                <Typography variant="h6" mt={2}>
                  {KhachhangData?.tenKhachHang}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Mã số thuế: - {KhachhangData?.maSoThue ? <span>{KhachhangData?.maSoThue}</span> : <span></span>} <br />
                  Điện thoại: - {KhachhangData?.soDienThoai ? <span>{KhachhangData?.soDienThoai}</span> : <span></span>}
                </Typography>
              </Box>
              <Divider />
              <Box>
                <IconButton sx={{ margin: 1, border: "1px solid #4caf50", alignItems: "center" }} onClick={handleOpenModalCuocGoi}>
                  <LocalPhoneIcon sx={{ textAlign: "center", color: "#4caf50" }} />
                </IconButton>
                <IconButton sx={{ margin: 1, border: "1px solid #2196f3", alignItems: "center" }} onClick={handelOpenModalLichHen}>
                  <TodayIcon sx={{ textAlign: "center", color: "#2196f3" }} />
                </IconButton>
                <IconButton sx={{ margin: 1, border: "1px solid #f44336", alignItems: "center" }}>
                  <ContactMailIcon sx={{ textAlign: "center", color: "#f44336" }} />
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
        </Grid2>
        <Grid2 size={10}>
            {/* Tabs */}
            <Paper style={{ width: "100%",height: "100vh" }} >
              <Box sx={{  typography: "body1" }}>
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
                    <TabTongQuan />
                  </TabPanel>
                  <TabPanel value="2">
                    <TabThongTinChiTiet />
                  </TabPanel>
                  <TabPanel value="3">
                    <TabLienHe />
                  </TabPanel>
                  <TabPanel value="4">
                    <TabHoatDong />
                  </TabPanel>
                  <TabPanel value="5">
                    <TabBanHang />
                  </TabPanel>
                  <TabPanel value="6">
                    <TabLichSuMuaHang />
                  </TabPanel>
                </TabContext>
              </Box>
            </Paper>
        </Grid2>
      </Grid2>
      <Box>
      </Box>
      {/* Modal thêm cuộc gọi */}
      <ModlaAddCuocGoi
        showModal={modalCuocGoi}
        closeModal={handleCloseMoldalCuocGoi}
      />
      {/* Modal thêm mới lịch hẹn */}
      <ModalAddLichHen
        showModal={modalLichHen}
        closeModal={handleCloseMdodalLichHen}
      />
    </>
  );
};

export default KhachHangMucTieuDetail;
