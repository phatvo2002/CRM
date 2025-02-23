import { Grid2, TextField, Typography } from "@mui/material";
import React from "react";

const ThongTinChiTietTab = ({ baoGiaData }) => {
  return (
    <Grid2>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Thông tin chi tiết
      </Typography>
      <Grid2 container spacing={2}>
        <Grid2 size={6} sx={{ display: "flex", alignItems: "center", gap: 5 }}>
          <Typography
            variant="body1"
            sx={{ width: 150, textAlign: "right", lineHeight: "1.4375em" , paddingTop:2 }}
          >
            Mã báo giá
          </Typography>
          <TextField id="standard-basic" value={baoGiaData?.id} variant="standard" fullWidth />
        </Grid2>
        <Grid2 size={6} sx={{ display: "flex", alignItems: "center", gap: 5 }}>
          <Typography
            variant="body1"
            sx={{ width: 150, textAlign: "right", lineHeight: "1.4375em" , paddingTop:2 }}
          >
            Tên báo giá
          </Typography>
          <TextField id="standard-basic" value={baoGiaData?.tenBaoGia} variant="standard" fullWidth />
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default ThongTinChiTietTab;
