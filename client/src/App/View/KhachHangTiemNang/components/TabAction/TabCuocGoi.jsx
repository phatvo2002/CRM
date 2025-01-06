import React, { useState } from "react";
import { useGetCuocGoiByKhachHangTiemNangIdQuery } from "src/App/Api/CuocGoiApi";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import { Typography, Box, Avatar } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
const TabCuocGoi = ({ selectedItem }) => {
  const [selectedCard, setSelectedCard] = useState(0);
  const { data: getcuocGoiData } = useGetCuocGoiByKhachHangTiemNangIdQuery(
    selectedItem[0]?.id
  );
  return (
    <div>
      {Array.isArray(getcuocGoiData) && getcuocGoiData.length > 0 ? (
        getcuocGoiData.map((item, index) => (
          <Card
            key={index}
            sx={{
              width: 300,
              border:
                selectedCard === index ? "2px solid #1976d2" : "1px solid #ddd",
              borderRadius: 2,
            }}
          >
            <CardActionArea onClick={() => setSelectedCard(index)}>
              <CardContent
                sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}
              >
                {/* Icon */}
                <Avatar sx={{ bgcolor: "#1976d2" }}>
                  <CallIcon />
                </Avatar>

                {/* Nội dung */}
                <Box>
                  <Typography variant="body1" fontWeight="bold">
                    Cuộc gọi - {item.tieuDe}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ marginY: 1 }}
                  >
                    {item?.khachHangTiemNang?.soDienThoaiDiDong} - {item.moTa}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.primary"
                    fontWeight="bold"
                  >
                    {item.contactPerson}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item?.ngayBatDau}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item?.isHoanThanh == true ? (
                      <div>
                        <Typography variant="body2" color="success">
                          <b>Đã hoàn thành</b>
                        </Typography>
                      </div>
                    ) : (
                      <div>
                        <Typography variant="body2" color="error">
                          <b>Chưa hoàn thành</b>
                        </Typography>
                      </div>
                    )}
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        ))
      ) : (
        <Typography variant="body2" color="text.secondary">
           Không có cuộc gọi nào gần đây
        </Typography>
      )}
    </div>
  );
};

export default TabCuocGoi;
