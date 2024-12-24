import { configureStore } from '@reduxjs/toolkit';
import { apiPhongban } from '../Api/Phongban';
import { apiUser } from 'App/Api/UserApi';
import { apiMenu } from 'App/Api/MenuApi';
import { apiGetData } from 'App/Api/GetDataApi';
import { apiKhachHangTiemNang } from 'App/Api/KhachHangTiemNangApi';
import { apiCuocGoi } from 'App/Api/CuocGoiApi';
import { apiNhiemVu } from 'App/Api/NhiemVuApi';
import { apiLichHen } from 'App/Api/LichhenApi';

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