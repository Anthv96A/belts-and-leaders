import * as types from '../types/index';
import * as routes from './routes';
import { shouldUpdate } from './common';
import httpFacade from '../facades/http/httpFacade';

const httpProvider = httpFacade.getProvider();

export const getMaturityLevel = id => ({
  type: types.GET_MATURITY_LEVEL,
  payload: { id }
});

export const retrieveMaturityLevels = () => {
  return async (dispatch) => {
    const maturitys = await httpProvider.getAsync(routes.maturityLevelsRoot);
    dispatch({ type: types.RETRIEVE_USERS, payload: { maturitys } });
    return maturitys;
  };
};

export const createMaturityLevel = (createdMaturityLevel) => {
  return async (dispatch) => {
    const maturityLevel = await httpProvider.createAsync(routes.maturityLevelsRoot, createdMaturityLevel);
    dispatch({ type: types.CREATE_MATURITY_LEVEL, payload: { maturityLevel } });
    return maturityLevel;
  };
};

export const updateMaturityLevel = (updatedMaturityLevel) => {
  return async (dispatch, getState) => {
    const target = getState().maturityLevels.find(s => s.id === updatedMaturityLevel.id);
    if (!shouldUpdate(updatedMaturityLevel, target)) return Promise.resolve(updatedMaturityLevel);
    const maturityLevel = await httpProvider.updateAsync(routes.maturityLevelRoot, updatedMaturityLevel.id, updatedMaturityLevel);
    dispatch({ type: types.UPDATE_MATURITY_LEVEL, payload: { maturityLevel } });
    return maturityLevel;
  };
};

export const deleteMaturityLevel = (id) => {
  return async (dispatch) => {
    await httpProvider.deleteAsync(routes.maturityLevelRoot, id);
    dispatch({ type: types.DELETE_MATURITY_LEVEL, payload: { id } });
  };
};
