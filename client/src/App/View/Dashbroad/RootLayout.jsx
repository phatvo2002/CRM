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
import {
  Breadcrumbs,
  Fab,
  Grid,
  Link,
  Stack,
  Popover,
  ListItem,
  ListItemText,
  ListItemIcon,
  Grid2,
  Icon,
  Tooltip,
  Paper,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItems from "../Dashbroad/listItems";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import PersonIcon from "@mui/icons-material/Person";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { CustomNotification } from "src/App/Components/CustomNotification/CustomNotification";
// import Chart from "./Chart";
import { useGetMenuRoleByIdQuery } from "../../Api/MenuApi";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import panner from "../../Assets/image/banner.png";
import LogoutIcon from "@mui/icons-material/Logout";

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

const drawerWidth = 240;

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
        setMenu(menuRoleData);
      } else {
        setMenu([]);
      }
    }
  }, [menuRoleData]);

  //   const gotoLinkThietLap  = ()=>{
  //     navigate("/thietlap")
  // }

  //handle noti
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
          fontFamily: "inherit",
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
              pr: "24px",
            }}
          >
            <IconButton
              edge="start"
              color="black"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Breadcrumbs
              maxItems={2}
              aria-label="breadcrumb"
              style={{ width: "200px" }}
            >
              {pathParts.map((item, index) => {
                const href = "/" + pathParts.slice(0, index + 1).join("/");
                return (
                  <Link
                    key={index}
                    underline="hover"
                    color="Highlight"
                    href={href}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </Link>
                );
              })}
            </Breadcrumbs>
            {/* <Grid2 style={{ width: "80%" }} overflow={"clip"}>
              {menu.length !== 0 && (
                <Stack
                  direction="row"
                  spacing={4}
                  fontSize={"1.5rem"}
                  alignItems="center"
                >
                  {menu.map((item, index) => (
                    <Stack
                      direction="row"
                      spacing={1}
                      key={index}
                      alignItems="center"
                    >
                      <Tooltip title={item?.menu?.name}>
                        <Link
                          component={RouterLink}
                          style={{
                            textDecoration: "none",
                            color: theme.palette.text.primary,
                          }}
                          to={item.menu.url}
                        >
                          <Icon>{item.menu.icon}</Icon>
                        </Link>
                      </Tooltip>
                    </Stack>
                  ))}
                </Stack>
              )}
            </Grid2> */}

            <Typography
              component="h6"
              variant="caption"
              color="white"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <IconButton>
              <IconButton onClick={toggleTheme}>
                {darkMode ? (
                  <WbSunnyIcon style={{ color: "white" }} />
                ) : (
                  <DarkModeIcon style={{ color: "black" }} />
                )}
              </IconButton>
            </IconButton>
            <IconButton color="black">
              <SettingsIcon
                // id="basic-button"
                // onClick={gotoLinkThietLap}
                // aria-expanded={open ? "true" : undefined}
                // aria-controls={open ? "basic-menu" : undefined}
                // aria-haspopup="true"
                onClick={handleOpenSetting}
              ></SettingsIcon>
              <Menu
                id="basic-menu"
                anchorEl={openSetting}
                open={intitialSetting}
                onClose={handleCloseSetting}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={linkToMail}>Thiết lập Mail</MenuItem>
              </Menu>
            </IconButton>
            <CustomNotification
              openNoti={openNoti}
              handleOpenNoti={handleOpenNoti}
              handleClose={handleCloseNoti}
              intitialNoti={intitialNoti}
            />
            <IconButton
              style={{ border: "1px solid", padding: 10, marginLeft: "20px" }}
            >
              <PersonIcon
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              ></PersonIcon>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={opens}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem>
                  <Link component={RouterLink} to="/user/profile">
                    Thông tin tài khoản
                  </Link>
                </MenuItem>
                <MenuItem onClick={gotoLink}>Đổi mật khẩu</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </IconButton>
          </Toolbar>
          {/* <Toolbar style={{height:"10px"}}>
          {menu.map((item, index)=>{
            return (
              <Typography
              component="h6"
              variant="caption"
              color="white"
             
              key={index}
            >
            <Icon color="text.primary" style={{height:"20px"}}>
            {item.menu.icon}
            </Icon>
              <Link component={RouterLink} style={{textDecoration:"none" ,color:"text.primary" , padding:"10px" ,fontSize:"1rem" }} to={item.menu.url}>{item.menu.name}</Link>
            </Typography>
            )
          })}
          </Toolbar> */}
        </AppBar>
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
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
                style={{ width: "100%", paddingLeft: "30px" }}
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
            color="text.primary"
            startIcon={<LogoutIcon />}
            sx={{
              fontWeight: "bold",
              marginTop: "auto",
              mb: 2,
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
