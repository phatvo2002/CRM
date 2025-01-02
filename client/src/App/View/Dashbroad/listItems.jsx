import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";

import Icon from '@mui/material/Icon';
import { Link as RouterLink } from "react-router-dom";
import { Grid, Link, useTheme } from "@mui/material";

const ListItems = (props) => {
  const theme = useTheme()
  return (
    <React.Fragment >
      <Grid style={{marginTop:10 }}>
      {props.listMenu.map((item ,index) =>{
        return (
        <ListItemButton key={index}>
          <ListItemIcon>
            <Icon>
            {item.menu.icon}
            </Icon>
          </ListItemIcon>
          <Link component={RouterLink} style={{textDecoration:"none" ,color:theme.palette.text.primary}} to={item.menu.url}>{item.menu.name}</Link>
        </ListItemButton>
        )
      })}
      </Grid>
   
  </React.Fragment>
  )
}

export default ListItems

