import {
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
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
const DashBoardThietLap = () => {
  return (
    <Container style={{ maxWidth: "100%" , fontFamily: "inherit",}}>
      <Grid container spacing={2}>
      
        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            margin: "auto",
            marginTop: "20vh",
           
          }}
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
                    to={"/thietlap/thietlapnhanvien"}
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
                    to={"/thietlap/thietlapvaitro"}
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
                    to={"/thietlap/quanlyphongban"}
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
                 <PeopleOutlineIcon style={{width:"100%" ,fontSize:"5rem"}}></PeopleOutlineIcon>
              </CardContent>
              <CardActions>
                <Button size="small"  style={{textAlign:"center" }}>
                  <Link
                    component={RouterLink}
                    to={"/"}
                    style={{ textDecoration: "none", color: "primary.main"  }}
                  >
                    Danh sách thành viên
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
