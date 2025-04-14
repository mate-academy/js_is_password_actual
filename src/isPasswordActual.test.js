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
    const { year, month, date: dateNow } = today;

    expect(typeof isPasswordActual(year, month, dateNow))
      .toBe('string');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    const lastYear
      = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password `
    + `if was changed more than 60 days`, () => {
    const lastYear
      = isPasswordActual(today.year, today.month, today.date - 61);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it(`should suggest to change the password if was changed`
      + `more than 30 days but less then 60 days`, () => {
    const lastYear
      = isPasswordActual(today.year, today.month, today.date - 31);

    expect(lastYear)
      .toBe('You should change your password.');
  });

  it(`should inform about actual password if was changed`
      + `less than 30 days`, () => {
    const lastYear
      = isPasswordActual(today.year, today.month, today.date - 5);

    expect(lastYear)
      .toBe('Password is actual.');
  });
});
