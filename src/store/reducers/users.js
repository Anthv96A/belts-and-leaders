import * as types from '../types/index';

const userReducer = (state = [], { type, payload }) => {
  switch (type) {
    case types.RETRIEVE_USERS:
      return payload?.users?.length > 0 ? [...payload.users] : [];
    case types.GET_USER:
      return state.find(u => u.id === payload.id);
    case types.CREATE_USER:
      return [...state, payload.user];
    case types.UPDATE_USER:
      return state.map(u => (u.id !== payload.user.id ? u : { ...u, ...payload.user }));
    case types.DELETE_USER:
      return state.filter(u => u.id !== payload.id);
    default:
      return state;
  }
};

export default userReducer;
