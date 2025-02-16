import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Moment from "react-moment";
import { useParams } from "react-router-dom";
import { useGetCoHoiByIdQuery } from "src/App/Api/CoHoiApi";
import { useGetKhachHangMucTieuByIdQuery } from "src/App/Api/KhachHangMucTieuApi";
import { useGetAllGiaiDoanBanHangQuery } from "src/App/Api/GiaiDoanBanHangApi";

const ThongTinChungTab = () => {
  const { id } = useParams();

  const { data: dataCoHoi, isLoading } = useGetCoHoiByIdQuery(id);
  const { data: KhachhangData } = useGetKhachHangMucTieuByIdQuery(id);

  const doanhSoKyVongResult =
    (dataCoHoi?.soTien * dataCoHoi?.tiLeThanhCong) / 100;

  return (
    <>
      <Typography
        sx={{ margin: 2, fontWeight: "bold" }}
        variant="h5"
        component="h5"
      >
        Thông tin chung
      </Typography>

      <Grid container spacing={4} sx={{ padding: 2 }}>
        <Grid item xs={6}>
          <InputLabel shrink={false}>
            <Typography variant="body2">Mã khách hàng</Typography>
          </InputLabel>
          <TextField
            fullWidth
            variant="outlined"
            disabled
            value={dataCoHoi?.maKhachHang}
          />
        </Grid>

        {/* <Grid item xs={6}>
          <InputLabel shrink={false}>
            <Typography variant="body2">Tên khách hàng</Typography>
          </InputLabel>
          <TextField
            fullWidth
            variant="outlined"
            disabled
            value={KhachhangData?.tenKhachHang}
          />
        </Grid> */}

        <Grid item xs={6}>
          <InputLabel shrink={false}>
            <Typography variant="body2">Tên cơ hội</Typography>
          </InputLabel>
          <TextField
            fullWidth
            variant="outlined"
            value={dataCoHoi?.tenCoHoi}
            disabled
            required
          />
        </Grid>

        <Grid item xs={6}>
          <InputLabel shrink={false}>
            <Typography variant="body2">Loại cơ hội</Typography>
          </InputLabel>
          <TextField
            fullWidth
            placeholder="- Không chọn -"
            variant="outlined"
            disabled
            required
          />
        </Grid>

        <Grid item xs={6}>
          <InputLabel shrink={false}>
            <Typography variant="body2">Loại hàng hóa</Typography>
          </InputLabel>
          <TextField
            fullWidth
            placeholder="- Không chọn -"
            variant="outlined"
            disabled
            required
          />
        </Grid>

        <Grid item xs={6}>
          <InputLabel shrink={false}>
            <Typography variant="body2">Số tiền</Typography>
          </InputLabel>
          <TextField
            fullWidth
            variant="outlined"
            value={dataCoHoi?.soTien}
            disabled
            required
          />
        </Grid>

        <Grid item xs={6}>
          <InputLabel shrink={false}>
            <Typography variant="body2">Giai đoạn</Typography>
          </InputLabel>
          <TextField
            fullWidth
            variant="outlined"
            disabled
            value={dataCoHoi?.giaiDoanBanHang?.tenGiaiDoan}
          />
        </Grid>

        <Grid item xs={6}>
          <InputLabel shrink={false}>
            <Typography variant="body2">Tỉ lệ thành công</Typography>
          </InputLabel>
          <TextField
            fullWidth
            variant="outlined"
            disabled
            value={dataCoHoi?.tiLeThanhCong}
          />
        </Grid>

        <Grid item xs={6}>
          <InputLabel shrink={false}>
            <Typography variant="body2">Doanh số kỳ vọng</Typography>
          </InputLabel>
          <TextField
            fullWidth
            variant="outlined"
            disabled
            value={doanhSoKyVongResult.toLocaleString("vi-VN")}
          />
        </Grid>

        <Grid item xs={6}>
          <InputLabel shrink={false}>
            <Typography variant="body2">Ngày kỳ vọng kết thúc</Typography>
          </InputLabel>
          <TextField
            format="DD/MM/YYYY"
            fullWidth
            variant="outlined"
            disabled
            value={
              dataCoHoi?.ngayKyVongKetThuc
                ? new Date(dataCoHoi.ngayKyVongKetThuc).toLocaleDateString(
                    "vi-VN"
                  )
                : ""
            }
          />
        </Grid>

        <Grid item xs={6}>
          <InputLabel shrink={false}>
            <Typography variant="body2">Nguồn gốc</Typography>
          </InputLabel>
          <TextField
            fullWidth
            placeholder="- Không chọn -"
            variant="outlined"
            disabled
            required
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ThongTinChungTab;
