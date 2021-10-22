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
    expect(isPasswordActual(2021, 9, 22))
      .toBe('Password is actual.');
  });

  it(`should ask to change the password 
  if was changed more than 30 days`, () => {
    expect(isPasswordActual(2021, 9, 1))
      .toBe('You should change your password.');
  });

  // A change in the code is required
  it(`should return an error masagge
  if original consists of an empty date`, () => {
    expect(isPasswordActual(0, 0, 0)).toBe('Immediately change the password!');
  });

  // A change in the code is required
  it(`should return an error masagge
  if original consists of an unreal date`, () => {
    expect(isPasswordActual(2023, 10, 22)).toBe('Password is actual.');
  });
});
