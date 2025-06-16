import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import goodsReducer from '../features/challenge/goods/goodsSlice';
import clothesReducer from '../features/challenge/cloths/clothesSlice';
import appliancesReducer from '../features/challenge/appliance/appliancesSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    goods: goodsReducer,
    cloths: clothesReducer,
    appliances: appliancesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
