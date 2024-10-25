import { configureStore } from '@reduxjs/toolkit';
import { apiPhongban } from '../Api/Phongban';
import { apiUser } from 'App/Api/UserApi';
const store = configureStore({
  reducer: {
    [apiPhongban.reducerPath]: apiPhongban.reducer,
    [apiUser.reducerPath]: apiUser.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiPhongban.middleware , apiUser.middleware),
});

export default store;