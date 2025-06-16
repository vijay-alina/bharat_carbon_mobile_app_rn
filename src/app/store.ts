import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import goodsReducer from '../features/challenge/goods/goodsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    goods: goodsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
