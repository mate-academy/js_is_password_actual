'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    expect(typeof isPasswordActual('')).toBe('string');
  });

  it(`should insist to change the password if was changed 1000 days ago`,
    () => {
      expect(isPasswordActual(2018, 10, 21))
        .toBe('Immediately change the password!');
    });

  it(`should recommend to change the password if was changed  31 days ago`,
    () => {
      expect(isPasswordActual(2021, 6, 19))
        .toBe('You should change your password.');
    });

  it(`Should tell that your password is actual if changed day ago`, () => {
    expect(isPasswordActual(2021, 7, 19)).toBe('Password is actual.');
  });

  it(`should recommend to change the password if was changed 60 days ago`,
    () => {
      expect(isPasswordActual(2021, 5, 21))
        .toBe('You should change your password.');
    });

  it(`should insist to change the password if was changed 61 days ago`,
    () => {
      expect(isPasswordActual(2021, 5, 20))
        .toBe('Immediately change the password!');
    });

  it(`should tell that your password is actual if was changed 30 days ago`,
    () => {
      expect(isPasswordActual(2021, 6, 20))
        .toBe('Password is actual.');
    });

  it(`Should tell that your password is actual if changed today`, () => {
    expect(isPasswordActual(2021, 7, 20))
      .toBe('Password is actual.');
  });
});
