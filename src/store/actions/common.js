export function shouldUpdate(value, target) {
  if (!target || !value) return false;

  const userKeys = Object.keys(value);

  if (userKeys.length !== Object.keys(target).length) return true;

  return userKeys.some((k) => {
    const valueProp = value[k];
    const targetProp = target[k];
    if (!areValuesSameType(valueProp, targetProp)) return true;

    if (Array.isArray(valueProp)) return areArraysEqual(valueProp, targetProp) === false;

    if (isObject(valueProp)) return shouldUpdate(valueProp, targetProp);
    return valueProp !== targetProp;
  });
}

function areArraysEqual(value, target) {
  if (value.length !== target.length) return false;
  const valueSorted = value.sort();
  const targetSorted = target.sort();

  return valueSorted.every((v, index) => {
    const targetProp = targetSorted[index];
    if (typeof v === 'object') return shouldUpdate(v, targetProp) === false;
    return v === targetProp;
  });
}

function areValuesSameType(value, target) {
  return typeof value === typeof target;
}

function isObject(value) {
  return typeof value === 'object' && value.constructor === Object;
}
