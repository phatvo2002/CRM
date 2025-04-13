import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { Button, Tabs, Typography, useTheme } from "@mui/material";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TaskIcon from '@mui/icons-material/Task';
import EmailIcon from '@mui/icons-material/Email';
import SmsIcon from '@mui/icons-material/Sms';
import TabCuocGoi from "./TabAction/TabCuocGoi";
import TabLichHen from "./TabAction/TabLichHen";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
export const ActionComponents = ({selectedItem , isOpen,onClose}) => {
    const [activeTab, setActiveTab] = useState(0);
    const [selectedCard, setSelectedCard] = useState(0);
    // Xử lý thay đổi tab
    const handleTabChange = (event, newValue) => {
      setActiveTab(newValue);
    };
    const theme = useTheme();
   
    return (
    <Box sx={{
      position: "fixed",
      top: 0,
      right: 0,
      width: "350px",
      height: "100%",
      backgroundColor: theme.palette.background.default, 
      color: theme.palette.text.primary, 
      boxShadow: "-2px 0 5px rgba(0, 0, 0, 0.1)",
      padding: "20px",
      overflowY: "auto",
      zIndex: 1000,
    }}>
      <h3 style={{marginTop:60}}>
      <Button onClick={onClose}   className={`action-component ${isOpen ? "open" : "close"}`} >
        <ArrowBackIcon  sx={{ fontSize:"2rem"}}/>
        <h4 style={{paddingLeft:10, margin:0}}>Hoạt động tương tác</h4>
      </Button>
      
      </h3>
      
      {/* Tabs */}
      <Tabs value={activeTab} onChange={handleTabChange} variant="scrollable">
        <Tab icon={<LocalPhoneIcon/>} />
        <Tab icon={<CalendarMonthIcon/>} />
        <Tab icon={<TaskIcon/>} />
        <Tab icon={<EmailIcon/>} />
        <Tab icon={<SmsIcon/>} />
      </Tabs>
      
      {/* Nội dung của các tab */}
      
      <Box className="tab-content">
        
        {activeTab === 0 && (
           <TabCuocGoi selectedItem={selectedItem}/>
        )}
        {activeTab === 1 && (
          <TabLichHen selectedItem={selectedItem}/>
        )}
        {activeTab === 2 && (
          <Typography variant="body1" className="tab-panel">
            Nhiệm vụ
          </Typography>
        )}
         {activeTab === 3 && (
          <Typography variant="body1" className="tab-panel">
            Email đã gửi
          </Typography>
        )}
          {activeTab === 4 && (
          <Typography variant="body1" className="tab-panel">
            Tin nhắn đã gửi
          </Typography>
        )}
      </Box>
    </Box>
  );
};


