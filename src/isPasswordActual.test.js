'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    expect(typeof isPasswordActual()).toBe('string');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    expect(isPasswordActual(2020, 7, 20))
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password if was changed a 61 day ago`, () => {
    expect(isPasswordActual(2021, 5, 20))
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password if was changed a 60 day ago`, () => {
    expect(isPasswordActual(2021, 5, 21))
      .toBe('You should change your password.');
  });

  it(`should ask to change the password if was changed a 31 day ago`, () => {
    expect(isPasswordActual(2021, 6, 19))
      .toBe('You should change your password.');
  });

  it(`should ask to change the password if was changed a 30 day ago`, () => {
    expect(isPasswordActual(2021, 6, 20))
      .toBe('Password is actual.');
  });

  it(`User created a password today, display a message: 
  "Password is actual."`, () => {
    expect(isPasswordActual(2021, 7, 20))
      .toBe('Password is actual.');
  });
});
