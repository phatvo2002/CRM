import {
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  Paper,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import LockResetIcon from "@mui/icons-material/LockReset";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useGetUserByIdQuery, useUpLoadImageMutation } from "src/App/Api/UserApi";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ContactsIcon from "@mui/icons-material/Contacts";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import Groups3Icon from "@mui/icons-material/Groups3";
import ModalUpdateUser from "./Modal/ModalUpdateUser";
import NoImage from "../../Assets/image/no-image.png"
import UploadIcon from '@mui/icons-material/Upload';
import { toast } from "react-toastify";
const ThongTinNguoiDung = () => {
  const [openModalUpdateUser, setOpenModalUpdateUser] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const [file, setFile] = useState([]);
  const [typeModal, setTypeModal] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();
  const { data: dataUser, refetch } = useGetUserByIdQuery();
  const [uploadImage] = useUpLoadImageMutation()

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const gotoLink = () => {
    navigate("/doimatkhau");
  };
  const onOpenModalUpdateUser = () => {
    setOpenModalUpdateUser(true);
  };

  const onCloseModalUpdateUser = () => {
    setOpenModalUpdateUser(false);
  };

  useEffect(() => {
    if (dataUser && dataUser?.hinhAnh) {
      setImageUrl('data:image/jpeg;base64,' + dataUser?.hinhAnh)
    }
  }, [dataUser]);

  const handleUploadImage = async () => {
    const data = {
      file: file[0]
    }
    try {
      const response = await uploadImage(data)
      if (response.data.status === 200) {
        toast.success(response.data.message)
        refetch()
      }
      else toast.success(response.message)

    } catch (error) {
      console.log(error)
    }
  }
  const { logout } = React.useContext(AuthContext);
  return (
    <Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <Box
              textAlign="center"
              width="300px"
              padding={2}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              {dataUser != undefined &&
                <div>
                  {dataUser?.hinhAnh == null ?
                    <div>
                      <img src={NoImage} style={{ width: "200px", height: "200px", borderRadius: "50%" }}  />
                    </div> : <div>
                      <img src={imageUrl} style={{ width: "200px", height: "200px", borderRadius: "50%" }} />
                    </div>}
                </div>
              }
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<UploadIcon />}
              >
                Chọn hình ảnh
                <VisuallyHiddenInput
                  type="file"
                  onChange={(event) => setFile(event.target.files)}
                  multiple
                />
              </Button>
                <Button variant="outlined" onClick={handleUploadImage} style={{margin : 2}} disabled={file.length == 0 } >
                  Lưu
                </Button>
              <span>{`${dataUser?.hoVaDem}`}</span>
              <List>
                <ListItem onClick={gotoLink} style={{ cursor: "pointer" }}>
                  <LockResetIcon style={{ marginRight: 10 }} /> Đổi mật khẩu
                </ListItem>
                <ListItem>
                  <DeleteOutlineIcon style={{ marginRight: 10 }} /> Thùng rác
                </ListItem>
                <ListItem onClick={logout}>
                  <LogoutIcon style={{ marginRight: 10 }} /> Đăng xuất
                </ListItem>
              </List>
            </Box>

            <Box position={"relative"} width={"100%"}>
              <IconButton
                onClick={onOpenModalUpdateUser}
                style={{ }}
              >
                <BorderColorIcon />
              </IconButton>
              <ModalUpdateUser
                selectedItem={selectedRow}
                closeModal={onCloseModalUpdateUser}
                typeModal={typeModal}
                setTypeModal={setTypeModal}
                showModal={openModalUpdateUser}
                setLoading={setLoading}
              />
              <Grid>
                <Typography
                  variant="body1"
                  component="h6"
                  style={{ padding: 10, margin: 10 }}
                >
                  <b> Email : </b>
                  <span>{dataUser?.email}</span>
                </Typography>
                <Typography
                  variant="body1"
                  component="h6"
                  style={{ padding: 10, margin: 10 }}
                >
                  <b> Mã nhân viên : </b>
                  <span>{dataUser?.id}</span>
                </Typography>
                <Typography
                  variant="body1"
                  component="h6"
                  style={{ padding: 10, margin: 10 }}
                >
                  <b> Trạng thái làm việc </b>
                  {dataUser?.maTinhTrang === 1 ? (
                    <span
                      style={{
                        color: "#52b202",
                        display: "flex",
                        justifyItems: "center",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      <CheckCircleIcon />
                      Đang làm việc
                    </span>
                  ) : (
                    <span style={{ color: "#b2102f" }}>Đã nghỉ việc</span>
                  )}
                </Typography>
              </Grid>
              <Grid style={{ marginTop: 30 }}>
                <Table sx={{ minWidth: 750 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography variant="body1" component="h6">
                          <b>
                            <PhoneIphoneIcon /> Số điện thoại
                          </b>
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" component="h6">
                          <b>
                            {" "}
                            <AccountCircleIcon /> Tài khoản
                          </b>
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" component="h6">
                          <b>
                            {" "}
                            <ContactsIcon /> Địa chỉ
                          </b>
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableCell>
                      <Typography variant="body1" component="h6">
                        {dataUser?.soDienThoai}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" component="h6">
                        {dataUser?.email}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" component="h6">
                        {dataUser?.diaChi}
                      </Typography>
                    </TableCell>
                  </TableBody>
                </Table>
                <Table sx={{ minWidth: 750 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography variant="body1" component="h6">
                          <b>
                            <SupervisorAccountIcon /> Chức vụ{" "}
                          </b>
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" component="h6">
                          <b>
                            <Groups3Icon /> Phòng ban
                          </b>
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableCell>
                      <Typography variant="body1" component="h6">
                        {dataUser?.chucVu?.tenChucVu}
                      </Typography>
                    </TableCell>
                    <TableCell>
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
    </Grid>
  );
};
export default ThongTinNguoiDung
