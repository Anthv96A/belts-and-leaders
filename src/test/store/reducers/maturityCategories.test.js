import maturityCategoriesReducer from '../../../store/reducers/maturityCategories';
import * as types from '../../../store/types/index';

describe('Maturity Categories Reducer', () => {
  it('Should return an empty array on an invalid action type', () => {
    const state = mockState();
    const result = maturityCategoriesReducer(state, { type: 'UNKNOWN' });
    expect(result).toEqual([]);
  });

  it('Should retrieve all maturity categories from payload', () => {
    const maturityCategory = createMaturityCategory();
    const state = mockState();
    const payload = {
      maturityCategories: [maturityCategory]
    };

    const result = maturityCategoriesReducer(state, { type: types.RETRIEVE_MATURITY_CATEGORIES, payload });
    expect(result.length).toEqual(1);
    expect(result[0]).toEqual(maturityCategory);
  });

  it('Should return an empty array if maturity categories from payload', () => {
    const state = mockState();
    const payload = {
      maturityCategories: []
    };

    const result = maturityCategoriesReducer(state, { type: types.RETRIEVE_MATURITY_CATEGORIES, payload });
    expect(result.length).toEqual(0);
  });

  it('Should get a maturity category from state', () => {
    const maturityCategory = createMaturityCategory();
    const state = mockState(mock => mock.push(maturityCategory));

    const result = maturityCategoriesReducer(state, { type: types.GET_MATURITY_CATEGORY, payload: { id: maturityCategory.id } });
    expect(result).toEqual(maturityCategory);
  });

  it('Should create a maturity category then add to state', () => {
    const maturityCategory = createMaturityCategory();
    const state = mockState();
    const result = maturityCategoriesReducer(state, { type: types.CREATE_MATURITY_CATEGORY, payload: { maturityCategory } });
    expect(result[0]).toEqual(maturityCategory);
  });

  it('Should update a maturity category then add to state', () => {
    const maturityCategory = createMaturityCategory();
    const state = mockState(mock => mock.push(maturityCategory));
    const updated = { ...maturityCategory, name: 'test2' };

    const result = maturityCategoriesReducer(state, { type: types.UPDATE_MATURITY_CATEGORY, payload: { maturityCategory: updated } });
    expect(result.length).toEqual(1);
    expect(result[0]).toEqual(updated);
  });

  it('Should delete a maturity category then remove from state', () => {
    const maturityCategory = createMaturityCategory();
    const state = mockState(mock => mock.push(maturityCategory));

    const result = maturityCategoriesReducer(state, { type: types.DELETE_MATURITY_CATEGORY, payload: { id: maturityCategory.id } });
    expect(result.length).toEqual(0);
  });
});

function mockState(config = null) {
  const mock = [];
  if (config) config(mock);
  return mock;
}


function createMaturityCategory(config = null) {
  const maturity = {
    id: 1,
    name: 'name'
  };

  if (config) config(maturity);
  return maturity;
}
