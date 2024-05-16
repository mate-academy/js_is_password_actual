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
    expect(typeof isPasswordActual(2024, 5, 2)).toBe('string');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it(`should return 'Password is actual'`
  + `if the password was updated within the last 30 days`, () => {
    expect(isPasswordActual(2024, 5, 2)).toBe('Password is actual.');
  });

  it(`should return 'You should change your password.'`
  + `if the password was updated more than 30 days ago`
  + `and less than 60 days ago`, () => {
    expect(isPasswordActual(2024, 4, 4))
      .toBe('You should change your password.');
  });

  it(`should return 'Password is actual'`
  + `if the password was updated exactly 30 days ago`, () => {
    expect(isPasswordActual(today.year, today.month - 1, today.date))
      .toBe('Password is actual.');
  });

  it(`should return 'You should change your password.'`
  + `if the password was updated exactly 60 days ago`, () => {
    expect(isPasswordActual(today.year, today.month - 2, today.date + 1))
      .toBe('You should change your password.');
  });

  it(`should return 'Password is actual.'`
  + `if the password was updated today`, () => {
    expect(isPasswordActual(today.year, today.month, today.date))
      .toBe('Password is actual.');
  });
});
