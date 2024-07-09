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
    const day = today.date;
    const month = today.month;
    const year = today.year;

    const lastYear = isPasswordActual(year, month, day);

    expect(typeof lastYear).toBe('string');
  });

  it(`should return "Password is actual"`, () => {
    const day = today.date;
    const month = today.month;
    const year = today.year;

    const lastYear = isPasswordActual(year, month, day);

    expect(lastYear).toBe('Password is actual.');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it(`should advise to change the password more that 30 days`, () => {
    const day = today.date - 1;
    const month = today.month - 1;
    const year = today.year;

    const lastYear = isPasswordActual(year, month, day);

    expect(lastYear)
      .toBe('You should change your password.');
  });
});
