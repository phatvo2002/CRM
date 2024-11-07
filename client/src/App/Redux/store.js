import { configureStore } from '@reduxjs/toolkit';
import { apiPhongban } from '../Api/Phongban';
import { apiUser } from 'App/Api/UserApi';
import { apiMenu } from 'App/Api/MenuApi';
const store = configureStore({
  reducer: {
    [apiPhongban.reducerPath]: apiPhongban.reducer,
    [apiUser.reducerPath]: apiUser.reducer,
    [apiMenu.reducerPath]: apiMenu.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiPhongban.middleware , apiUser.middleware ,apiMenu.middleware),
});

export default store;