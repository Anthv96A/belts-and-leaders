import userReducer from '../../../store/reducers/users';
import * as types from '../../../store/types/index';

describe('User Reducer', () => {
  it('Should return an empty array on an invalid action type', () => {
    const state = mockState();
    const result = userReducer(state, { type: 'UNKNOWN' });
    expect(result).toEqual([]);
  });

  it('Should retrieve all users from payload', () => {
    const user = createUser();
    const state = mockState();
    const payload = {
      users: [user]
    };

    const result = userReducer(state, { type: types.RETRIEVE_USERS, payload });
    expect(result.length).toEqual(1);
    expect(result[0]).toEqual(user);
  });

  it('Should get a user from state', () => {
    const user = createUser();
    const state = mockState(mock => mock.push(user));

    const result = userReducer(state, { type: types.GET_USER, payload: { id: user.id } });
    expect(result).toEqual(user);
  });

  it('Should create a user then add to state', () => {
    const user = createUser();
    const state = mockState();
    const result = userReducer(state, { type: types.CREATE_USER, payload: { user } });
    expect(result[0]).toEqual(user);
  });

  it('Should update a user then add to state', () => {
    const user = createUser();
    const state = mockState(mock => mock.push(user));
    const updateUser = { ...user, name: 'test2' };

    const result = userReducer(state, { type: types.UPDATE_USER, payload: { user: updateUser } });
    expect(result.length).toEqual(1);
    expect(result[0]).toEqual(updateUser);
  });

  it('Should delete a user then remove from state', () => {
    const user = createUser();
    const state = mockState(mock => mock.push(user));

    const result = userReducer(state, { type: types.DELETE_USER, payload: { id: user.id } });
    expect(result.length).toEqual(0);
  });
});

function mockState(config = null) {
  const mock = [];
  if (config) config(mock);
  return mock;
}


function createUser(config = null) {
  const user = {
    id: 1,
    name: 'test',
    email: 'test@example.com',
    maturityLevel: 25,
    belt: 'black',
    specialistArea: 'test',
    championStartDate: new Date()
  };

  if (config) config(user);
  return user;
}
