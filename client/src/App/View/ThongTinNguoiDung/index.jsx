import { Box, Grid, IconButton, List, ListItem, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";
import personimg from "../../Assets/image/person.png"
import CustomImageUpload from "../../Components/CustomUploadImages/CusTomUploadImages";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import LockResetIcon from '@mui/icons-material/LockReset';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useGetUserByIdQuery } from "src/App/Api/UserApi";
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ContactsIcon from '@mui/icons-material/Contacts';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import Groups3Icon from '@mui/icons-material/Groups3';
const ThongTinNguoiDung = () => {
  const navigate = useNavigate()
  const {data : dataUser } = useGetUserByIdQuery()
  const gotoLink  = ()=>{
    navigate("/doimatkhau")
 }

const { logout } = React.useContext(AuthContext);
  return <Grid >
    <Grid item xs={12} md={4} lg={3}>
     <Paper >

    <Stack direction={{ xs: 'column', sm: 'row' }}
      spacing={{ xs: 1, sm: 2, md: 4 }}>
      <Box textAlign="center" width="300px" padding={2} display="flex" flexDirection="column" alignItems="center">
        <img src={personimg} alt="Admin" />
        <CustomImageUpload />
        <span>{`${dataUser?.hoVaDem}`}</span>
        <List>
          <ListItem onClick={gotoLink} style={{cursor:"pointer"}}>
          <LockResetIcon  style={{marginRight:10}}/>  Đổi mật khẩu
          </ListItem>
          <ListItem>
           <DeleteOutlineIcon style={{marginRight:10}}/> Thùng rác
          </ListItem>
          <ListItem onClick={logout}>
           <LogoutIcon style={{marginRight:10}}/> Đăng xuất
          </ListItem>
        </List>
      </Box>

      <Box position={"relative"} width={"100%"}>
        <IconButton style={{ position: "absolute", left: "100%" }}>
          <BorderColorIcon />
        </IconButton>
        <Grid>
          <Typography variant="body1" component="h6" style={{ padding: 10, margin: 10 }}>
            <b> Email : </b><span>{dataUser?.email}</span>
          </Typography>
          <Typography variant="body1" component="h6" style={{ padding: 10, margin: 10 }}>
            <b> Mã nhân viên : </b><span>{dataUser?.id}</span>
          </Typography>
          <Typography variant="body1" component="h6" style={{ padding: 10, margin: 10 }}>
            <b> Trạng thái làm việc  </b>{dataUser?.maTinhTrang === 1 ? (<span style={{color:"#52b202" , display:"flex" ,justifyItems:"center" ,alignItems:"center"}}> <CheckCircleIcon />Đang làm việc</span>) :(<span style={{color:"#b2102f"}}>Đã nghỉ việc</span>)}
          </Typography>
        </Grid>
        <Grid style={{ marginTop: 30 }}>
          <Table sx={{ minWidth: 750 }} >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="body1" component="h6" >
                    <b><PhoneIphoneIcon/> Số điện thoại</b>
                  </Typography>
                </TableCell>
                <TableCell >
                  <Typography variant="body1" component="h6" >
                    <b> <AccountCircleIcon/> Tài khoản</b>
                  </Typography>
                </TableCell>
                <TableCell >
                  <Typography variant="body1" component="h6" >
                    <b> <ContactsIcon/> Địa chỉ</b>
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableCell >
                <Typography variant="body1" component="h6" >
                  0708223608
                </Typography>
              </TableCell>
              <TableCell >
                <Typography variant="body1" component="h6">
                  Admin@123
                </Typography>
              </TableCell>
              <TableCell >
                <Typography variant="body1" component="h6" >
                  39tx14
                </Typography>
              </TableCell>
            </TableBody>
          </Table>
          <Table sx={{ minWidth: 750 }} >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="body1" component="h6" >
                    <b><SupervisorAccountIcon/> Chức vụ </b>
                  </Typography>
                </TableCell>
                <TableCell >
                  <Typography variant="body1" component="h6" >
                    <b><Groups3Icon/> Phòng ban</b>
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableCell >
                <Typography variant="body1" component="h6" >
                  {dataUser?.chucVu?.tenChucVu}
                </Typography>
              </TableCell>
              <TableCell >
                <Typography variant="body1" component="h6">
                  Phòng công nghệ thông tin
                </Typography>
              </TableCell>

            </TableBody>
          </Table>
        </Grid>
      </Box>
    </Stack>
        </Paper>
    </Grid>
  </Grid>;
};
  
export default ThongTinNguoiDung;
