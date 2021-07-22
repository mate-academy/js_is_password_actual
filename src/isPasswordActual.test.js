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

  it(`should return message that password is actual if changed today`, () => {
    expect(isPasswordActual(2021, 7, 22))
      .toBe('Password is actual.');
  });

  it(`should return message that password should changed 
  if password uptaded more 30 days ago`, () => {
    expect(isPasswordActual(2021, 6, 20))
      .toBe('You should change your password.');
  });
});
