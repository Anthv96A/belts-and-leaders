import * as types from '../types/index';

const achievementsReducer = (state = [], { type, payload }) => {
  switch (type) {
    case types.RETRIEVE_ACHIEVEMENTS:
      return [...payload.achievements];
    case types.GET_ACHIEVEMENT:
      return state.find(u => u.id === payload.id);
    case types.CREATE_ACHIEVEMENT:
      return [...state, payload.achievement];
    case types.UPDATE_ACHIEVEMENT:
      return state.map(u => (u.id !== payload.achievement.id ? u : { ...u, ...payload.achievement }));
    case types.DELETE_ACHIEVEMENT:
      return state.filter(u => u.id !== payload.id);
    default:
      return state;
  }
};

export default achievementsReducer;
