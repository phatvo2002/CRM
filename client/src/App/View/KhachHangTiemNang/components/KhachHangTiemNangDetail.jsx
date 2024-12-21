import { AppBar, Button, Grid2, IconButton, Stack, Tabs } from "@mui/material";
import React, { useState } from "react";
import image from "../../../Assets/image/person.png";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useParams } from "react-router-dom";
import { useGetKhachHangTiemNangByIdQuery } from "App/Api/KhachHangTiemNangApi";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ThongTInChiTietTab from "./Tab/ThongTInChiTietTab";
import NguoiDaiDienTab from "./Tab/NguoiDaiDienTab";
import HangHoaQuanTamTab from "./Tab/HangHoaQuanTamTab";
import CongViecThucHienTab from "./Tab/CongViecThucHienTab";
import EmailTab from "./Tab/EmailTab";
import SMStab from "./Tab/SMStab";
const KhachHangTiemNangDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: dataKhachHangById, isLoading } =
    useGetKhachHangTiemNangByIdQuery(id);

  const gotoLink = () => {
    navigate(-1);
  };

  const [value, setValue] = useState(1);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!dataKhachHangById) {
    return <div>Không tìm thấy dữ liệu</div>;
  }
  return (
    <>
      <Stack direction="row" spacing={2}>
        <IconButton onClick={gotoLink}>
          <ArrowBackIcon />
        </IconButton>
        <Grid2
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
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
          }}
        >
          <Button variant="outlined" style={{ margin: 10 }}>
            Chuyển đổi khách hàng
          </Button>
          <Button variant="outlined" color="success">
            Bàn giao khách hàng
          </Button>
        </Grid2>
      </Stack>
      <Grid2 container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid2 size={6}>Email : {dataKhachHangById?.emailCaNhan}</Grid2>
        <Grid2 size={6}>
          Số điện thoại : {dataKhachHangById?.soDienThoaiDiDong}
        </Grid2>
        <Grid2 size={12}>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box
                sx={{ border: 0, borderColor: "Highlight", fontFamily: "inherit" , boxShadow:3}}
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
      </Grid2>
    </>
  );
};

export default KhachHangTiemNangDetail;
