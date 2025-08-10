import * as React from "react";

import { Link as RouterLink } from "react-router-dom";
import { Grid, Icon, Link, useTheme } from "@mui/material";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useMenuStore } from "src/App/Hooks/hook";



const ListItems = ({ listMenu }) => {
   const { menuId, setMenuId } = useMenuStore();
  const [openItems, setOpenItems] = React.useState({});

  const handleClick = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const theme = useTheme();
  return (
    <React.Fragment>
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {Array.isArray(listMenu) && listMenu.length > 0 && listMenu.map((item, index) => {
          const isActive = location.pathname === item.menu.url;
          return (
            <>
              <ListItemButton onClick={() => handleClick(index)} key={index}
                sx={{
                  backgroundColor: isActive
                    ? theme.palette.primary.light
                    : "transparent",
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                  },
                  color: isActive
                    ? theme.palette.primary.contrastText
                    : theme.palette.text.primary,
                  borderRadius: 1,
                }}
              >
                <ListItemIcon>
                  <Icon
                    sx={{
                      color: isActive
                        ? theme.palette.primary.contrastText
                        : "inherit",
                    }}
                  >
                    {item.menu.icon}
                  </Icon>
                </ListItemIcon>
                <ListItemText primary={item.menu.name} />
                {openItems[index] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openItems[index]} timeout="auto" unmountOnExit >
                <List component="div" disablePadding>
                  {Array.isArray(item?.menu.menuChildrent) && item?.menu.menuChildrent.length > 0 && item?.menu.menuChildrent.map((item2, index2) => (
                    <ListItemButton sx={{ pl: 4 }} key={index2}
                      component={RouterLink}
                      to={`${item2.url}`}
                      onClick={()=>{setMenuId(item2.id)}}
                    >
                      <ListItemIcon>
                        <Icon
                          sx={{
                            color: isActive
                              ? theme.palette.primary.contrastText
                              : "inherit",
                          }}
                        >
                          {item2.icon}
                        </Icon>
                      </ListItemIcon>
                      <ListItemText primary={item2.name} />
                    </ListItemButton>
                  ))}
                </List>

              </Collapse>
            </>
          )
        })}


      </List>

    </React.Fragment>
  );
};

export default ListItems;
