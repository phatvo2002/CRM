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
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";
import { Link as RouterLink} from "react-router-dom";
import { Grid, Link } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ListItems from "../Dashbroad/listItems"
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import PersonIcon from "@mui/icons-material/Person";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Icon from '@mui/material/Icon';
// import Chart from "./Chart";
import MenuApi from "../../Api/MenuApi";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      overflow={"auto"}
      height="50px"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
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
  const { logout } = React.useContext(AuthContext);
  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menu ,setMenu] = React.useState([]);
  const opens = Boolean(anchorEl);
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = React.useState(false);
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
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

  const gotoLink  = ()=>{
      navigate("/doimatkhau")
  }

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const roleId = localStorage.getItem("roleId")

  React.useEffect(()=>{
     if(roleId)
     {
       const getMenuByRole = async (roleId)=>{
             const res = await MenuApi.GetMenuRoleById(roleId);
             if(res.length>0)
             {
                setMenu(res)
             }
             else
             {
              setMenu([])
             }
       }
       getMenuByRole(roleId)
     }
  },[roleId])

  const gotoLinkThietLap  = ()=>{
    navigate("/thietlap")
}

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
          display: 'flex',
          bgcolor: 'background.default',
          color: 'text.primary',
          fontFamily: "inherit",
        }} >
        <CssBaseline />
        <AppBar
          position="fixed"
         // open={open}
          sx={{ backgroundColor: 'background.paper' }}
        >
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          > 
           
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
         
            <Typography
              component="h6"
              variant="caption"
              color="white"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <IconButton>
            <IconButton  onClick={toggleTheme}>
                {darkMode ? <WbSunnyIcon style={{color:"white"}}/> : <DarkModeIcon style={{color:"black"}}/>} 
             </IconButton>
            </IconButton>
            <IconButton color="white">
              <SettingsIcon
                id="basic-button"
                onClick={gotoLinkThietLap}
                aria-expanded={open ? "true" : undefined}
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
              ></SettingsIcon>
            </IconButton>
            <IconButton color="white">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton style={{border:"1px solid" , padding: 10 , marginLeft:"20px"}}>
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
                  <Link component={RouterLink} to="/user/profile">Thông tin tài khoản</Link>
                </MenuItem>
                <MenuItem onClick={gotoLink}>Đổi mật khẩu</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </IconButton>
         
          </Toolbar>
          <Toolbar style={{height:"10px"}}>
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
              <Link component={RouterLink} style={{textDecoration:"none" ,color:"text.primary" , padding:"10px" }} to={item.menu.url}>{item.menu.name}</Link>
            </Typography>
            )
          })}
          </Toolbar>

         
        </AppBar>
        <Drawer variant="permanent" >
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <ListItems listMenu={menu}/>
            <Divider sx={{ my: 1 }} />
          </List>
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
          <Container maxWidth="100%" sx={{ mt: 4, mb: 4 , marginTop:10}}>
            <Outlet />
          </Container>
        
        </Box>
      </Box>
        <Copyright />
    </ThemeProvider>
  );
}
