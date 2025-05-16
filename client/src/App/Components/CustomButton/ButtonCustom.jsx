import { Button } from "@mui/material";
import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
const ButtonCustom = ({handle}) => {
  return (
    <React.Fragment>
      <Button
        variant="contained"
        onClick={handle}
        startIcon={<ArrowBackIosIcon />}
        sx={{
          backgroundColor: "#1976d2",
          color: "#fff",
          padding: "8px 16px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          textTransform: "none",
          fontWeight: 500,
          "&:hover": {
            backgroundColor: "#1565c0",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
          },
          "&:active": {
            backgroundColor: "#104d9e",
          },
          "& .MuiButton-startIcon": {
            marginRight: "8px",
          },
        }}
      >
        Quay lại
      </Button>
    </React.Fragment>
  );
};

export default ButtonCustom;
