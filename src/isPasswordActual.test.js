'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    expect(typeof isPasswordActual(2020, 6, 9)).toBe('string');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    expect(isPasswordActual(2020, 6, 9))
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password if was
  changed less than a mounth ago`, () => {
    expect(isPasswordActual(2022, 7, 1))
      .toBe('You should change your password.');
  });

  it(`should report that the password is valid if it
  is less than 30 days old`, () => {
    expect(isPasswordActual(2022, 7, 9))
      .toBe('Password is actual.');
  });
});
