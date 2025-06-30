import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useGetKhachHangTiemNangByIdQuery } from "src/App/Api/KhachHangTiemNangApi";
import React from "react";
import { useParams } from "react-router-dom";

const ThongTInChiTietTab = (props) => {
  const { id } = useParams();
  const { data: dataKhachHangById } =
    useGetKhachHangTiemNangByIdQuery(id);
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
            <Typography variant="body2">Xưng hô</Typography>
          </InputLabel>
          <TextField
            fullWidth
            label="Xưng hô (Anh/Chị)"
            variant="outlined"
            select
          >
            <MenuItem value="Anh">Anh</MenuItem>
            <MenuItem value="Chị">Chị</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <InputLabel shrink={false}>
            <Typography variant="body2">Họ và đệm</Typography>
          </InputLabel>
          <TextField
            fullWidth
            placeholder="Họ và đệm"
            variant="outlined"
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <InputLabel shrink={false}>
            <Typography variant="body2">Tên</Typography>
          </InputLabel>
          <TextField
            fullWidth
            placeholder="Tên"
            variant="outlined"
            value={dataKhachHangById?.tenKhachHang}
            disabled
            required
          />
        </Grid>
        <Grid item xs={6}>
          <InputLabel shrink={false}>
            <Typography variant="body2">Họ và tên</Typography>
          </InputLabel>
          <TextField
            fullWidth
            variant="outlined"
            disabled
            value={dataKhachHangById?.tenKhachHang}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2">Phòng ban</Typography>
          <FormControl fullWidth>
            <Select defaultValue="Phòng giám đốc">
              <MenuItem value="Phòng giám đốc">Phòng giám đốc</MenuItem>
              <MenuItem value="Phòng kế toán">Phòng kế toán</MenuItem>
              <MenuItem value="Phòng chăm sóc khách hàng">
                Phòng chăm sóc khách hàng
              </MenuItem>
              <MenuItem value="Phòng nhân sự">Phòng nhân sự</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2">Chức danh</Typography>
          <FormControl fullWidth>
            <InputLabel shrink={false}>Chức danh</InputLabel>
            <Select defaultValue="">
              <MenuItem value="Trưởng phòng">Trưởng phòng</MenuItem>
              <MenuItem value="Giám đốc">Giám đốc</MenuItem>
              <MenuItem value="Nhân viên">Nhân viên</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <InputLabel shrink={false}>
            <Typography variant="body2">Số điện thoại cá nhân</Typography>
          </InputLabel>
          <TextField
            fullWidth
            placeholder="Số ĐT cá nhân"
            variant="outlined"
            disabled
            value={dataKhachHangById?.soDienThoaiDiDong}
          />
        </Grid>
        <Grid item xs={6}>
          <InputLabel shrink={false}>
            <Typography variant="body2">Số điện thoại cơ quan</Typography>
          </InputLabel>
          <TextField
            fullWidth
            placeholder="Số ĐT cơ quan"
            variant="outlined"
            disabled
            value={dataKhachHangById?.soDienThoaiCoQuan}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2">Nguồn gốc</Typography>
          <FormControl fullWidth>
            <InputLabel shrink={false}>Nguồn gốc</InputLabel>
            <Select defaultValue="">
              <MenuItem value="Nhân viên kinh doanh tự tìm kiếm">
                Nhân viên kinh doanh tự tìm kiếm
              </MenuItem>
              <MenuItem value="Khách hàng hoặc đối tác giới thiệu">
                Khách hàng hoặc đối tác giới thiệu
              </MenuItem>
              <MenuItem value="Thông qua sự kiện hội thảo, tập huấn">
                Thông qua sự kiện hội thảo, tập huấn
              </MenuItem>
              <MenuItem value="Khách hàng tự tìm đến">
                Khách hàng tự tìm đến
              </MenuItem>
              <MenuItem value="Marketing">Marketing</MenuItem>
              <MenuItem value="Khác">Khác</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <InputLabel shrink={false}>
            <Typography variant="body2">Loại tiềm năng</Typography>
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
            <Typography variant="body2">Zalo</Typography>
          </InputLabel>
          <TextField
            fullWidth
            variant="outlined"
            disabled
            value={dataKhachHangById?.soZalo}
          />
        </Grid>
        <Grid item xs={6}>
          <InputLabel shrink={false}>
            <Typography variant="body2">Email cá nhân</Typography>
          </InputLabel>
          <TextField
            fullWidth
            placeholder="Email cá nhân"
            variant="outlined"
            disabled
            value={dataKhachHangById?.emailCaNhan}
          />
        </Grid>
        <Grid item xs={6}>
          <InputLabel shrink={false}>
            <Typography variant="body2">Email cơ quan</Typography>
          </InputLabel>
          <TextField
            fullWidth
            placeholder="Email cơ quan"
            variant="outlined"
            disabled
            value={dataKhachHangById?.emailCoQuan}
          />
        </Grid>
        <Grid item xs={6}>
          <InputLabel shrink={false}>
            <Typography variant="body2">Tổ chức</Typography>
          </InputLabel>
          <TextField
            fullWidth
            placeholder="Tổ chức"
            variant="outlined"
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <InputLabel shrink={false}>
            <Typography variant="body2">Mã số thuế</Typography>
          </InputLabel>
          <TextField
            fullWidth
            placeholder="Mã số thuế"
            variant="outlined"
            disabled
            value={dataKhachHangById?.maSoThue}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ThongTInChiTietTab;
