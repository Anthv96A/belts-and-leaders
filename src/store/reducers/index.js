import { combineReducers } from 'redux';
import usersReducer from './users';
import achievementsReducer from './achievements';
import maturityCategoriesReducer from './maturityCategories';
import maturityLevelsReducer from './maturityLevels';
import authReducer from './auth';

export default combineReducers({
  users: usersReducer,
  achievements: achievementsReducer,
  maturityCategories: maturityCategoriesReducer,
  maturityLevels: maturityLevelsReducer,
  auth: authReducer
});
