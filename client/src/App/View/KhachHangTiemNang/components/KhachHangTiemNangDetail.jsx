import {
  AppBar,
  Button,
  Grid2,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Tabs,
} from "@mui/material";
import React, { useState } from "react";
import image from "../../../Assets/image/person.png";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useParams } from "react-router-dom";
import { useGetKhachHangTiemNangByIdQuery } from "src/App/Api/KhachHangTiemNangApi";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import TextsmsIcon from "@mui/icons-material/Textsms";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ThongTInChiTietTab from "./Tab/ThongTInChiTietTab";
import NguoiDaiDienTab from "./Tab/NguoiDaiDienTab";
import HangHoaQuanTamTab from "./Tab/HangHoaQuanTamTab";
import CongViecThucHienTab from "./Tab/CongViecThucHienTab";
import ModalConvertKhachHangTiemNang from "./ModalConvertKhachHangTiemNang";
import { ModalGuiMail } from "../Modal/ModalGuiMail";
import EmailTab from "./Tab/EmailTab";
import SMStab from "./Tab/SMStab";
import ModalEditKhachHangTiemNang from "../ModalEditKhachHangTiemNang";
const KhachHangTiemNangDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: dataKhachHangById, isLoading } =
    useGetKhachHangTiemNangByIdQuery(id);
  const [modalConvert, setOpenModalConvert] = useState(false);
  const [modalGuiMail, setModalGuiMail] = useState(false);
  const [modalEdit, setOpenModalEdit] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const gotoLink = () => {
    navigate(-1);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseDrop = () => {
    setAnchorEl(null);
  };
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleOpenModalConvert = () => {
    setOpenModalConvert(true);
  };
  const handleOpenModalEdit = () => {
    setOpenModalEdit(true);
  };
  const handleCloseModalConvert = () => {
    setOpenModalConvert(false);
  };
  const handleCloseModalEdit = () => {
    setOpenModalEdit(false);
  };
  const handleOpenModalGuiMail = () => {
    setModalGuiMail(true);
  };
  const handleCloseModalGuiMail = () => {
    setModalGuiMail(false);
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!dataKhachHangById) {
    return <div>Không tìm thấy dữ liệu</div>;
  }
  return (
    <>
      <Grid2 container spacing={2}>
        <Paper style={{ height: "100%", width: "100%" }}>
          <Stack direction="row" spacing={2} style={{ padding: 10 }}>
            <IconButton onClick={gotoLink}>
              <ArrowBackIcon />
            </IconButton>
            <Grid2
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              size={4}
            >
              <img
                src={image}
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                }}
              ></img>
              <span
                style={{
                  marginLeft: "16px",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "1.2rem",
                }}
              >
                {dataKhachHangById?.tenKhachHang}
              </span>
            </Grid2>
            <Grid2
              style={{
                marginLeft: "auto",
                gap: "8px",
                marginTop: 20,
              }}
              size={8}
            >
              <Button
                variant="contained"
                style={{ margin: 5 }}
                endIcon={<LocalPhoneIcon />}
              >
                Gọi Điện thoại
              </Button>
              <Button
                variant="contained"
                style={{ margin: 5 }}
                endIcon={<MarkunreadIcon />}
                onClick={handleOpenModalGuiMail}
              >
                Gửi mail
              </Button>
              <Button
                variant="contained"
                style={{ margin: 5 }}
                endIcon={<TextsmsIcon />}
              >
                Gửi SMS
              </Button>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={{ marginLeft: 1, width: "200px" }}
                variant="outlined"
                startIcon={<OpenInNewIcon />}
                endIcon={<KeyboardArrowDownIcon />}
              >
                Mở rộng
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseDrop}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleCloseDrop}>
                  {dataKhachHangById?.isChuyenDoi == true && (
                    <Button
                      variant="contained"
                      style={{ margin: 2, width: 200 }}
                      onClick={handleOpenModalConvert}
                    >
                      Chuyển đổi khách hàng
                    </Button>
                  )}
                </MenuItem>
                <MenuItem>
                  <Button
                    variant="contained"
                    style={{ margin: 2, width: 200 }}
                    onClick={handleOpenModalEdit}
                  >
                    Chỉnh sửa khách hàng
                  </Button>
                </MenuItem>
              </Menu>
            </Grid2>
          </Stack>
          <Grid2
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            padding={2}
          >
            <Grid2 size={6}>Email : {dataKhachHangById?.emailCaNhan}</Grid2>
            <Grid2 size={6}>
              Số điện thoại : {dataKhachHangById?.soDienThoaiDiDong}
            </Grid2>
            <Grid2 size={12}>
              <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                  <Box
                    sx={{
                      border: 0,
                      borderColor: "Highlight",
                      fontFamily: "inherit",
                      boxShadow: 3,
                    }}
                  >
                    <TabList onChange={handleChange} aria-label="lab">
                      <Tab label="Thông tin chi tiết" value="1" />
                      <Tab label="Người đại diện" value="2" />
                      <Tab label="Hàng hóa quan tâm" value="3" />
                      <Tab label="Email" value="4" />
                      <Tab label="Công việc đang thực hiện" value="5" />
                      <Tab label="SMS" value="6" />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    <ThongTInChiTietTab />
                  </TabPanel>
                  <TabPanel value="2">
                    <NguoiDaiDienTab />
                  </TabPanel>
                  <TabPanel value="3">
                    <HangHoaQuanTamTab />
                  </TabPanel>
                  <TabPanel value="4">
                    <EmailTab />
                  </TabPanel>
                  <TabPanel value="5">
                    <CongViecThucHienTab />
                  </TabPanel>
                  <TabPanel value="6">
                    <SMStab />
                  </TabPanel>
                </TabContext>
              </Box>
            </Grid2>
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
          </Grid2>
        </Paper>
      </Grid2>
      {/* Modal Gửi mail  */}
      <ModalGuiMail
        showModal={modalGuiMail}
        closeModal={handleCloseModalGuiMail}
      />
    </>
  );
};

export default KhachHangTiemNangDetail;
