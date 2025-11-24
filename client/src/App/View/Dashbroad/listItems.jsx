import * as React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  Grid,
  Icon,
  Link,
  useTheme,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useMenuStore } from "src/App/Hooks/hook";

const ListItems = ({ listMenu }) => {
  const { menuId, setMenuId } = useMenuStore();
  const [openItems, setOpenItems] = React.useState({});
  const location = useLocation();
  const theme = useTheme();

  const handleClick = (index) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        p: 1,
        borderRadius: 3,
        boxShadow: 2,
      }}
    >
      {Array.isArray(listMenu) &&
        listMenu.map((item, index) => {
          const isActive = location.pathname === item.menu.url;

          return (
            <React.Fragment key={index}>
              <ListItemButton
                onClick={() => handleClick(index)}
                sx={{
                  mb: 1,
                  borderRadius: 2,
                  backgroundColor: isActive
                    ? theme.palette.primary.main
                    : "transparent",
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                    transform: "translateX(4px)",
                  },
                  color: isActive
                    ? theme.palette.primary.contrastText
                    : theme.palette.text.primary,
                  transition: "all 0.3s ease",
                  position: "relative",
                }}
              >
                {isActive && (
                  <Box
                    sx={{
                      position: "absolute",
                      left: 0,
                      top: "20%",
                      bottom: "20%",
                      width: "4px",
                      borderRadius: "2px",
                      bgcolor: theme.palette.primary.contrastText,
                    }}
                  />
                )}

                <ListItemIcon>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      bgcolor: isActive
                        ? theme.palette.primary.light
                        : theme.palette.action.hover,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <Icon>{item.menu.icon}</Icon>
                  </Box>
                </ListItemIcon>

                <ListItemText
                  primary={item.menu.name}
                  primaryTypographyProps={{
                    fontWeight: isActive ? "bold" : "normal",
                  }}
                />

                {openItems[index] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>

              <Collapse in={openItems[index]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {Array.isArray(item?.menu.menuChildrent) &&
                    item.menu.menuChildrent.map((item2, index2) => {
                      const isChildActive = location.pathname === item2.url;
                      return (
                        <ListItemButton
                          key={index2}
                          sx={{
                            pl: 6,
                            borderRadius: 2,
                            mb: 0.5,
                            bgcolor: isChildActive
                              ? theme.palette.action.selected
                              : "transparent",
                            "&:hover": {
                              bgcolor: theme.palette.action.hover,
                            },
                            transition: "all 0.3s ease",
                          }}
                          component={RouterLink}
                          to={`${item2.url}`}
                          onClick={() => setMenuId(item2.id)}
                        >
                          <ListItemIcon>
                            <Icon fontSize="small">{item2.icon}</Icon>
                          </ListItemIcon>
                          <ListItemText primary={item2.name} />
                        </ListItemButton>
                      );
                    })}
                </List>
              </Collapse>
            </React.Fragment>
          );
        })}
    </List>
  );
};

export default ListItems;
