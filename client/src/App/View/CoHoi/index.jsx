import { Button, Grid2, Menu, MenuItem, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import ContactPageIcon from '@mui/icons-material/ContactPage';
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import AutoDeleteIcon from "@mui/icons-material/AutoDelete";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import WidgetsIcon from '@mui/icons-material/Widgets';
import {TabBieuDoCoHoi} from "./Pages/Tabs/TabBieuDoCoHoi";
import {TabListCoHoi} from "./Pages/Tabs/TabListCoHoi";
import ModalThemMoiCoHoi from "./Modal/ModalThemMoiCoHoi";
import { useGetCoHoiListQuery } from "src/App/Api/CoHoiApi";
import EditIcon from "@mui/icons-material/Edit";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
const index = () => {
  const [value, setValue] = useState("1");
  const [anchorEl, setAnchorEl] = useState(null);
  const { data: dataCoHoi , refetch } = useGetCoHoiListQuery()
   const [modalThemMoi,setModalThemMoi] = useState(false);
  const handleOpenModalThemMoiCoHoi = ()=> setModalThemMoi(true)
  const handleCloseModalThemMoiCoHoi = () => setModalThemMoi(false)
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
      <Grid2 container spacing={2}>
        <Grid2 size={8}>
          <h3 style={{ padding: 0, margin: 0 }}>Tất cả cơ hội</h3>
        </Grid2>
        <Grid2 size={4}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenModalThemMoiCoHoi}>
            Thêm mới{" "}
          </Button>
    

          {/* dropdown update */}
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{ marginLeft: 1, width: "150px" }}
            variant="outlined"
            startIcon={<OpenInNewIcon />}
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
              <Button
                variant="outlined"
                sx={{ marginLeft: 1, width: "200px" }}
                startIcon={<AutoDeleteIcon />}
                color="primary"
              >
                Xóa hàng loạt
              </Button>
            </MenuItem>
            <MenuItem onClick={handleCloseDrop}>
              <Button
                variant="outlined"
                color="primary"
                sx={{ marginLeft: 1, width: "200px" }}
                startIcon={<DeleteOutlineIcon />}
              >
                Thùng rác
              </Button>
            </MenuItem>
          </Menu>

        
        </Grid2>
        <Grid2 size={12}>
          <Paper style={{maxWidth:"100%"}}>
            <TabContext value={value} >
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label=""
                >
                  <Tab icon={<FactCheckIcon />} label="Danh sách" value="1" />
                  <Tab icon={<WidgetsIcon />} label="Mở rộng" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1" ><TabListCoHoi dataCoHoi={dataCoHoi} refetch={refetch}/> 
              </TabPanel>
              <TabPanel value="2"><TabBieuDoCoHoi/></TabPanel>
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
