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
    const res = isPasswordActual();

    expect(typeof (res)).toBe('string');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password if was changed`
    + `more than 60 days ago`, () => {
    const lastYear = isPasswordActual(2024, 9, 17);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password if was changed`
    + `more than 30 days ago`, () => {
    const lastYear = isPasswordActual(2024, 10, 17);

    expect(lastYear)
      .toBe('You should change your password.');
  });

  it(`should return a message "Password is actual."`
    + `if password was changed less than 30 days ago`, () => {
    const lastYear = isPasswordActual(2024, 11, 10);

    expect(lastYear)
      .toBe('Password is actual.');
  });
});
