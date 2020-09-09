import * as types from '../types/index';

const maturityCategoriesReducer = (state = [], { type, payload }) => {
  switch (type) {
    case types.RETRIEVE_MATURITY_CATEGORIES:
      return payload?.maturityCategories?.length > 0 ? [...payload.maturityCategories] : [];
    case types.GET_MATURITY_CATEGORY:
      return state.find(u => u.id === payload.id);
    case types.CREATE_MATURITY_CATEGORY:
      return [...state, payload.maturityCategory];
    case types.UPDATE_MATURITY_CATEGORY:
      return state.map(u => (u.id !== payload.maturityCategory.id ? u : { ...u, ...payload.maturityCategory }));
    case types.DELETE_MATURITY_CATEGORY:
      return state.filter(u => u.id !== payload.id);
    default:
      return state;
  }
};

export default maturityCategoriesReducer;
