import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Grid,
  Divider,
  Grid2,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGetAllThongBaoQuery } from "src/App/Api/ThongBaoApi";
import CustomDatagrid from "../DataGrid/CustomDatagrid";

const notifications = [
  {
    title: "Thông báo về việc xóa đăng ký học phần HK2 2024-2025",
    date: "07/01/2025",
    tag: "New",
  },
  {
    title: "Thông báo về việc đóng học phí HK2 2024-2025",
    date: "09/12/2024",
    tag: "Hot",
  },
  {
    title:
      "Thông báo về việc đăng ký lớp học ngoại ngữ sơ cấp tại Trung tâm Ngoại ngữ - Tin học",
    date: "05/12/2024",
  },
  {
    title: "Thông báo đăng ký học phần HK2 2024-2025",
    date: "19/11/2024",
    tag: "Hot",
  },
];

const NotificationList = () => {
  const { data: dataNoti } = useGetAllThongBaoQuery();
  return (
    <div style={{ padding: "20px" }}>
      <Typography
        style={{
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
        variant="h5"
        gutterBottom
      >
        Thông báo - Nhắc nhở
      </Typography>
      <Divider style={{ marginBottom: "20px" }} />
      <Grid container spacing={2}>
        {dataNoti?.length > 0 ? (
          dataNoti.map((noti) => (
            <Grid item xs={12} key={noti.id}>
              <Card>
                <CardContent>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      style={{
                        fontWeight: "bold",
                      }}
                      variant="h6"
                    >
                      {noti.tieuDe}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      style={{ marginLeft: "20px", whiteSpace: "nowrap" }}
                    >
                      {new Date(noti.createAt).toLocaleDateString("vi-VN")}
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      style={{ marginTop: "10px" }}
                    >
                      {noti.noiDung}
                    </Typography>
                    <DeleteIcon
                      fontSize="large"
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <div style={{ textAlign: "center", padding: "20px", color: "#888" }}>
            Không có thông báo
          </div>
        )}
      </Grid>
    </div>
  );
};

export default NotificationList;
