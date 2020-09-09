import * as types from '../types/index';
import * as routes from './routes';
import { shouldUpdate } from './common';
import httpFacade from '../facades/http/httpFacade';

const httpProvider = httpFacade.getProvider();

export const getAchievement = id => ({
  type: types.GET_ACHIEVEMENT,
  payload: { id }
});

export const retrieveAchievements = () => {
  return async (dispatch) => {
    const achievements = await httpProvider.getAsync(routes.achievementsRoot);
    dispatch({ type: types.RETRIEVE_USERS, payload: { achievements } });
    return achievements;
  };
};

export const createAchievement = (createdAchievement) => {
  return async (dispatch, getState) => {
    createdAchievement.userId = getState().auth.account?.idToken?.sub;
    const achievement = await httpProvider.createAsync(routes.achievementsRoot, createdAchievement);
    dispatch({ type: types.CREATE_ACHIEVEMENT, payload: { achievement } });
    return achievement;
  };
};

export const updateAchievement = (updatedAchievement) => {
  return async (dispatch, getState) => {
    const target = getState().achievements.find(s => s.id === updatedAchievement.id);
    if (!shouldUpdate(updatedAchievement, target)) return Promise.resolve(updatedAchievement);
    const achievement = await httpProvider.updateAsync(routes.achievementRoot, updatedAchievement.id, updatedAchievement);
    dispatch({ type: types.UPDATE_ACHIEVEMENT, payload: { achievement } });
    return achievement;
  };
};

export const deleteAchievement = (id) => {
  return async (dispatch) => {
    await httpProvider.deleteAsync(routes.achievementRoot, id);
    dispatch({ type: types.DELETE_ACHIEVEMENT, payload: { id } });
  };
};
