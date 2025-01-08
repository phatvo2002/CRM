import React, { useState } from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import { Typography, Box, Avatar } from "@mui/material";
import { useGetLichHenByKhachHangTiemNangIdQuery } from "src/App/Api/LichhenApi";
import Moment from "react-moment";
const TabLichHen = ({ selectedItem }) => {
  const [selectedCard, setSelectedCard] = useState(0);
  const { data: getLichHenData } = useGetLichHenByKhachHangTiemNangIdQuery(
    selectedItem[0]?.id ,{skip : selectedItem[0]?.id == null || undefined}
  );
  
  return (
    <div>
      {Array.isArray(getLichHenData) && getLichHenData.length > 0 ? (
        getLichHenData.map((item, index) => (
          <Card
            key={index}
            sx={{
              width: 300,
              border:
                selectedCard === index ? "2px solid rgb(230, 199, 28)" : "1px solid #ddd",
              borderRadius: 2,
            }}
          >
            <CardActionArea onClick={() => setSelectedCard(index)}>
              <CardContent
                sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}
              >
                {/* Icon */}
                <Avatar sx={{ bgcolor: "#1976d2" }}>
                  <CalendarMonthIcon />
                </Avatar>

                {/* Nội dung */}
                <Box>
                  <Typography variant="body1" fontWeight="bold">
                    Lịch hẹn - {item.tieuDe}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ marginY: 1 }}
                  >
                    {item.moTa}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.primary"
                    fontWeight="bold"
                  >
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  <Moment format="DD/MM/YYYY HH:mm">{new Date(item?.createAt)}</Moment>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <div>
                      {item?.trangThaiThucHien?.name === "Chưa thực hiện " ? (
                        <Typography variant="body2" color="error">
                          <b>Chưa thực hiện</b>
                        </Typography>
                      ) : item?.trangThaiThucHien?.name === "Đang thực hiện" ? (
                        <Typography variant="body2" color="warning">
                          <b>Đang tiến hành</b>
                        </Typography>
                      ) : (
                        <Typography variant="body2" color="success">
                          <b>Hoàn thành</b>
                        </Typography>
                      )}
                    </div>

                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        ))
      ) : (
        <Typography variant="body2" color="text.secondary">
          Không có lịch hẹn nào gần đây
        </Typography>
      )}
    </div>
  );
};

export default TabLichHen;
