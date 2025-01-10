import { Breadcrumbs, Fab, Grid, Link, Stack, Popover, ListItem, ListItemText, ListItemIcon, Divider, List } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ErrorIcon from '@mui/icons-material/Error';
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import { useState } from "react";
export const CustomNotification = ({ openNoti, handleOpenNoti, handleClose, intitialNoti }) => {
    const notifications = [
        { id: 1, title: 'Thông báo 1', message: 'Nội dung thông báo 1', type: 'success' },
        { id: 2, title: 'Thông báo 2', message: 'Nội dung thông báo 2', type: 'error' },
        { id: 3, title: 'Thông báo 3', message: 'Nội dung thông báo 3', type: 'success' },
        { id: 4, title: 'Thông báo 4', message: 'Nội dung thông báo 4', type: 'info' },
    ];
    const[listNoti , setListNoti] = useState("")
    return (
        <>
            <IconButton color="primary" onClick={handleOpenNoti}>
                <Badge badgeContent={notifications.length} color="primary">
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
                <List sx={{ width: '300px', maxHeight: '400px', overflow: 'auto' }}>
                    {notifications.map((noti) => (
                        <div key={noti.id}>
                            <ListItem button>
                                <ListItemIcon>
                                    {noti.type === 'success' && <CheckCircleIcon color="success" />}
                                    {noti.type === 'error' && <ErrorIcon color="error" />}
                                    {noti.type === 'info' && <NotificationsIcon color="primary" />}
                                </ListItemIcon>
                                <ListItemText
                                    primary={noti.title}
                                    secondary={noti.message}
                                />
                            </ListItem>
                            <Divider />
                        </div>
                    ))}
                </List>
            </Popover>
        </>
    )
}