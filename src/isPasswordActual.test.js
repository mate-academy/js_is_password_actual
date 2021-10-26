'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    expect(typeof isPasswordActual('qwer')).toBe('string');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    expect(isPasswordActual(2020, 6, 9))
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password 
  if was changed more than 60 days`, () => {
    expect(isPasswordActual(2021, 8, 22))
      .toBe('Immediately change the password!');
  });

  it(`shouldnt ask to change the password 
  if was changed 30 days or less`, () => {
    expect(isPasswordActual(2021, 9, 27))
      .toBe('Password is actual.');
  });

  it(`should ask to change the password 
  if was changed more than 30 days`, () => {
    expect(isPasswordActual(2021, 9, 1))
      .toBe('You should change your password.');
  });

  it(`shouldnt ask to change the password 
  if was changed today`, () => {
    expect(isPasswordActual(2021, 10, 26))
      .toBe('Password is actual.');
  });
});
