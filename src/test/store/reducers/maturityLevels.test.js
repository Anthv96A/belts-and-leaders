import maturityLevelsReducer from '../../../store/reducers/maturityLevels';
import * as types from '../../../store/types/index';

describe('Maturity Levels Reducer', () => {
  it('Should return an empty array on an invalid action type', () => {
    const state = mockState();
    const result = maturityLevelsReducer(state, { type: 'UNKNOWN' });
    expect(result).toEqual([]);
  });

  it('Should retrieve all maturity levels from payload', () => {
    const maturityLevel = createMaturityLevel();
    const state = mockState();
    const payload = {
      maturityLevels: [maturityLevel]
    };

    const result = maturityLevelsReducer(state, { type: types.RETRIEVE_MATURITY_LEVELS, payload });
    expect(result.length).toEqual(1);
    expect(result[0]).toEqual(maturityLevel);
  });

  it('Should return an empty array if maturity levels from payload', () => {
    const state = mockState();
    const payload = {
      maturityLevels: []
    };

    const result = maturityLevelsReducer(state, { type: types.RETRIEVE_MATURITY_LEVELS, payload });
    expect(result.length).toEqual(0);
  });

  it('Should get a maturity level from state', () => {
    const maturityLevel = createMaturityLevel();
    const state = mockState(mock => mock.push(maturityLevel));

    const result = maturityLevelsReducer(state, { type: types.GET_MATURITY_LEVEL, payload: { id: maturityLevel.id } });
    expect(result).toEqual(maturityLevel);
  });

  it('Should create a maturity level then add to state', () => {
    const maturityLevel = createMaturityLevel();
    const state = mockState();
    const result = maturityLevelsReducer(state, { type: types.CREATE_MATURITY_LEVEL, payload: { maturityLevel } });
    expect(result[0]).toEqual(maturityLevel);
  });

  it('Should update a maturity level then add to state', () => {
    const maturityLevel = createMaturityLevel();
    const state = mockState(mock => mock.push(maturityLevel));
    const updateMaturityLevel = { ...maturityLevel, name: 'test2' };

    const result = maturityLevelsReducer(state, { type: types.UPDATE_MATURITY_LEVEL, payload: { maturityLevel: updateMaturityLevel } });
    expect(result.length).toEqual(1);
    expect(result[0]).toEqual(updateMaturityLevel);
  });

  it('Should delete a maturity level then remove from state', () => {
    const maturityLevel = createMaturityLevel();
    const state = mockState(mock => mock.push(maturityLevel));

    const result = maturityLevelsReducer(state, { type: types.DELETE_MATURITY_LEVEL, payload: { id: maturityLevel.id } });
    expect(result.length).toEqual(0);
  });
});

function mockState(config = null) {
  const mock = [];
  if (config) config(mock);
  return mock;
}


function createMaturityLevel(config = null) {
  const maturity = {
    id: 1,
    maturityLevel: 'name',
    maturityCategoryId: 'maturityCategoryId',
    description: 'description'
  };

  if (config) config(maturity);
  return maturity;
}
