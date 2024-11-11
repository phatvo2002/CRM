import React from "react";
import { Grid } from "@mui/material";
import { Tabs, Tab, Box, Typography } from '@mui/material';
import Paper from "@mui/material/Paper";
import TinhHinhKinhDoanh from "./TabComponent/TinhHinhKinhDoanh";
import ViecCanlam from "./TabComponent/ViecCanlam";
import KhachHang360 from "./TabComponent/KhachHang360";
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import WorkIcon from '@mui/icons-material/Work';
const BanLamViec = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
  
          }}
        >
           <Box
      sx={{
        display: 'flex',
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable" 
        value={value}
        onChange={handleChange}
        sx={{ borderRight: 1, borderColor: 'divider' , width: 100}}
      >
        <Tab icon={<CorporateFareIcon style={{fontSize:"2rem"}}/>} sx={{ alignItems: 'flex-start'  }} />
        <Tab icon={<WorkIcon style={{fontSize:"2rem"}}/> } sx={{ alignItems: 'flex-start' }}/>
        <Tab icon={<SupportAgentIcon  style={{fontSize:"2rem"}}/>} sx={{ alignItems: 'flex-start' }}/>
      </Tabs>

      <Box sx={{ p: 3 }}>
        {value === 0 && <TinhHinhKinhDoanh/>}
        {value === 1 && <ViecCanlam/>}
        {value === 2 && <KhachHang360/>}
      </Box>
    </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default BanLamViec;
