'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');
  const PASSWORD = {
    ACTUAL: 'Password is actual.',
    SHOULD_CHANGE: 'You should change your password.',
    IMMEDIATELY_CHANGE: 'Immediately change the password!',
  };

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    const result = isPasswordActual(2020, 6, 9);

    expect(typeof result).toBe('string');
  });

  it(`Shouldn't ask for a password change if`
    + ` it's less than 30 days old`, () => {
    expect(isPasswordActual(2022, 10, 1))
      .toBe(PASSWORD.ACTUAL);
  });

  it(`should return the correct message if the password`
    + ` is more than 30 days but less than 60`, () => {
    expect(isPasswordActual(2022, 9, 1))
      .toBe(PASSWORD.SHOULD_CHANGE);
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    expect(isPasswordActual(2021, 10, 12))
      .toBe(PASSWORD.IMMEDIATELY_CHANGE);
  });
});
