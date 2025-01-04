import { configureStore } from '@reduxjs/toolkit';
import { apiPhongban } from '../Api/Phongban';
import { apiUser } from 'src/App/Api/UserApi';
import { apiMenu } from 'src/App/Api/MenuApi';
import { apiGetData } from 'src/App/Api/GetDataApi';
import { apiKhachHangTiemNang } from 'src/App/Api/KhachHangTiemNangApi';
import { apiCuocGoi } from 'src/App/Api/CuocGoiApi';
import { apiNhiemVu } from 'src/App/Api/NhiemVuApi';
import { apiLichHen } from 'src/App/Api/LichhenApi';
import { apiDonViTinh } from 'src/App/Api/DonViTinh';
import { apiLoaiHangHoa } from '../Api/LoaiHangHoa';
import { apiHangHoa } from '../Api/HangHoa';
import { apiFile } from '../Api/FileApi';
import { apiLienHe } from '../Api/LienHeApi';
import { apiHangHoaQuanTam } from '../Api/HangHoaQuanTam';
const apis = [
  apiPhongban,
  apiUser,
  apiMenu,
  apiGetData,
  apiKhachHangTiemNang,
  apiCuocGoi,
  apiNhiemVu,
  apiLichHen,
  apiDonViTinh,
  apiLoaiHangHoa,
  apiHangHoa,
  apiFile,
  apiLienHe,
  apiHangHoaQuanTam
];

const store = configureStore({
  reducer: apis.reduce((acc, api) => {
    acc[api.reducerPath] = api.reducer;
    return acc;
  }, {}),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apis.map(api => api.middleware)),
});

export default store;