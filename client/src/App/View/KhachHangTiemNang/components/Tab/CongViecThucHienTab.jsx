import { Button, Grid2 } from '@mui/material'
import React, { useState } from 'react'
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import TodayIcon from '@mui/icons-material/Today';
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
const CongViecThucHienTab = () => {
   const [value, setValue] = useState(1);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  return (
    <>
     <Grid2 container spacing={2}>
         <Grid2 size={12}>
         <Button
              variant="outlined"
              color="success"
             startIcon={<PermPhoneMsgIcon/>}
            >
              Thêm Cuộc gọi
            </Button>
            <Button
              variant="outlined"
              color="error"
              sx={{ marginLeft: 1 }}
              startIcon={<PermContactCalendarIcon/>}
            >
              Thêm nhiệm vụ
            </Button>
            <Button
              variant="outlined"
              sx={{ marginLeft: 1 }}
              startIcon={<TodayIcon/>}
            >
              Thêm lịch hẹn
            </Button>
         </Grid2>
         <Grid2 size={12}>
         <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" , fontFamily:"inherit"}}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab"
                >
                  <Tab label="Cuộc gọi" value="1" />
                  <Tab label="Nhiệm vụ" value="2" />
                  <Tab label="Lịch hẹn" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">Cuộc gọi</TabPanel>
              <TabPanel value="2"></TabPanel>
              <TabPanel value="3"></TabPanel>
            </TabContext>
          </Box>
         </Grid2>
     </Grid2>
    </>
  )
}

export default CongViecThucHienTab