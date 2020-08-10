import * as types from '../types/index';
import * as routes from './routes';
import { shouldUpdate } from './common';
import httpFacade from '../facades/http/httpFacade';

const httpProvider = httpFacade.getProvider();

export const getMaturityCategory = id => ({
  type: types.GET_MATURITY_CATEGORY,
  payload: { id }
});

export const retrieveMaturityCategories = () => {
  return async (dispatch) => {
    const maturityCategories = await httpProvider.getAsync(routes.maturityCategoriesRoot);
    dispatch({ type: types.RETRIEVE_USERS, payload: { maturityCategories } });
    return maturityCategories;
  };
};

export const createMaturityCategory = (createdMaturityCategory) => {
  return async (dispatch) => {
    const maturityCategory = await httpProvider.createAsync(routes.maturityCategoriesRoot, createdMaturityCategory);
    dispatch({ type: types.CREATE_MATURITY_CATEGORY, payload: { maturityCategory } });
    return maturityCategory;
  };
};

export const updateMaturityCategory = (updatedMaturityCategory) => {
  return async (dispatch, getState) => {
    const target = getState().maturityCategories.find(s => s.id === updatedMaturityCategory.id);
    if (!shouldUpdate(updatedMaturityCategory, target)) return Promise.resolve(updatedMaturityCategory);
    const maturityCategory = await httpProvider
      .updateAsync(routes.maturityCategoryRoot, updatedMaturityCategory.id, updatedMaturityCategory);

    dispatch({ type: types.UPDATE_MATURITY_CATEGORY, payload: { maturityCategory } });
    return maturityCategory;
  };
};

export const deleteMaturityCategory = (id) => {
  return async (dispatch) => {
    await httpProvider.deleteAsync(routes.maturityCategoryRoot, id);
    dispatch({ type: types.DELETE_MATURITY_CATEGORY, payload: { id } });
  };
};
