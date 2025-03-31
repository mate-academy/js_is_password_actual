'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    expect(typeof isPasswordActual(2022, 1, 9)).toBe('string');
  });

  it(`should ask to change the password if it was changed a year ago`, () => {
    expect(isPasswordActual(2020, 6, 9))
      .toBe('Immediately change the password!');
  });

  it(`should return password is actual if
    it was changed less than 30 days ago`, () => {
    expect(isPasswordActual(2023, 10, 1))
      .toBe('Password is actual.');
  });

  it(`should ask to change the password if it  was changed
    more than mounth ago`, () => {
    expect(isPasswordActual(2022, 12, 10))
      .toBe('You should change your password.');
  });
});
