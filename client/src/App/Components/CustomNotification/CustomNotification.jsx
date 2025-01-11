import { Popover, ListItem, ListItemText, ListItemIcon, Divider, List, Button } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import { useEffect, useState } from "react";
import { useCheckThongBaoMutation, useGetThongBaoByNguoiDungIdQuery } from "src/App/Api/ThongBaoApi";
export const CustomNotification = ({ openNoti, handleOpenNoti, handleClose, intitialNoti }) => {
 
    const {data: dataNoti} = useGetThongBaoByNguoiDungIdQuery()
    const [CheckDeadline, { data, error }] = useCheckThongBaoMutation();
    useEffect(() => {
        const interval = setInterval(() => {
            CheckDeadline()
            .then((response) => {
              console.log('Checked deadlines:', response.data);
            })
            .catch((err) => {
              console.error('Error checking deadlines:', err);
            });
        }, 600000);
        return () => clearInterval(interval);
      }, [CheckDeadline])
    return (
        <>
            <IconButton color="primary" onClick={handleOpenNoti}>
                <Badge badgeContent={dataNoti.length} color="primary">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <Popover
                open={intitialNoti}
                anchorEl={openNoti}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <List sx={{ width: '400px', maxHeight: '400px', overflow: 'auto' }}>
                    {dataNoti.map((noti) => (
                        <div key={noti.id}>
                            <ListItem button>
                                <ListItemIcon>
                                    {noti.type === 'Success' && <CheckCircleIcon color="success" />}
                                    {noti.type === 'Error' && <ErrorIcon color="error" />}
                                    {noti.type === 'Info' && <NotificationsIcon color="primary" />}
                                    {noti.type === 'Warning' && <NotificationImportantIcon color="warning" />}
                                </ListItemIcon>
                                <ListItemText
                                    primary={noti.tieuDe}
                                    secondary={noti.noiDung}
                                />
                              
                            </ListItem>
                            <Divider />
                            <Button style={{alignItems:"center", padding: 10}}>
                                    Xem tất cả
                            </Button>
                        </div>
                    ))}
                </List>
            </Popover>
        </>
    )
}