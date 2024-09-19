import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";

import Icon from '@mui/material/Icon';
import { Link } from "react-router-dom";



const ListItems = (props) => {
  console.log(props.listMenu)
  return (
    <React.Fragment>
      {props.listMenu.map((item) =>{
        return (
          <ListItemButton>
          <ListItemIcon>
            <Icon>
            {item.menu.icon}
            </Icon>
          </ListItemIcon>
          <Link to={item.menu.url }>{item.menu.name}</Link>
        </ListItemButton>
        )
      })}
   
  </React.Fragment>
  )
}

export default ListItems

