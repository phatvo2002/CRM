import * as React from "react";

import { Link as RouterLink } from "react-router-dom";
import { Grid, Icon, Link, useTheme } from "@mui/material";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';



const ListItems = ({ listMenu }) => {

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
      {/* <Grid sx={{ marginTop: 2 }}>
        {props.listMenu.map((item, index) => {
          const isActive = location.pathname === item.menu.url;
          return (
            <ListItemButton
              key={index}
              component={RouterLink}
              to={`${item.menu.url}?menu=${item.menu.id}`}
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
  
              <Link
                component="span"
                sx={{
                  textDecoration: "none",
                  color: isActive
                    ? theme.palette.primary.contrastText
                    : theme.palette.text.primary,
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    color: theme.palette.primary.main,
                    transform: "scale(1.05)",
                  },
                  "&:active": {
                    transform: "scale(0.95)", 
                  },
                  ...(isActive && {
                    fontWeight: "bold", 
                    borderBottom: `2px solid ${theme.palette.primary.main}`, // Đường viền dưới
                  }),
                }}
              >
                {item.menu.name}
              </Link>
            </ListItemButton>
          );
        })}
      </Grid> */}
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
                      to={`${item2.url}?menu=${item2.id}`}
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
