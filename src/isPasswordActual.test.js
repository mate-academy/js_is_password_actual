'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    expect(typeof isPasswordActual(2020, 6, 9))
      .toBe('string');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    expect(isPasswordActual(2020, 10, 25))
      .toBe('Immediately change the password!');
  });

  it(`should remind to change password if changed a month ago`, () => {
    expect(isPasswordActual(2021, 9, 24))
      .toBe('You should change your password.');
  });

  it(`should return "Password is actual."
   if changed less than a month ago`, () => {
    expect(isPasswordActual(2021, 9, 27))
      .toBe('Password is actual.');
  });

  it(`should remind to change password
   if changed less then two month ago`, () => {
    expect(isPasswordActual(2021, 8, 27))
      .toBe('You should change your password.');
  });

  it(`should ask to change the password
   if was changed more than two month ago`, () => {
    expect(isPasswordActual(2021, 8, 24))
      .toBe('Immediately change the password!');
  });

  // write more tests here
});
