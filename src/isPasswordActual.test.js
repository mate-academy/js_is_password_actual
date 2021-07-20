'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    expect(typeof isPasswordActual(2021, 9, 1)).toBe('string');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    expect(isPasswordActual(2020, 7, 20))
      .toBe('Immediately change the password!');
  });

  it(`if 49 days have passed since the last 
  password change, return message: 'You should change your password.'`, () => {
    expect(isPasswordActual(2021, 6, 1))
      .toBe('You should change your password.');
  });

  it(`if 10 days, return message: 'Password is actual.'`, () => {
    expect(isPasswordActual(2021, 7, 10))
      .toBe('Password is actual.');
  });

  it(`if today, return message: 'Password is actual.'`, () => {
    expect(isPasswordActual(2021, 6, 21))
      .toBe('Password is actual.');
  });

  it(`if 29 days return message: 'Password is actual.'`, () => {
    expect(isPasswordActual(2021, 6, 21))
      .toBe('Password is actual.');
  });

  it(`should ask to change the password if was changed a years ago`, () => {
    expect(isPasswordActual(10, 7, 20))
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password if was changed 
  more than 60 days`, () => {
    expect(isPasswordActual(2021, 1, 1))
      .toBe('Immediately change the password!');
  });

  it(`if 59 days have passed since the last 
  password change, return message: 'You should change your password.'`, () => {
    expect(isPasswordActual(2021, 5, 1))
      .toBe('You should change your password.');
  });
});
