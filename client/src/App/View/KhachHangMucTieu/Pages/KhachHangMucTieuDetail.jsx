import React from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  Divider,
  Avatar,
  Button,
  Grid2,
  IconButton,
  Paper,
  Menu,
  MenuItem,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CallIcon from "@mui/icons-material/Call";
import { useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import TextsmsIcon from "@mui/icons-material/Textsms";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
const KhachHangMucTieuDetail = () => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  const backPreviousPage = () => {
    navigate("/khachhang");
  };
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <>
    <Grid2 container spacing={2} sx={{padding: 2}}>
      <Grid2 size={4}>
        <IconButton onClick={() => backPreviousPage()}>
          <ArrowBackIcon />
        </IconButton>
      </Grid2>

      <Grid2 size={8}>
        <Button
          variant="outlined"
          style={{ margin: 5 }}
          endIcon={<LocalPhoneIcon />}
        >
          Gọi Điện thoại
        </Button>
        <Button
          variant="outlined"
          style={{ margin: 5 }}
          endIcon={<MarkunreadIcon />}
        >
          Gửi mail
        </Button>
        <Button
          variant="outlined"
          style={{ margin: 5 }}
          endIcon={<TextsmsIcon />}
        >
          Gửi SMS
        </Button>
        <Button
        variant="outlined"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<ChangeCircleIcon />}
      >
        Chuyển đổi
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Sinh đơn hàng</MenuItem>
        <MenuItem onClick={handleClose}>Sinh cơ hội</MenuItem>
      </Menu>
       
      </Grid2>
    </Grid2>
    <Paper>
      <Box display="flex" flexDirection="row" height="100vh">
        {/* Sidebar */}
        <Box
          width="300px"
          bgcolor="#f9f9f9"
          p={2}
          display="flex"
          flexDirection="column"
          borderRight="1px solid #ddd"
        >
          <Box textAlign="center" mb={2}>
            <Avatar
              alt="Phat"
              sx={{ width: 80, height: 80, margin: "0 auto" }}
            />
            <Typography variant="h6" mt={2}>
              Phat
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Mã số thuế: - <br />
              Điện thoại: -
            </Typography>
          </Box>
          <Divider />
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              Ngành nghề: Không chọn
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              Doanh thu: Không chọn
            </Typography>
          </Box>
          {/* <Box mt={2} textAlign="center">
          <Button variant="contained" size="small" startIcon={<CallIcon />}>
            Thêm thẻ
          </Button>
        </Box> */}
        </Box>

        {/* Main Content */}
        <Box
          flexGrow={1}
          p={3}
          sx={{
            border: 0,
            borderColor: "Highlight",
            fontFamily: "inherit",
            boxShadow: 1,
          }}
        >
          {/* Tabs */}
          <Tabs value={activeTab} onChange={handleTabChange} centered>
            <Tab label="Tổng quan" />
            <Tab label="Thông tin chi tiết" />
            <Tab label="Liên hệ" />
            <Tab label="Hoạt động" />
            <Tab label="Bán hàng" />
            <Tab label="Hỗ trợ" />
          </Tabs>

          {/* Tab Content */}
          {activeTab === 0 && (
            <Box mt={3}>
              {/* Grid Layout */}
              <Grid2 container spacing={2}>
                {/* Tổng quan */}
                <Grid2 item size={12} sm={6} md={4}>
                  <Card>
                    <CardContent>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        gutterBottom
                      >
                        Số lượng đơn hàng
                      </Typography>
                      <Typography variant="h5">0</Typography>
                    </CardContent>
                  </Card>
                </Grid2>
                <Grid2 item size={12} sm={6} md={4}>
                  <Card>
                    <CardContent>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        gutterBottom
                      >
                        Giá trị đơn hàng
                      </Typography>
                      <Typography variant="h5">0 Triệu</Typography>
                    </CardContent>
                  </Card>
                </Grid2>
                <Grid2 item size={12} sm={6} md={4}>
                  <Card>
                    <CardContent>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        gutterBottom
                      >
                        Công nợ
                      </Typography>
                      <Typography variant="h5" color="error">
                        0 Triệu
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Hạn mức: 0 Triệu
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid2>
                <Grid2 item size={12} sm={6} md={4}>
                  <Card>
                    <CardContent>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        gutterBottom
                      >
                        Chu kỳ mua hàng
                      </Typography>
                      <Typography variant="h5">0 Ngày</Typography>
                    </CardContent>
                  </Card>
                </Grid2>
                {/* Hoạt động */}
                <Grid2 item size={12} sm={6} md={8}>
                  <Card>
                    <CardContent>
                      <Typography variant="subtitle1" color="text.secondary">
                        Nội dung trao đổi
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Không có dữ liệu
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid2>
              </Grid2>
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
    </>
  );
};

export default KhachHangMucTieuDetail;
