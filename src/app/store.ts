import {configureStore, combineReducers} from '@reduxjs/toolkit';

import userReducer from '../features/user/userSlice';
import DropdownReducer from '../features/dropdown/dropdownSlice';
import NutritionReducer from '../features/nutrition/nutritionSlice';
import HousingDataReducer from '../features/housingData/housingDataSlice';
import goodsReducer from '../features/challenge/goods/goodsSlice';
import clothesReducer from '../features/challenge/cloths/clothesSlice';
import appliancesReducer from '../features/challenge/appliance/appliancesSlice';
import manageChallengeReducer from '../features/manageChallege/manageChallengeSlice';
import analyticsReducer from '../features/analytics/analyticsSlice';
import leaderboardReducer from '../features/leaderboard/leaderboardSlice';
import memberReducer from '../features/challenge/addMember/addMemberSlice';
import activitiesReducer from '../features/activities/activitySlice';
import myProfileReducer from '../features/myProfile/myProfileSlice';

// Combine all your reducers
const appReducer = combineReducers({
  user: userReducer,
  dropdown: DropdownReducer,
  nutrition: NutritionReducer,
  housingData: HousingDataReducer,
  goods: goodsReducer,
  cloths: clothesReducer,
  appliances: appliancesReducer,
  manageChallenge: manageChallengeReducer,
  analytics: analyticsReducer,
  leaderboard: leaderboardReducer,
  members: memberReducer,
  activities: activitiesReducer,
  myProfile: myProfileReducer,
});

// Root reducer with RESET_APP logic
const rootReducer = (state: any, action: any) => {
  if (action.type === 'RESET_APP') {
    state = undefined; // 💥 reset entire store to initial states
  }
  return appReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
