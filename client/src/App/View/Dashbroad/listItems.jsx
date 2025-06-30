import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Icon from "@mui/material/Icon";
import { Link as RouterLink } from "react-router-dom";
import { Grid, Link, useTheme } from "@mui/material";

const ListItems = (props) => {
  const theme = useTheme();
  return (
    <React.Fragment>
      <Grid sx={{ marginTop: 2 }}>
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
              {/* <Link
              component="span"
              sx={{
                textDecoration: "none",
                color: isActive ? theme.palette.primary.contrastText : theme.palette.text.primary,
                "&:hover": {
                  color: theme.palette.primary.main,
                },
              }}
            >
              {item.menu.name}
            </Link> */}
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
      </Grid>
    </React.Fragment>
  );
};

export default ListItems;
