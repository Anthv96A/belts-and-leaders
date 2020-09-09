import achievementsReducer from '../../../store/reducers/achievements';
import * as types from '../../../store/types/index';

describe('Achievement Reducer', () => {
  it('Should return an empty array on an invalid action type', () => {
    const state = mockState();
    const result = achievementsReducer(state, { type: 'UNKNOWN' });
    expect(result).toEqual([]);
  });

  it('Should retrieve all achievements from payload', () => {
    const achievement = createAchievement();
    const state = mockState();
    const payload = {
      achievements: [achievement]
    };

    const result = achievementsReducer(state, { type: types.RETRIEVE_ACHIEVEMENTS, payload });
    expect(result.length).toEqual(1);
    expect(result[0]).toEqual(achievement);
  });

  it('Should return an empty array if no achievements from payload', () => {
    const state = mockState();
    const payload = {
      achievements: []
    };

    const result = achievementsReducer(state, { type: types.RETRIEVE_ACHIEVEMENTS, payload });
    expect(result.length).toEqual(0);
  });

  it('Should get a achievement from state', () => {
    const achievement = createAchievement();
    const state = mockState(mock => mock.push(achievement));

    const result = achievementsReducer(state, { type: types.GET_ACHIEVEMENT, payload: { id: achievement.id } });
    expect(result).toEqual(achievement);
  });

  it('Should create a achievement then add to state', () => {
    const achievement = createAchievement();
    const state = mockState();
    const result = achievementsReducer(state, { type: types.CREATE_ACHIEVEMENT, payload: { achievement } });
    expect(result[0]).toEqual(achievement);
  });

  it('Should update a achievement then add to state', () => {
    const achievement = createAchievement();
    const state = mockState(mock => mock.push(achievement));
    const updateAchievement = { ...achievement, name: 'test2' };

    const result = achievementsReducer(state, { type: types.UPDATE_ACHIEVEMENT, payload: { achievement: updateAchievement } });
    expect(result.length).toEqual(1);
    expect(result[0]).toEqual(updateAchievement);
  });

  it('Should delete a achievement then remove from state', () => {
    const achievement = createAchievement();
    const state = mockState(mock => mock.push(achievement));

    const result = achievementsReducer(state, { type: types.DELETE_ACHIEVEMENT, payload: { id: achievement.id } });
    expect(result.length).toEqual(0);
  });
});

function mockState(config = null) {
  const mock = [];
  if (config) config(mock);
  return mock;
}


function createAchievement(config = null) {
  const achievement = {
    id: 1,
    userId: 1,
    achievementDate: new Date(),
    comment: 'comment'
  };

  if (config) config(achievement);
  return achievement;
}
