import {
  Box,
  Button,
  Grid2,
  IconButton,
  List,
  ListItem,
  Paper,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
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
import {
  useGetUserByIdQuery,
  useUpLoadImageMutation,
} from "src/App/Api/UserApi";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ContactsIcon from "@mui/icons-material/Contacts";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import Groups3Icon from "@mui/icons-material/Groups3";
import ModalUpdateUser from "./Modal/ModalUpdateUser";
import NoImage from "../../Assets/image/no-image.png";
import UploadIcon from "@mui/icons-material/Upload";
import { toast } from "react-toastify";

const ThongTinNguoiDung = () => {
  const [openModalUpdateUser, setOpenModalUpdateUser] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const [file, setFile] = useState([]);
  const [typeModal, setTypeModal] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();
  const { data: dataUser, refetch } = useGetUserByIdQuery();
  const [uploadImage] = useUpLoadImageMutation();

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const StyledListItem = styled(ListItem)(({ theme }) => ({
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      cursor: 'pointer',
    },
    padding: theme.spacing(1, 2),
  }));

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1.5),
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  }));

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
      setImageUrl("data:image/jpeg;base64," + dataUser?.hinhAnh);
    }
  }, [dataUser]);

  const handleUploadImage = async () => {
    const data = {
      file: file[0],
    };
    try {
      const response = await uploadImage(data);
      if (response.data.status === 200) {
        toast.success(response.data.message);
        refetch();
      } else toast.success(response.message);
    } catch (error) {
      console.log(error);
    }
  };

  const { logout } = React.useContext(AuthContext);

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Grid2 container spacing={3}>
          {/* Left Panel - User Avatar and Actions */}
          <Grid2 size={{ xs: 12, md: 4 }}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              sx={{ p: 2 }}
            >
              <Box
                sx={{
                  width: 200,
                  height: 200,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  mb: 2,
                  border: '2px solid',
                  borderColor: 'grey.300',
                }}
              >
                <img
                  src={dataUser?.hinhAnh ? imageUrl : NoImage}
                  alt="User Avatar"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>
              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<UploadIcon />}
                  sx={{ borderRadius: 20 }}
                >
                  Chọn ảnh
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(event) => setFile(event.target.files)}
                    multiple
                  />
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleUploadImage}
                  disabled={file.length === 0}
                  sx={{ borderRadius: 20 }}
                >
                  Lưu
                </Button>
              </Stack>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {dataUser?.hoVaDem}
              </Typography>
              <List sx={{ width: '100%' }}>
                <StyledListItem onClick={gotoLink}>
                  <LockResetIcon sx={{ mr: 1 }} /> Đổi mật khẩu
                </StyledListItem>
                <StyledListItem>
                  <DeleteOutlineIcon sx={{ mr: 1 }} /> Thùng rác
                </StyledListItem>
                <StyledListItem onClick={logout}>
                  <LogoutIcon sx={{ mr: 1 }} /> Đăng xuất
                </StyledListItem>
              </List>
            </Box>
          </Grid2>

          {/* Right Panel - User Information */}
          <Grid2 size={{ xs: 12, md: 8 }}>
            <Box sx={{ position: 'relative' }}>
              <IconButton
                onClick={onOpenModalUpdateUser}
                sx={{ position: 'absolute', top: -10, right: 0 }}
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
              <Stack spacing={2}>
                <Typography variant="body1">
                  <b>Email:</b> {dataUser?.email}
                </Typography>
                <Typography variant="body1">
                  <b>Mã nhân viên:</b> {dataUser?.id}
                </Typography>
                <Typography variant="body1">
                  <b>Trạng thái làm việc:</b>{' '}
                  {dataUser?.maTinhTrang === 1 ? (
                    <Box component="span" sx={{ color: 'success.main', display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircleIcon fontSize="small" />
                      Đang làm việc
                    </Box>
                  ) : (
                    <Box component="span" sx={{ color: 'error.main' }}>
                      Đã nghỉ việc
                    </Box>
                  )}
                </Typography>
              </Stack>

              <TableContainer sx={{ mt: 3, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: 'background.primary' }}>
                      <StyledTableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <PhoneIphoneIcon fontSize="small" />
                          Số điện thoại
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <AccountCircleIcon fontSize="small" />
                          Tài khoản
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <ContactsIcon fontSize="small" />
                          Địa chỉ
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <SupervisorAccountIcon fontSize="small" />
                          Chức vụ
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Groups3Icon fontSize="small" />
                          Phòng ban
                        </Box>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <StyledTableRow>
                      <StyledTableCell>{dataUser?.soDienThoai}</StyledTableCell>
                      <StyledTableCell>{dataUser?.email}</StyledTableCell>
                      <StyledTableCell>{dataUser?.diaChi}</StyledTableCell>
                      <StyledTableCell>{dataUser?.chucVu?.tenChucVu}</StyledTableCell>
                      <StyledTableCell>Phòng công nghệ thông tin</StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid2>
        </Grid2>
      </Paper>
    </Box>
  );
};

export default ThongTinNguoiDung;