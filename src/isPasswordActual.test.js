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
    expect(isPasswordActual(today.year - 1, today.month, today.date))
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password if it `
  + `was changed more than month ago`, () => {
    expect(isPasswordActual(today.year, today.month - 1, today.date - 1))
      .toBe('You should change your password.');
  });

  it(`should return 'actual' if password was `
  + `changed a month ago or less`, () => {
    expect(isPasswordActual(today.year, today.month, today.date - 30))
      .toBe('Password is actual.');
  });
});
