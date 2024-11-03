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

  it(`should return 'Password is actual'`
    + `,if it was changed 30 or less days ago`, () => {
    expect(isPasswordActual(today.year, 10, 24))
      .toBe('Password is actual.');

    expect(isPasswordActual(today.year, 10, 14))
      .toBe('Password is actual.');

    expect(isPasswordActual(today.year, 10, 4))
      .toBe('Password is actual.');
  });

  it(`should return 'You should change your password.'`
    + `,if it was changed more than 30 or less than 61 days ago`, () => {
    expect(isPasswordActual(today.year, 10, 3))
      .toBe('You should change your password.');

    expect(isPasswordActual(today.year, 9, 19))
      .toBe('You should change your password.');

    expect(isPasswordActual(today.year, 9, 4))
      .toBe('You should change your password.');
  });

  it(`should ask to change the password immediately,`
    + ` if it was changed more than 60 days ago`, () => {
    expect(isPasswordActual(2023, today.month, today.date))
      .toBe('Immediately change the password!');

    expect(isPasswordActual(today.year, 9, 3))
      .toBe('Immediately change the password!');
  });

  it('should throw an error if a property is undefined or not a number', () => {
    expect(() => isPasswordActual(false, today.month, null)).toThrow();
    expect(() => isPasswordActual(today.year, undefined, today.date)).toThrow();

    expect(() => isPasswordActual(undefined, today.month, today.date))
      .toThrow();
    expect(() => isPasswordActual(NaN, false, today.date)).toThrow();
    expect(() => isPasswordActual(null, false, today.date)).toThrow();
    expect(() => isPasswordActual('year', false, today.date)).toThrow();
  });

  it('should not work with future dates', () => {
    expect(() => isPasswordActual(today.year, today.month, today.date + 1))
      .toThrow();

    expect(() => isPasswordActual(today.year, today.month + 1, today.date + 1))
      .toThrow();

    expect(() => isPasswordActual(today.year + 1, today.month, today.date))
      .toThrow();
  });
});
