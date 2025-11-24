import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { Avatar, Breadcrumbs, Button, Fab, Grid2, Link, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItems from "../Dashbroad/listItems";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { CustomNotification } from "src/App/Components/CustomNotification/CustomNotification";
import { useGetMenuRoleByIdQuery } from "../../Api/MenuApi";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import panner from "../../Assets/image/banner.png";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";


function Copyright(props) {
  return (
    <Grid2
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        marginTop: 100,
        backgroundColor: "background.paper",
        height: "50px",
        textAlign: "center",
        boxShadow:
          " rgba(14, 63, 126, 0.06) 0px 0px 0px 1px, rgba(42, 51, 70, 0.03) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 2px 2px -1px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.03) 0px 5px 5px -2.5px, rgba(42, 51, 70, 0.03) 0px 10px 10px -5px, rgba(42, 51, 70, 0.03) 0px 24px 24px -8px;",
      }}
    >
      {/* Footer content */}

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ lineHeight: "50px" }}
      >
        {"Copyright © "}
        <Link color="inherit" href="">
          LP CRM
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Grid2>
  );
}

const drawerWidth = 280;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.

export default function RootLayout() {
  const location = useLocation();
  const pathParts = location.pathname.split("/").filter(Boolean);
  const { logout } = React.useContext(AuthContext);
  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menu, setMenu] = React.useState([]);
  const opens = Boolean(anchorEl);
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = React.useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });
  const userData = JSON.parse(localStorage.getItem("authorizationData"));
  // Hàm toggle dark mode
  const toggleTheme = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode); // Lưu vào localStorage
      return newMode;
    });
  };
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          fontFamily: 'Times New Roman, serif',
        },
      }),
    [darkMode]
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const gotoLink = () => {
    navigate("/doimatkhau");
  };
  const linkToMail = () => navigate("/thietlapmail");

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const roleId = localStorage.getItem("roleId");

  const {
    data: menuRoleData,
    error,
    isLoading,
  } = useGetMenuRoleByIdQuery(roleId, {
    skip: !roleId,
  });

  React.useEffect(() => {
    if (menuRoleData) {
      if (menuRoleData.length > 0) {
        localStorage.setItem("permission", JSON.stringify({ menuRoleData }))
        setMenu(menuRoleData);
      } else {
        setMenu([]);
      }
    }
  }, [menuRoleData]);

  const [openNoti, setOpenNoti] = React.useState(null);
  const [openSetting, setOpenSetting] = React.useState(null);
  const handleOpenNoti = (event) => {
    setOpenNoti(event.currentTarget);
  };
  const handleCloseNoti = () => {
    setOpenNoti(null);
  };
  const handleOpenSetting = (event) => {
    setOpenSetting(event.currentTarget);
  };
  const handleCloseSetting = () => {
    setOpenSetting(null);
  };
  const intitialNoti = Boolean(openNoti);
  const intitialSetting = Boolean(openSetting);
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          bgcolor: "background.default",
          color: "text.primary",
          fontFamily: "sans-serif",
        }}
      >
        <CssBaseline />
        <AppBar
          overflow={"auto"}
          height="50px"
          position="absolute"
          open={open}
          sx={{ backgroundColor: "background.paper" }}
        >
          <Toolbar
            sx={{
              pr: 2,
              pl: 2,
              borderRadius: 2,
              boxShadow: 1,
              bgcolor: theme.palette.background.paper,
            }}
          >
            {/* Drawer toggle */}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                mr: 2,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>

            {/* Breadcrumb */}
            <Breadcrumbs
              maxItems={3}
              separator={<ChevronRightIcon fontSize="small" />}
              aria-label="breadcrumb"
              sx={{ flexGrow: 1 }}
            >
              {pathParts.map((item, index) => {
                const href = "/" + pathParts.slice(0, index + 1).join("/");
                return (
                  <Link
                    key={index}
                    underline="hover"
                    color="primary"
                    variant="body2"
                    component={RouterLink}
                    to={href}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </Link>
                );
              })}
            </Breadcrumbs>

            {/* Right side icons */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              {/* Theme switch */}
              <Tooltip title="Đổi giao diện">
                <IconButton onClick={toggleTheme} sx={{ bgcolor: "action.hover" }}>
                  {darkMode ? (
                    <WbSunnyIcon color="warning" />
                  ) : (
                    <DarkModeIcon color="action" />
                  )}
                </IconButton>
              </Tooltip>

              {/* Settings */}
              <Tooltip title="Cài đặt">
                <IconButton onClick={handleOpenSetting} sx={{ bgcolor: "action.hover" }}>
                  <SettingsIcon />
                </IconButton>
              </Tooltip>
              <Menu
                id="basic-menu"
                anchorEl={openSetting}
                open={intitialSetting}
                onClose={handleCloseSetting}
              >
                <MenuItem onClick={linkToMail}>Thiết lập Mail</MenuItem>
              </Menu>

              {/* Notification */}
              <CustomNotification
                openNoti={openNoti}
                handleOpenNoti={handleOpenNoti}
                handleClose={handleCloseNoti}
                intitialNoti={intitialNoti}
              />

              {/* Avatar */}
              <Tooltip title="Tài khoản">
                <IconButton
                  onClick={handleClick}
                  sx={{
                    border: "2px solid transparent",
                    transition: "0.3s",
                    "&:hover": {
                      borderColor: theme.palette.primary.main,
                    },
                  }}
                >
                  <Avatar
                    src={
                      userData?.response?.hinhAnh
                        ? "data:image/jpeg;base64," + userData.response.hinhAnh
                        : undefined
                    }
                    alt="User"
                    sx={{ width: 36, height: 36 }}
                  >
                    {userData?.response?.ten?.charAt(0) ?? "U"}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={opens}
                onClose={handleClose}
              >
                <MenuItem component={RouterLink} to="/user/profile">
                  Thông tin tài khoản
                </MenuItem>
                <MenuItem onClick={gotoLink}>Đổi mật khẩu</MenuItem>
                <MenuItem onClick={logout}>Đăng Xuất</MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          {/* Nội dung phía trên */}
          <div>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              <img
                src={panner}
                style={{ maxWidth: "100%", paddingLeft: "30px" }}
                alt="Panner"
              />
              <IconButton
                onClick={toggleDrawer}
                sx={{ color: darkMode ? "white" : "black" }}
              >
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              <ListItems listMenu={menu} />
              <Divider />
            </List>
          </div>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<LogoutIcon />}
            onClick={logout}
            sx={{
              fontWeight: "600",
              marginTop: "auto",
              mb: 2,
              padding: "8px 16px",
              borderRadius: "8px",
              textTransform: "none",
              fontSize: "0.95rem",
              borderColor: "primary.main",
              "&:hover": {
                backgroundColor: "primary.main",
                color: "white",
                borderColor: "primary.main",
              },
              transition: "all 0.3s ease",
            }}
          >
            Đăng Xuất
          </Button>
        </Drawer>

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="100%" sx={{ mt: 4, mb: 4, marginBottom: 10 }}>
            <Outlet />
          </Container>
          <Copyright />

          <Fab
            color="secondary"
            aria-label="edit"
            style={{ position: "fixed", top: "90%", left: "95%" }}
          >
            <EditIcon />
          </Fab>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
