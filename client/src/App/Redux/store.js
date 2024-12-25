import { configureStore } from '@reduxjs/toolkit';
import { apiPhongban } from '../Api/Phongban';
import { apiUser } from 'src/App/Api/UserApi';
import { apiMenu } from 'src/App/Api/MenuApi';
import { apiGetData } from 'src/App/Api/GetDataApi';
import { apiKhachHangTiemNang } from 'src/App/Api/KhachHangTiemNangApi';
import { apiCuocGoi } from 'src/App/Api/CuocGoiApi';
import { apiNhiemVu } from 'src/App/Api/NhiemVuApi';
import { apiLichHen } from 'src/App/Api/LichhenApi';

const apis = [
  apiPhongban,
  apiUser,
  apiMenu,
  apiGetData,
  apiKhachHangTiemNang,
  apiCuocGoi,
  apiNhiemVu,
  apiLichHen
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