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
    const lastYear = isPasswordActual(today.year, today.month, today.date);

    expect(typeof lastYear).toBe('string');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it(`the password must be 'actual' if `
  + `no more than 30 days have passed`, () => {
    const lastYear = isPasswordActual(
      today.year,
      today.month - 1,
      today.date + 3
    );

    expect(lastYear).toBe('Password is actual.');
  });

  it(`should if the last password change was between 30 `
  + `and 60 days, suggest changing the password`, () => {
    const lastYear = isPasswordActual(today.year, today.month, today.date - 59);

    expect(lastYear)
      .toBe('You should change your password.');
  });

  it('should ask to change the password if '
  + 'was changed more than 60 days', () => {
    const lastYear = isPasswordActual(today.year, today.month, today.date - 61);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });
});
