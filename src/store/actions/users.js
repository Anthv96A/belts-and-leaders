import * as types from '../types/index';
import * as routes from './routes';
import { shouldUpdate } from './common';
import httpFacade from '../facades/http/httpFacade';

const httpProvider = httpFacade.getProvider();

export const retrieveUsers = () => {
  return async (dispatch) => {
    const users = await httpProvider.getAsync(routes.usersRoot);
    dispatch({ type: types.RETRIEVE_USERS, payload: { users } });
    return users;
  };
};
export const getUser = id => ({
  type: types.GET_USER,
  payload: { id }
});

export const updateUser = (updatedUser) => {
  return async (dispatch, getState) => {
    const target = getState().users.find(s => s.id === updatedUser.id);
    if (!shouldUpdate(updatedUser, target)) return Promise.resolve(updateUser);

    const user = await httpProvider.updateAsync(routes.userRoot, updatedUser.id, updatedUser);
    dispatch({ type: types.UPDATE_USER, payload: { user } });
    return user;
  };
};

export const createUser = (createdUser) => {
  return async (dispatch) => {
    const user = await httpProvider.createAsync(routes.usersRoot, createdUser);
    dispatch({ type: types.CREATE_USER, payload: { user } });
    return user;
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    await httpProvider.deleteAsync(routes.userRoot, id);
    dispatch({ type: types.DELETE_USER, payload: { id } });
  };
};
