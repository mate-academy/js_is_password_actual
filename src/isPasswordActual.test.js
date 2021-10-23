'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    expect(typeof isPasswordActual('')).toBe('string');
  });

  // Let it be Oct 24, 2021 for today:

  it(`should return 'Immediately change the password!'
    if the last time the password was last changed 1 year or more ago`, () => {
    expect(isPasswordActual(2020, 10, 24))
      .toBe('Immediately change the password!');
  });

  it(`should return 'Immediately change the password!'
    if the last time the password was last changed 61 days or more ago`, () => {
    expect(isPasswordActual(2021, 8, 24))
      .toBe('Immediately change the password!');
  });

  it(`should return 'You should change your password.'
    if the password was last changed 60 days ago`, () => {
    expect(isPasswordActual(2021, 8, 25))
      .toBe('You should change your password.');
  });

  it(`should return 'You should change your password.'
    if the password was last changed 31 days ago`, () => {
    expect(isPasswordActual(2021, 9, 23))
      .toBe('You should change your password.');
  });

  it(`should return 'Password is actual.'
    if the password was last changed 30 days or less ago`, () => {
    expect(isPasswordActual(2021, 9, 24))
      .toBe('Password is actual.');
  });

  it(`should return 'Password is actual.'
    if the password was last changed 0 days ago`, () => {
    expect(isPasswordActual(2021, 10, 24))
      .toBe('Password is actual.');
  });
});
