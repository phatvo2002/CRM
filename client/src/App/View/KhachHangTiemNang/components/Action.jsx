import React, { useState } from "react";
import "../khachhangtiemnang.css"; // CSS riêng cho component
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { Tabs, Typography } from "@mui/material";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TaskIcon from '@mui/icons-material/Task';
import EmailIcon from '@mui/icons-material/Email';
import SmsIcon from '@mui/icons-material/Sms';
export const ActionComponents = () => {
    const [activeTab, setActiveTab] = useState(0);

    // Xử lý thay đổi tab
    const handleTabChange = (event, newValue) => {
      setActiveTab(newValue);
    };
  return (
    <div className="transaction-history">
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
          <Typography variant="body1" className="tab-panel">
            Cuộc gọi đã thực hiện 
          </Typography>
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
    </div>
  );
};


