import authReducer from '../../../store/reducers/auth';
import { AAD_LOGIN_SUCCESS, AAD_LOGOUT_SUCCESS } from '../../../store/types/index';

describe('Auth Reducer', () => {
  it('Should return default state if non existant type is passed', () => {
    const mockInitialState = mockAuthState();

    const returnedState = authReducer(mockInitialState, { type: 'NONE-EXISTANT' });
    expect(returnedState).toEqual(mockInitialState);
  });

  it('Should return a login state of authenticated to be valid on type \'AAD_LOGIN_SUCCESS\'', () => {
    const payload = {
      jwtIdToken: 'test token',
      account: {
        name: 'Anth',
        email: 'test@test.com'
      }
    };
    const mockState = mockAuthState();
    const configuredPayload = mockPayload((mock) => {
      mock.account = { ...payload.account };
      mock.jwtIdToken = payload.jwtIdToken;
    });

    const {
      account, isAuth, logInTime, jwtIdToken
    } = authReducer(mockState, { type: AAD_LOGIN_SUCCESS, payload: configuredPayload });

    expect(account).toEqual(payload.account);
    expect(jwtIdToken).toEqual(payload.jwtIdToken);
    expect(isAuth).toBe(true);
    expect(logInTime).toBeInstanceOf(Date);
  });

  it('Should return a login state of logout to be valid on type \'AAD_LOGOUT_SUCCESS\'', () => {
    const mockState = mockAuthState();
    const {
      account, isAuth, logInTime, jwtIdToken
    } = authReducer(mockState, { type: AAD_LOGOUT_SUCCESS });

    expect(account).toBe(null);
    expect(isAuth).toBe(false);
    expect(logInTime).toBe(null);
    expect(jwtIdToken).toBe(null);
  });
});

function mockPayload(config = null) {
  const mock = {
    jwtIdToken: 'jwtIdToken',
    account: {}
  };

  if (config) config(mock);
  return mock;
}

function mockAuthState(config = null) {
  const mock = {
    jwtIdToken: null,
    account: null,
    isAuth: false,
    logInTime: null
  };
  if (config) config(mock);
  return mock;
}
