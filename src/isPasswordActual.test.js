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
    const str = isPasswordActual(today.year, today.month, today.date);

    expect(typeof str).toBe('string');
  });

  // eslint-disable-next-line max-len
  it(`should ask to change the password if was changed more than 60 days ago`, () => {
    const lastYear = isPasswordActual(today.year, today.month - 2, today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  // eslint-disable-next-line max-len
  it('should recommend to change the password if was changed a month ago', () => {
    const lastMonth = isPasswordActual(today.year, today.month - 1, today.date);

    expect(lastMonth).toBe('You should change your password.');
  });

  // eslint-disable-next-line max-len
  it('should tell that password is actual if 30 days or less have changed', () => {
    const inThisMonth
      = isPasswordActual(today.year, today.month, today.date - 30);

    expect(inThisMonth).toBe('Password is actual.');
  });
});
