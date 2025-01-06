import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { CardActionArea, Tabs, Typography, useTheme } from "@mui/material";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TaskIcon from '@mui/icons-material/Task';
import EmailIcon from '@mui/icons-material/Email';
import SmsIcon from '@mui/icons-material/Sms';
import { useGetCuocGoiByKhachHangTiemNangIdQuery } from "src/App/Api/CuocGoiApi";
import TabCuocGoi from "./TabAction/TabCuocGoi";
export const ActionComponents = ({selectedItem}) => {
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
      width: "300px",
      height: "100%",
      backgroundColor: theme.palette.background.default, // Sử dụng theme
      color: theme.palette.text.primary, // Đồng bộ màu chữ
      boxShadow: "-2px 0 5px rgba(0, 0, 0, 0.1)",
      padding: "16px",
      overflowY: "auto",
      zIndex: 1000,
    }}>
      <h3>Lịch sử giao dịch</h3>
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
          <Typography variant="body1" className="tab-panel">
            Lịch hẹn đã lên lịch
          </Typography>
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


