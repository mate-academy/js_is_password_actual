'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    expect(typeof isPasswordActual(2020, 9, 6)).toBe('string');
  });

  it(`should ask 'Immediately change the password!'
      if was changed a year ago`, () => {
    expect(isPasswordActual(2020, 6, 9))
      .toBe('Immediately change the password!');
  });

  it(`should ask 'Password is actual'
      if was changed a 5 days ago`, () => {
    expect(isPasswordActual(2021, 7, 15))
      .toBe('Password is actual.');
  });

  it(`should ask 'You should change your password.'
    if was changed a 35 days ago`, () => {
    expect(isPasswordActual(2021, 6, 15))
      .toBe('You should change your password.');
  });

  it(`should ask 'Password is actual'
      if was changed a 30 days ago`, () => {
    expect(isPasswordActual(2021, 6, 20))
      .toBe('Password is actual.');
  });

  it(`should ask 'Immediately change the password!'
    if was changed 60 days ago`, () => {
    expect(isPasswordActual(2020, 5, 21))
      .toBe('Immediately change the password!');
  });
});
