import {
  Popover,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  List,
  Button,
  Typography,
  Tooltip,
  Icon,
  Box,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import IconButton from "@mui/material/IconButton";
import { vi } from "date-fns/locale";
import { formatDistanceToNow } from "date-fns";
import { Link as BrowserRowter } from "react-router-dom";
import Badge from "@mui/material/Badge";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import { useEffect } from "react";
import * as signalR from '@microsoft/signalr';
import {
  useCheckDocThongBaoMutation,
  useCheckThongBaoMutation,
  useGetThongBaoByNguoiDungIdQuery,
  useGetThongBaoNotReadByNguoiDungIdQuery,
} from "src/App/Api/ThongBaoApi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
export const CustomNotification = ({
  openNoti,
  handleOpenNoti,
  handleClose,
  intitialNoti,
}) => {
  const { data: dataNoti, refetch } = useGetThongBaoByNguoiDungIdQuery();
  const { data: dataNotiNotRead ,refetch: refetchCheck } = useGetThongBaoNotReadByNguoiDungIdQuery();
  const [checkXemThonBao] = useCheckDocThongBaoMutation()
  const [CheckDeadline, { data, error }] = useCheckThongBaoMutation();


 const connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5020/notificationHub", {
      accessTokenFactory: () => localStorage.getItem("token")
    })
    .withAutomaticReconnect()
    .build();
    
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     CheckDeadline()
  //       .then((response) => {
  //         window.location.reload();
  //         toast.info("Bạn có 1 thông báo mới chưa đọc !")
  //       })
  //       .catch((err) => {
  //         console.error("Error checking deadlines:", err); ``
  //       });
  //   }, 600000);
  //   return () => clearInterval(interval);
  // }, [CheckDeadline]);

  const handleCheckXemThongBao = async (id) => {
    await checkXemThonBao()
    refetch()
  }
 

  useEffect(() => {
    connection.start()
      .then(() => {
        connection.off("ReceiveNotification");
        connection.on("ReceiveNotification", (message) => {
          toast(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          refetchCheck()
        });
      })
      .catch(err => console.error("SignalR Connection Error:", err));
  }, []);
  return (
    <>
      <IconButton color="primary" onClick={handleOpenNoti}>
        {dataNotiNotRead?.length > 0 ? (
          <Badge badgeContent={dataNotiNotRead?.length} color="primary">
            <NotificationsIcon />
          </Badge>
        ) : (
          <Badge badgeContent="0" color="primary">
            <NotificationsIcon />
          </Badge>
        )}
      </IconButton>
      <Popover
        open={intitialNoti}
        anchorEl={openNoti}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <List sx={{ width: "400px", maxHeight: "500px", overflow: "auto" }}>
          {dataNoti?.length > 0 ? (
            dataNoti.map((noti) => (
              <div key={noti.id}>
                <ListItem button>
                  <ListItemIcon>
                    {noti.type === "Success" && (
                      <CheckCircleIcon color="success" />
                    )}
                    {noti.type === "Error" && <ErrorIcon color="error" />}
                    {noti.type === "new" && (
                      <NotificationsIcon color="primary" />
                    )}
                    {noti.type === "Warning" && (
                      <NotificationImportantIcon color="warning" />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center">
                        <BrowserRowter to={noti.duongDan} style={{ textDecoration: "none", color: "text.primary" }} onClick={() => handleCheckXemThongBao(noti?.id)}>
                          {noti.tieuDe}
                        </BrowserRowter>
                        {!noti.isRead && (
                          <Tooltip title="Chưa đọc">
                            <Icon sx={{ color: "#2196f3", marginRight: "8px" }}>
                              fiber_manual_record
                            </Icon>
                          </Tooltip>
                        )}
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="text.primary">
                          {noti.noiDung}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatDistanceToNow(new Date(noti.createAt), {
                            addSuffix: true,
                            locale: vi,
                          })}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                <Divider />
              </div>
            ))
          ) : (
            <div
              style={{ textAlign: "center", padding: "20px", color: "#888" }}
            >
              Không có thông báo
            </div>
          )}

          {dataNoti?.length > 0 && (
            <Link to={`/thongbao`} style={{ textDecoration: "none" }}>
              <Button style={{ alignItems: "center", padding: 10 }}>
                Xem tất cả
              </Button>
            </Link>
          )}
        </List>
      </Popover>
    </>
  );
};
