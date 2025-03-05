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
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EmailIcon from "@mui/icons-material/Email";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconWord from "../../../../Assets/icon/word.png";
import ThongTinChiTietTab from "../Tabs/ThongTinChiTietTab";
import DonHangTab from "../Tabs/DonHangTab";
import HangHoaTab from "../Tabs/HangHoaTab";
import CongViecDangThucHienTab from "../Tabs/CongViecDangThucHienTab";
import CongViecDaHoanThanhTab from "../Tabs/CongViecDaHoanThanhTab";
import { useNavigate, useParams } from "react-router-dom";
import { useGetBaoGiaByIdQuery } from "src/App/Api/BaoGiaApi";
import { useDownloadFileMutation } from "src/App/Api/FileApi";
import ReplyIcon from '@mui/icons-material/Reply';
import { ModalGuiMailBaoGia } from "../../Component/ModalGuiMailBaoGia";
import ModalXuatLinkBaoGia from "../../Component/ModalXuatLinkBaoGia";
const index = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [downloadBaoGia] = useDownloadFileMutation();
  const [modalMail , setModalMail] = useState(false);
  const [modalXuatLink , setModalXuatLink] = useState(false);
  const navigate = useNavigate();
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDownLoadFileBaoGia = (id) => {
    downloadBaoGia(id);
  };
  const handleOpenModalMailBaoGia = () => setModalMail(true);
  const handleCloseModalMailBaoGia = () => setModalMail(false); 
  const handleOpenModalXuatLinkBaoBaoGia = () => setModalXuatLink(true);
  const handleCloselModalXuatLinkBaoGia = () => setModalXuatLink(false)
  const { id } = useParams(),
    { data: dataBaoGia } = useGetBaoGiaByIdQuery(id);
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handlePreviousPage = () => {
    navigate("/baogia");
  };
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };


  return (
    <Box>
      <AppBar position="static" style={{ backgroundColor: "text.primary" }}>
        <Toolbar>
          <IconButton onClick={handlePreviousPage}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {dataBaoGia?.tenBaoGia}
          </Typography>
          
          { dataBaoGia && dataBaoGia?.tinhTrangBaoGia?.name !== "Đang chờ duyệt" &&
            dataBaoGia?.tinhTrangBaoGia?.name !== "Bản thảo"  && (
                <Button
                variant="contained"
                color="secondary"
                onClick={handleOpenModalMailBaoGia}
                startIcon={<EmailIcon />}
                sx={{ marginLeft: 2 }}
              >
                Gửi mail
              </Button>
            )}
          <Button
            variant="contained"
            color="info"
            startIcon={<EditIcon />}
            sx={{ marginLeft: 2 }}
          >
            Sửa
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginLeft: 2 }}
            onClick={() => downloadBaoGia(dataBaoGia?.id)}
          >
            <img src={IconWord} alt="Xuất báo giá" width={24} height={24} />{" "}
            Xuất báo giá
          </Button>
          <Button
            variant="contained"
            color="success"
            sx={{ marginLeft: 2 }}
            onClick={() => handleOpenModalXuatLinkBaoBaoGia()}
            startIcon={<ReplyIcon />}
          >
            Xuất link báo giá
          </Button>

          { dataBaoGia && dataBaoGia?.tinhTrangBaoGia?.name === "Được chấp nhận" && (
              <Button
                variant="contained"
                color="info"
                startIcon={<ShoppingCartIcon />}
                sx={{ marginLeft: 2 }}
              >
                Sinh đơn hàng
              </Button>
            )}

          <IconButton color="inherit" onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
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
            <ThongTinChiTietTab baoGiaData={dataBaoGia} />
          </Paper>
        )}
        {tabIndex === 1 && (
          <Paper sx={{ padding: 2 }}>
            <HangHoaTab />
          </Paper>
        )}
        {tabIndex === 2 && (
          <Paper sx={{ padding: 2 }}>
            <DonHangTab />
          </Paper>
        )}
        {tabIndex === 3 && (
          <Paper sx={{ padding: 2 }}>
            <CongViecDangThucHienTab />
          </Paper>
        )}
        {tabIndex === 4 && (
          <Paper sx={{ padding: 2 }}>
            <CongViecDaHoanThanhTab />
          </Paper>
        )}
      </Box>
      {/* Modal gửi mail báo Giá */}
      <ModalGuiMailBaoGia
        showModal={modalMail}
        closeModal={handleCloseModalMailBaoGia}
        baoGiaData={dataBaoGia}
      />
      {/* modal xuất link báo gía */}
      <ModalXuatLinkBaoGia
         showModal={modalXuatLink}
         closeModal={handleCloselModalXuatLinkBaoGia}
      />
    </Box>
  );
};

export default index;
