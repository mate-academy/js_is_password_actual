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
    expect(typeof isPasswordActual()).toBe('string');
  });

  it(`should ask to change the password immediately
     if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password if 'days' >= 60`, () => {
    const lastYear
     = isPasswordActual(today.year, today.month - 1, today.date - 30);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password if 30 >= 'days' < 60`, () => {
    const lastYear
     = isPasswordActual(today.year, today.month - 1, today.date - 29);

    expect(lastYear)
      .toBe('You should change your password.');
  });

  it(`should inform your password is actual if 'days' <= 30`, () => {
    const lastYear = isPasswordActual(today.year, today.month, today.date - 30);

    expect(lastYear)
      .toBe('Password is actual.');
  });
});
