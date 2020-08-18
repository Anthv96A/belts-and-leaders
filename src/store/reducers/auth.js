import { AAD_LOGIN_SUCCESS, AAD_LOGOUT_SUCCESS } from '../types/index';

const initialState = {
  jwtIdToken: null,
  account: null,
  isAuth: false,
  logInTime: null
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AAD_LOGIN_SUCCESS:
      return {
        ...state, jwtIdToken: payload.jwtIdToken, account: payload.account, isAuth: true, logInTime: new Date()
      };
    case AAD_LOGOUT_SUCCESS:
      return {
        ...state, jwtIdToken: null, account: null, isAuth: false, logInTime: null
      };
    default:
      return state;
  }
};

export default authReducer;
