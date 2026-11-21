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
    expect(typeof isPasswordActual(2026, 11, 9)).toBe('string');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear).toBe('Immediately change the password!');
  });

  it(`should ask to change the password if was changed 30 days ago`, () => {
    const lastMonth = isPasswordActual(today.year, today.month, today.date - 60);

    expect(lastMonth).toBe('You should change your password.');
  });

  it('should return % -> % if was changed 30 days or less ago' , () => {
    const actual = isPasswordActual(today.year, today.month, today.date - 30);

    expect(actual).toBe("Password is actual.")
  })
});
