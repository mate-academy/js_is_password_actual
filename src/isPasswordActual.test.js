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

  it(`should return a string`, () => {});

  it(`should ask to change the password if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear).toBe('Immediately change the password!');
  });

  it('should say that password is actual if it was changed month ago', () => {
    expect(isPasswordActual(today.year, today.month, today.date)).toBe(
      'Password is actual.',
    );
  });

  it('describe', () => {
    expect(isPasswordActual(today.year, today.month - 1, today.date)).toBe(
      'You should change your password.',
    );
  });
});
