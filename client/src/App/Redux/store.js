import { configureStore } from '@reduxjs/toolkit';
import { apiPhongban } from '../Api/Phongban';

const store = configureStore({
  reducer: {
    [apiPhongban.reducerPath]: apiPhongban.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiPhongban.middleware),
});

export default store;