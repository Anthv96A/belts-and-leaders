import { shouldUpdate } from '../../../store/actions/common';

describe('Should Update', () => {
  it('Should return false if no changes are present', () => {
    const user = createUser();

    const result = shouldUpdate(user, user);
    expect(result).toBe(false);
  });

  it('Should return true if value key type changes', () => {
    const user = createUser((mock) => { mock.maturityLevel = 10; });
    const copy = { ...user };
    copy.maturityLevel = '10';

    const result = shouldUpdate(copy, user);
    expect(result).toBe(true);
  });

  it('Should return true if value array has changed in value length', () => {
    const user = createUser((mock) => { mock.test = [11, 10]; });
    const copy = { ...user, test: [11] };

    const result = shouldUpdate(copy, user);
    expect(result).toBe(true);
  });

  it('Should return false if value array has not changed in value length', () => {
    const user = createUser((mock) => { mock.test = [11, 10]; });
    const copy = { ...user, test: [11, 10] };

    const result = shouldUpdate(copy, user);
    expect(result).toBe(false);
  });

  it('Should return true if the value in array has changed', () => {
    const user = createUser((mock) => { mock.test = [11, 20]; });
    const copy = { ...user, test: [11, 10] };

    const result = shouldUpdate(copy, user);
    expect(result).toBe(true);
  });

  it('Should return false if the value in array contains an object and has\'nt changed', () => {
    const user = createUser((mock) => { mock.test = [11, 10, { name: 'anth' }]; });
    const copy = { ...user, test: [11, 10, { name: 'anth' }] };

    const result = shouldUpdate(copy, user);
    expect(result).toBe(false);
  });

  it('Should return true if the value in array contains an object and has changed', () => {
    const user = createUser((mock) => { mock.test = [11, 10, { name: 'anth' }]; });
    const copy = { ...user, test: [11, 10, { name: 'test' }] };

    const result = shouldUpdate(copy, user);
    expect(result).toBe(true);
  });

  it('Should return true if the value in array contains an object and has changed on deep nested obj', () => {
    const user = createUser((mock) => { mock.test = [11, 10, { name: 'anth', someOtherArry: [{ name: 't1' }] }]; });
    const copy = { ...user, test: [11, 10, { name: 'anth', someOtherAr: [{ name: 't2' }] }] };

    const result = shouldUpdate(copy, user);
    expect(result).toBe(true);
  });

  it('Should return true if changes are present on the target value', () => {
    const user = createUser();

    const copy = { ...user };
    copy.name = 'updated';

    const result = shouldUpdate(copy, user);
    expect(result).toBe(true);
  });

  it('Should return true if changes are present on the target value on a object property', () => {
    const user = createUser((mock) => { mock.test = { a: 1, b: 2 }; });

    const copy = { ...user };
    copy.test = { ...copy.test, b: 3000 };

    const result = shouldUpdate(copy, user);
    expect(result).toBe(true);
  });


  it('Should return true if changes are present on the target value on a deeply nested object property', () => {
    const user = createUser((mock) => {
      mock.test = { a: 1, b: 2, c: { d: 3, e: 4, f: { g: 5, h: 6 } } };
    });

    const copy = { ...user };
    copy.test = { ...copy.test, c: { d: 3, e: 4, f: { g: 5, h: 'changed' } } };

    const result = shouldUpdate(copy, user);
    expect(result).toBe(true);
  });

  it('Should return true if the number of keys are not the same on a deeply nested object property', () => {
    const user = createUser((mock) => {
      mock.test = { a: 1, b: 2, c: { d: 3, e: 4, f: { g: 5, h: 6 } } };
    });

    const copy = { ...user };
    copy.test = { ...copy.test, c: { d: 3, e: 4, f: { g: 5, h: 6, i: 7 } } };

    const result = shouldUpdate(copy, user);
    expect(result).toBe(true);
  });


  it('Should return false if no changes are present on the target value on a deeply nested object property', () => {
    const user = createUser((mock) => {
      mock.test = { a: 1, b: 2, c: { d: 3, e: 4, f: { g: 5, h: 6 } } };
    });

    const copy = { ...user };
    copy.test = { ...copy.test, c: { d: 3, e: 4, f: { g: 5, h: 6 } } };

    const result = shouldUpdate(copy, user);
    expect(result).toBe(false);
  });

  it('Should return true if the argument key length don\'t match', () => {
    const user = createUser();

    const copy = { ...user };
    delete copy.championStartDate;

    const result = shouldUpdate(copy, user);
    expect(result).toBe(true);
  });


  it('Should return false if the value is not present', () => {
    const user = createUser();

    const copy = { ...user };
    copy.id = 21;

    const result = shouldUpdate(undefined, user);
    expect(result).toBe(false);
  });


  it('Should return false if the target is not present', () => {
    const user = createUser();

    const copy = { ...user };
    copy.id = 21;

    const result = shouldUpdate(copy, undefined);
    expect(result).toBe(false);
  });
});


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
