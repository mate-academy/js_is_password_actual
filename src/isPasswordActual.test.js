'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');
  const date = new Date(Date.now());
  const today = {
    year: date.getUTCFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
  };

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    expect(typeof isPasswordActual(today.year, today.month, today.date))
      .toBe('string');
  });

  describe('Edge testing', () => {
    it(`should return 'Password is actual.' `
        + `if was created today`, () => {
      expect(isPasswordActual(today.year, today.month, today.date))
        .toEqual('Password is actual.');
    });

    it(`should return 'Password is actual.' `
      + `if was created less then 30 days`, () => {
      expect(isPasswordActual(today.year, today.month, today.date - 30))
        .toEqual('Password is actual.');
    });

    it(`should return 'You should change your password.' `
      + `if was created more then 30 days les than 60 days`, () => {
      expect(isPasswordActual(today.year, today.month, today.date - 31))
        .toEqual('You should change your password.');

      expect(isPasswordActual(today.year, today.month, today.date - 60))
        .toEqual('You should change your password.');
    });

    it(`should return 'Immediately change the password!' `
      + `if was created more then 60 days`, () => {
      expect(isPasswordActual(today.year, today.month, today.date - 61))
        .toEqual('Immediately change the password!');
    });
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });
});
