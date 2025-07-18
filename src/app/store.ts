import {configureStore} from '@reduxjs/toolkit';
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

const store = configureStore({
  reducer: {
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
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
