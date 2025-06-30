import React, { useState } from "react";
import {
  Grid2,
  Paper,
  Stack,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { useParams, useNavigate } from "react-router-dom";
import { useGetKhachHangTiemNangByIdQuery } from "src/App/Api/KhachHangTiemNangApi";
import image from "../../../Assets/image/person.png";
import ThongTInChiTietTab from "./Tab/ThongTInChiTietTab";
import NguoiDaiDienTab from "./Tab/NguoiDaiDienTab";
import HangHoaQuanTamTab from "./Tab/HangHoaQuanTamTab";
import CongViecThucHienTab from "./Tab/CongViecThucHienTab";
import EmailTab from "./Tab/EmailTab";
import SMStab from "./Tab/SMStab";
import ModalConvertKhachHangTiemNang from "./ModalConvertKhachHangTiemNang";
import ModalEditKhachHangTiemNang from "../ModalEditKhachHangTiemNang";
import { ModalGuiMail } from "../Modal/ModalGuiMail";
import { MoreVert, Edit, SyncAlt } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import CustomButtonAction from "src/App/Components/CustomButtonAction/CustomButtonAction";
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import TextsmsIcon from '@mui/icons-material/Textsms';
const KhachHangTiemNangDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation()
  const query = new URLSearchParams(location.search);
  const menuId = query.get("menu");

  const { data: dataKhachHangById, isLoading } = useGetKhachHangTiemNangByIdQuery(id);

  const [anchorEl, setAnchorEl] = useState(null);
  const [tabValue, setTabValue] = useState("1");
  const [modalConvert, setOpenModalConvert] = useState(false);
  const [modalGuiMail, setModalGuiMail] = useState(false);
  const [modalEdit, setOpenModalEdit] = useState(false);

  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleCloseDrop = () => setAnchorEl(null);
  const handleTabChange = (event, newValue) => setTabValue(newValue);
  const gotoLink = () => navigate(-1);

  const handleOpenModalConvert = () => setOpenModalConvert(true);
  const handleCloseModalConvert = () => setOpenModalConvert(false);
  const handleOpenModalEdit = () => setOpenModalEdit(true);
  const handleCloseModalEdit = () => setOpenModalEdit(false);
  const handleOpenModalGuiMail = () => setModalGuiMail(true);
  const handleCloseModalGuiMail = () => setModalGuiMail(false);

  if (isLoading) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6">Đang tải...</Typography>
      </Box>
    );
  }

  if (!dataKhachHangById) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6">Không tìm thấy dữ liệu</Typography>
      </Box>
    );
  }

  return (
    <Grid2 container spacing={2} sx={{ p: 2 }}>
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          borderRadius: 3,
          overflow: "hidden",
          bgcolor: "background.primary",
        }}
      >
        {/* Header */}
        <Stack
          direction="row"
          spacing={2}
          sx={{
            p: 2,
            bgcolor: "background.primary",
            borderBottom: "1px solid #e0e0e0",
            alignItems: "center",
          }}
        >
          <IconButton onClick={gotoLink} sx={{ color: "#1976d2" }}>
            {/* <ArrowBackIcon /> */}
          </IconButton>

          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              component="img"
              src={image}
              alt="Customer Avatar"
              sx={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                border: "2px solid #e0e0e0",
                objectFit: "cover",
              }}
            />
            <Typography variant="h5" fontWeight={600}>
              {dataKhachHangById.tenKhachHang}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1.5} sx={{ ml: "auto" }}>
             <CustomButtonAction
                menuId={menuId}
                typeButton={1}
                type={"sua"}
                icon ={<LocalPhoneIcon/>}
                styleText={"gọi điện thoại"}
                nameButton={"Gọi điện thoại"}
                colorStyle={"success"}
              />
            
              <CustomButtonAction
                menuId={menuId}
                typeButton={1}
                type={"sua"}
                action={handleOpenModalGuiMail}
                icon ={<LocalPostOfficeIcon/>}
                styleText={"gửi mail"}
                nameButton={"Gửi mail"}
                colorStyle={"primary"}
              />
              <CustomButtonAction
                menuId={menuId}
                typeButton={1}
                type={"sua"}
                icon ={<TextsmsIcon/>}
                styleText={"tin nhắn"}
                nameButton={"Tin nhắn"}
                colorStyle={"error"}
              />
            <Button
              id="expand-button"
              variant="outlined"
              // startIcon={<OpenInNewIcon />}
              // endIcon={<KeyboardArrowDownIcon />}
              onClick={handleClick}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                px: 2.5,
                borderColor: "#e0e0e0",
                color: "#424242",
              }}
            >
              Mở rộng
            </Button>
          </Stack>
        </Stack>

        {/* Dropdown Menu */}
        <Menu
          id="expand-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseDrop}
          PaperProps={{
            elevation: 3,
            sx: { mt: 1, borderRadius: 2, minWidth: 220 },
          }}
        >
         {dataKhachHangById.isChuyenDoi === false && (
          <MenuItem  >
             <CustomButtonAction
                menuId={menuId}
                typeButton={2}
                type={"sua"}
                action={handleOpenModalConvert}
                icon ={ <SyncAlt sx={{ mr: 1, color: "#0288d1" }} />}
                styleText={"Chuyển đổi khách hàng"}
                nameButton={"Chuyển đổi khách hàng"}
                colorStyle={""}
              />
          </MenuItem>
        )}
          <MenuItem >
        
          <CustomButtonAction
                menuId={menuId}
                typeButton={2}
                type={"sua"}
                action={handleOpenModalEdit}
                icon ={ <Edit sx={{ mr: 1, color: "#0288d1" }} />}
                styleText={"Chỉnh sửa khách hàng"}
                nameButton={"Chỉnh sửa khách hàng"}
                colorStyle={""}
              />
        </MenuItem>
        </Menu>

        {/* Main Content */}
        <Grid2 container spacing={3} sx={{ p: 3 }}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Typography variant="body1" color="text.secondary">
              Email: <strong>{dataKhachHangById.emailCaNhan}</strong>
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Typography variant="body1" color="text.secondary">
              Số điện thoại:{" "}
              <strong>{dataKhachHangById.soDienThoaiDiDong}</strong>
            </Typography>
          </Grid2>

          <Grid2 size={12}>
            <Box sx={{ width: "100%" }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  bgcolor: "background.primary",
                  borderRadius: 2,
                  boxShadow: 2,
                  mb: 2,
                  "& .MuiTab-root": {
                    textTransform: "none",
                    fontSize: "1rem",
                    px: 3,
                  },
                  "& .Mui-selected": { color: "#1976d2", fontWeight: 600 },
                }}
                TabIndicatorProps={{ sx: { bgcolor: "#1976d2" } }}
              >
                <Tab label="Thông tin chi tiết" value="1" />
                <Tab label="Người đại diện" value="2" />
                <Tab label="Hàng hóa quan tâm" value="3" />
                <Tab label="Email" value="4" />
                <Tab label="Công việc đang thực hiện" value="5" />
                <Tab label="SMS" value="6" />
              </Tabs>

              {tabValue === "1" && <ThongTInChiTietTab menuId={menuId} />}
              {tabValue === "2" && <NguoiDaiDienTab menuId={menuId} />}
              {tabValue === "3" && <HangHoaQuanTamTab menuId={menuId} />}
              {tabValue === "4" && <EmailTab menuId={menuId} />}
              {tabValue === "5" && <CongViecThucHienTab menuId={menuId} />}
              {tabValue === "6" && <SMStab menuId={menuId} />}
            </Box>
          </Grid2>
        </Grid2>
      </Paper>

      {/* Modals */}
      <ModalConvertKhachHangTiemNang
        selectedItem={dataKhachHangById}
        showModal={modalConvert}
        closeModal={handleCloseModalConvert}
      />
      <ModalEditKhachHangTiemNang
        selectedItem={dataKhachHangById}
        showModal={modalEdit}
        closeModal={handleCloseModalEdit}
      />
      <ModalGuiMail
        showModal={modalGuiMail}
        closeModal={handleCloseModalGuiMail}
      />
    </Grid2>
  );
};

export default KhachHangTiemNangDetail;