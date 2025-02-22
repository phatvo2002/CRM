import { Button, Grid2, Menu, MenuItem, Paper, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import AutoDeleteIcon from "@mui/icons-material/AutoDelete";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import WidgetsIcon from "@mui/icons-material/Widgets";
import { TabBieuDoCoHoi } from "./Pages/Tabs/TabBieuDoCoHoi";
import { TabListCoHoi } from "./Pages/Tabs/TabListCoHoi";
import ModalThemMoiCoHoi from "./Modal/ModalThemMoiCoHoi";
import { useGetCoHoiListQuery } from "src/App/Api/CoHoiApi";
import EditIcon from "@mui/icons-material/Edit";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
const index = () => {
  const [value, setValue] = useState("1");
  const [anchorEl, setAnchorEl] = useState(null);
  const { data: dataCoHoi, refetch } = useGetCoHoiListQuery();
  const [modalThemMoi, setModalThemMoi] = useState(false);
  const handleOpenModalThemMoiCoHoi = () => setModalThemMoi(true);
  const handleCloseModalThemMoiCoHoi = () => setModalThemMoi(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseDrop = () => {
    setAnchorEl(null);
  };
  return (
    <>
     <Grid2 container spacing={2} alignItems="center">
      {/* Tiêu đề */}
      <Grid2 xs={12} md={8}>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1976d2" }}>
          📋 Tất cả cơ hội
        </Typography>
      </Grid2>

      {/* Các nút chức năng */}
      <Grid2 xs={12} md={4} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenModalThemMoiCoHoi}
          sx={{ borderRadius: 2, textTransform: "none", boxShadow: 2, mr: 1 }}
        >
          Thêm mới
        </Button>

        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          variant="outlined"
          startIcon={<OpenInNewIcon />}
          sx={{ borderRadius: 2, textTransform: "none", width: 150 }}
        >
          Mở rộng
        </Button>

        {/* Dropdown Menu */}
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseDrop}
          MenuListProps={{ "aria-labelledby": "basic-button" }}
          sx={{ mt: 1 }}
        >
          <MenuItem onClick={handleCloseDrop}>
            <Button
              variant="outlined"
              sx={{ width: "100%", justifyContent: "flex-start" }}
              startIcon={<AutoDeleteIcon />}
              color="error"
            >
              Xóa hàng loạt
            </Button>
          </MenuItem>
          <MenuItem onClick={handleCloseDrop}>
            <Button
              variant="outlined"
              sx={{ width: "100%", justifyContent: "flex-start" }}
              startIcon={<DeleteOutlineIcon />}
              color="primary"
            >
              Thùng rác
            </Button>
          </MenuItem>
        </Menu>
      </Grid2>

      {/* Nội dung chính */}
      <Grid2 xs={12}>
        <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange} aria-label="Chuyển tab">
                <Tab icon={<FactCheckIcon />} label="Danh sách" value="1" />
                <Tab icon={<WidgetsIcon />} label="Mở rộng" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <TabListCoHoi dataCoHoi={dataCoHoi} refetch={refetch} />
            </TabPanel>
            <TabPanel value="2">
              <TabBieuDoCoHoi />
            </TabPanel>
          </TabContext>
        </Paper>
      </Grid2>
    </Grid2>
      {/* Modal thêm mới */}
      <ModalThemMoiCoHoi
        showModal={modalThemMoi}
        closeModal={handleCloseModalThemMoiCoHoi}
        refetch={refetch}
      />
    </>
  );
};

export default index;
