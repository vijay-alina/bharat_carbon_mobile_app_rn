import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import DropdownReducer from '../features/dropdown/dropdownSlice';
import NutritionReducer from '../features/nutrition/nutritionSlice';
import HousingDataReducer from '../features/housingData/housingDataSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    dropdown: DropdownReducer,
    nutrition: NutritionReducer,
    housingData: HousingDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
