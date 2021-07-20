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

  it(`Password is actual if was changed today`, () => {
    expect(isPasswordActual(2021, 7, 21))
      .toBe('Password is actual.');
  });

  it(`Password is actual if was changed 10 days ago`, () => {
    expect(isPasswordActual(2021, 7, 11))
      .toBe('Password is actual.');
  });

  it(`Password is actual if was changed 30 days ago`, () => {
    expect(isPasswordActual(2021, 6, 21))
      .toBe('Password is actual.');
  });

  it(`Password is actual if was changed 31 days ago`, () => {
    expect(isPasswordActual(2021, 6, 20))
      .toBe('You should change your password.');
  });

  it(`Password is actual if was changed 41 days ago`, () => {
    expect(isPasswordActual(2021, 6, 10))
      .toBe('You should change your password.');
  });

  it(`Password is actual if was changed 60 days ago`, () => {
    expect(isPasswordActual(2021, 5, 22))
      .toBe('You should change your password.');
  });

  it(`Password is actual if was changed 61 days ago`, () => {
    expect(isPasswordActual(2021, 5, 21))
      .toBe('Immediately change the password!');
  });
});
