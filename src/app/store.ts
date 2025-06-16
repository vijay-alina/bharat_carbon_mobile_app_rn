import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import DropdownReducer from '../features/dropdown/dropdownSlice';
import NutritionReducer from '../features/nutrition/nutritionSlice';
import HousingDataReducer from '../features/housingData/housingDataSlice';
import goodsReducer from '../features/challenge/goods/goodsSlice';
import clothesReducer from '../features/challenge/cloths/clothesSlice';
import appliancesReducer from '../features/challenge/appliance/appliancesSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    dropdown: DropdownReducer,
    nutrition: NutritionReducer,
    housingData: HousingDataReducer,
    goods: goodsReducer,
    cloths: clothesReducer,
    appliances: appliancesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
