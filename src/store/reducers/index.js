import { combineReducers } from 'redux';
import usersReducer from './users';
import achievementsReducer from './achievements';
import maturityCategoriesReducer from './maturityCategories';
import maturityLevelsReducer from './maturityLevels';

export default combineReducers({
  users: usersReducer,
  achievements: achievementsReducer,
  maturityCategories: maturityCategoriesReducer,
  maturityLevels: maturityLevelsReducer
});
