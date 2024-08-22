import React from "react";
import { Grid } from "@mui/material";
import Deposits from "../Dashbroad/Deposits";
import Paper from "@mui/material/Paper";
const BanLamViec = () => {
  return (
    <Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 240,
          }}
        >
          <Deposits />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default BanLamViec;
