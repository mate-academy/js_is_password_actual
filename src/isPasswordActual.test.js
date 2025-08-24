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
    const r = isPasswordActual(1, 1, 1);

    expect(typeof r).toBe('string');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it(`should prepare to change the password if was changed a month ago`, () => {
    const lastMonth = isPasswordActual(today.year, today.month - 1, today.date);

    expect(lastMonth)
      .toBe('You should change your password.');
  });


  it(`should say everything is ok`, () => {
    const lastWeek = isPasswordActual(today.year, today.month, today.date - 7);

    expect(lastWeek)
      .toBe('Password is actual.');
  });
});
