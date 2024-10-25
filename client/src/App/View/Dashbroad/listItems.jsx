import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";

import Icon from '@mui/material/Icon';
import { Link as RouterLink } from "react-router-dom";
import { Grid, Link } from "@mui/material";

const ListItems = (props) => {
  return (
    <React.Fragment >
      <Grid style={{marginTop:10 }}>
      {props.listMenu.map((item) =>{
        return (
        <ListItemButton>
          <ListItemIcon>
            <Icon>
            {item.menu.icon}
            </Icon>
          </ListItemIcon>
          <Link component={RouterLink} style={{textDecoration:"none" ,color:"text.primary"}} to={item.menu.url}>{item.menu.name}</Link>
        </ListItemButton>
        )
      })}
      </Grid>
   
  </React.Fragment>
  )
}

export default ListItems

