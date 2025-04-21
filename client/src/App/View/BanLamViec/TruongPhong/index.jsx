import {
  Autocomplete,
  Box,
  Grid2,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import CallIcon from "@mui/icons-material/Call";
import TodayIcon from "@mui/icons-material/Today";
import ErrorIcon from "@mui/icons-material/Error";
const BanLamViecTrPhong = () => {
  const statistics = [
    {
      title: "Tổng số lịch hẹn",
      value: 2,
      description: "Tổng số lịch hẹn",
      icon: <InfoIcon fontSize="large" />,
      color: "#00bcd4",
    },
    {
      title: "Lịch hẹn chưa thực hiện",
      value: 2,
      description: "Tổng số lịch hẹn chưa thực hiện",
      icon: <CallIcon fontSize="large" />,
      color: "#f44336",
    },
    {
      title: "Lịch hẹn trong ngày",
      value: 0,
      description: "Tổng số lịch hẹn trong ngày",
      icon: <TodayIcon fontSize="large" />,
      color: "#4caf50",
    },
    {
      title: "Lịch hẹn chưa TH trong ngày",
      value: 0,
      description: "Tổng số lịch hẹn chưa thực hiện trong ngày",
      icon: <ErrorIcon fontSize="large" />,
      color: "#ff5722",
    },
  ];

  const StatisticCard = ({ title, value, description, icon, color }) => (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        alignItems: "center",
        p: 2,
        borderLeft: `8px solid ${color}`,
        backgroundColor: "#f9f9f9",
      }}
    >
      <Box sx={{ mr: 2, color }}>{icon}</Box>
      <Box>
        <Typography variant="subtitle2" fontWeight="bold" color={color}>
          {title}
        </Typography>
        <Typography variant="h5" fontWeight="bold">
          {value}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </Box>
    </Paper>
  );
  return (
    <>
      <Paper>
        <Grid2 container spacing={2}>
          <Grid2 size={12}>
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              Bảng Điều Khiển CRM - Trưởng Phòng
            </Typography>{" "}
          </Grid2>
          {statistics.map((item, index) => (
            <Grid2 item xs={4} sm={6} md={3} key={index}>
              <StatisticCard {...item} />
            </Grid2>
          ))}
        </Grid2>
      </Paper>
    </>
  );
};

export default BanLamViecTrPhong;
