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

  it(`should ask to change the password if was changed a year ago`, () => {
    expect(isPasswordActual(2021, 9, 9))
      .toBe('You should change your password.');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    expect(isPasswordActual(2021, 10, 20))
      .toBe('Password is actual.');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    expect(isPasswordActual(0, 0, 0))
      .toBe('Immediately change the password!');
  });

  // write more tests here
});
