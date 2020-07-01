import * as types from '../types/index';

const maturityLevelsReducer = (state = [], { type, payload }) => {
  switch (type) {
    case types.RETRIEVE_MATURITY_LEVELS:
      return [...payload.maturityLevels];
    case types.GET_MATURITY_LEVEL:
      return state.find(u => u.id === payload.id);
    case types.CREATE_MATURITY_LEVEL:
      return [...state, payload.maturityLevel];
    case types.UPDATE_MATURITY_LEVEL:
      return state.map(u => (u.id !== payload.maturityLevel.id ? u : { ...u, ...payload.maturityLevel }));
    case types.DELETE_MATURITY_LEVEL:
      return state.filter(u => u.id !== payload.id);
    default:
      return state;
  }
};

export default maturityLevelsReducer;
