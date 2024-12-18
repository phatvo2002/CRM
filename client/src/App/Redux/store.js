import { configureStore } from '@reduxjs/toolkit';
import { apiPhongban } from '../Api/Phongban';
import { apiUser } from 'App/Api/UserApi';
import { apiMenu } from 'App/Api/MenuApi';
import { apiGetData } from 'App/Api/GetDataApi';
import { apiKhachHangTiemNang } from 'App/Api/KhachHangTiemNangApi';
const store = configureStore({
  reducer: {
    [apiPhongban.reducerPath]: apiPhongban.reducer,
    [apiUser.reducerPath]: apiUser.reducer,
    [apiMenu.reducerPath]: apiMenu.reducer,
    [apiGetData.reducerPath]: apiGetData.reducer,
    [apiKhachHangTiemNang.reducerPath] : apiKhachHangTiemNang.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiPhongban.middleware , apiUser.middleware ,apiMenu.middleware,apiGetData.middleware,apiKhachHangTiemNang.middleware),
});

export default store;