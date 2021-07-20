'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    expect(typeof isPasswordActual('hello')).toBe('string');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    expect(isPasswordActual(2020, 6, 9))
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password if more 
  than 30 days have passed since the last password change `, () => {
    expect(isPasswordActual(2021, 5, 4))
      .toBe('You should change your password.');
  });

  it(` If 30 days or less have passed since the last password change 
  should display message Password is actual.`, () => {
    expect(isPasswordActual(2021, 6, 29))
      .toBe('Password is actual.');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    expect(isPasswordActual(2020, 7, 10))
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password if more 
  than 30 days have passed since the last password change `, () => {
    expect(isPasswordActual(2021, 5, 16))
      .toBe('You should change your password.');
  });

  it(` If 30 days or less have passed since the last password change 
  should display message Password is actual.`, () => {
    expect(isPasswordActual(2021, 6, 16))
      .toBe('Password is actual.');
  });
});
