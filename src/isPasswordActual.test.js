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

  it(`should ask to change the password if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear).toBe('Immediately change the password!');
  });

  it(`
    should ask to change the password if it was changed > 30 days ago
  `, () => {
    const lastYear = isPasswordActual(
      today.year,
      today.month - 1,
      today.date - 1
    );

    expect(lastYear).toBe('You should change your password.');
  });

  it(`
    should confirm that password is actual if it was changed < 30 days ago
  `, () => {
    const lastYear = isPasswordActual(today.year, today.month - 1, today.date);

    expect(lastYear).toBe('Password is actual.');
  });
});
