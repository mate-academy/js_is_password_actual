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
    expect(isPasswordActual(2020, 7, 21))
      .toBe('Immediately change the password!');
  });

  it(`should ask 'Password is actual'
    if was changed a 5 days ago`, () => {
    expect(isPasswordActual(2021, 7, 16))
      .toBe('Password is actual.');
  });

  it(`should ask 'You should change your password.'
    if was changed a 35 days ago`, () => {
    expect(isPasswordActual(2021, 6, 16))
      .toBe('You should change your password.');
  });

  it(`should ask 'Password is actual'
    if was changed a 29 days ago`, () => {
    expect(isPasswordActual(2021, 6, 22))
      .toBe('Password is actual.');
  });

  it(`should ask 'Password is actual'
    if was changed a 30 days ago`, () => {
    expect(isPasswordActual(2021, 6, 21))
      .toBe('Password is actual.');
  });

  it(`should ask 'You should change your password.'
    if was changed a 31 days ago`, () => {
    expect(isPasswordActual(2021, 6, 20))
      .toBe('You should change your password.');
  });

  it(`should ask 'You should change your password.'
    if was changed a 59 days ago`, () => {
    expect(isPasswordActual(2021, 5, 23))
      .toBe('You should change your password.');
  });

  it(`should ask 'Immediately change the password!'
    if was changed 60 days ago`, () => {
    expect(isPasswordActual(2020, 5, 22))
      .toBe('Immediately change the password!');
  });

  it(`should ask 'Immediately change the password!'
    if was changed 61 days ago`, () => {
    expect(isPasswordActual(2020, 5, 21))
      .toBe('Immediately change the password!');
  });
});
