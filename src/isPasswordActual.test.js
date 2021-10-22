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

  it(`should return 'Password is actual.', 
  if password was changed yeasterday`, () => {
    expect(isPasswordActual(2021, 10, 21))
      .toBe('Password is actual.');
  });

  it(`should return 'Password is actual.',
  if password was changed 30 days ago`, () => {
    expect(isPasswordActual(2021, 9, 22))
      .toBe('Password is actual.');
  });

  it(`should return 'You should change your password.',
  if password was changed 31 days ago`, () => {
    expect(isPasswordActual(2021, 9, 21))
      .toBe('You should change your password.');
  });

  it(`should return 'Immediately change the password!',
  if password was changed 61 days ago`, () => {
    expect(isPasswordActual(2021, 8, 22))
      .toBe('Immediately change the password!');
  });

  // write more tests here
});
