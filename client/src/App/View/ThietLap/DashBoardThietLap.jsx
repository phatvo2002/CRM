import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Link as RouterLink} from "react-router-dom";
import {Link} from "@mui/material";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Groups2Icon from '@mui/icons-material/Groups2';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import MenuIcon from '@mui/icons-material/Menu';
import Inventory2Icon from '@mui/icons-material/Inventory2';
const DashBoardThietLap = () => {
  return (
    <Container style={{ maxWidth: "100%" , fontFamily: "inherit",}}>
         <h2 style={{textAlign:"center"}}>Chào bạn : Admin</h2>
         <p  style={{textAlign:"center" , fontSize:"1.2rem"}}>Dưới đây là các chức năng bạn được quyền truy cập, nhấn vào tên chức năng để bắt đầu</p>
      <Grid container spacing={2}>
        <Stack
         spacing={{ xs: 1, sm: 2 }}
         direction="row"
         useFlexGap
         sx={{ flexWrap: 'wrap' }}
         marginTop={10}
        >
          <Stack>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                 <ManageAccountsIcon style={{width:"100%" ,fontSize:"5rem"}}></ManageAccountsIcon>
              </CardContent>
              <CardActions>
                <Button size="small"  style={{textAlign:"center" }}>
                  <Link
                    component={RouterLink}
                    to={"/quantrihethong/thietlapnhanvien"}
                    style={{ textDecoration: "none", color: "primary.main" }}
                  >
                    Quản trị người dùng
                  </Link>
                </Button>
              </CardActions>
            </Card>
            </Stack>
            <Stack>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                 <VerifiedUserIcon style={{width:"100%" ,fontSize:"5rem"}}></VerifiedUserIcon>
              </CardContent>
              <CardActions>
                <Button size="small"  style={{textAlign:"center" }}>
                  <Link
                    component={RouterLink}
                    to={"/quantrihethong/thietlapvaitro"}
                    style={{ textDecoration: "none",  color: "primary.main" }}
                  >
                    Thiết lập bảo mật 
                  </Link>
                </Button>
              </CardActions>
            </Card>
            </Stack>
            <Stack>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                 <Groups2Icon style={{width:"100%" ,fontSize:"5rem"}}></Groups2Icon>
              </CardContent>
              <CardActions>
                <Button size="small"  style={{textAlign:"center" }}>
                  <Link
                   component={RouterLink}
                    to={"/quantrihethong/quanlyphongban"}
                    style={{ textDecoration: "none", color: "primary.main" }}
                  >
                    Quản trị phòng ban
                  </Link>
                </Button>
              </CardActions>
            </Card>
            </Stack>
            <Stack>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                 <MenuIcon style={{width:"100%" ,fontSize:"5rem"}}></MenuIcon>
              </CardContent>
              <CardActions>
                <Button size="small"  style={{textAlign:"center" }}>
                  <Link
                    component={RouterLink}
                    to={"/quantrihethong/quanlymenu"}
                    style={{ textDecoration: "none", color: "primary.main"  }}
                  >
                    Quản lý phân hệ
                  </Link>
                </Button>
              </CardActions>
            </Card>
          
            </Stack>
            <Stack>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                 <Inventory2Icon style={{width:"100%" ,fontSize:"5rem"}}></Inventory2Icon>
              </CardContent>
              <CardActions>
                <Button size="small"  style={{textAlign:"center" }}>
                  <Link
                    component={RouterLink}
                    to={""}
                    style={{ textDecoration: "none", color: "primary.main"  }}
                  >
                     Giai đoạn bán hàng
                  </Link>
                </Button>
              </CardActions>
            </Card>
          
            </Stack>
         
        
        </Stack>
        <Grid sx={6}></Grid>
      </Grid>
    </Container>
  );
};

export default DashBoardThietLap;
