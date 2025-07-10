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

  });

  it(`should ask to change the password immediately if was
    changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password immediately if was
    changed 61 days ago`, () => {
    const lastYear = isPasswordActual(today.year, today.month, today.date - 61);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password if was
    changed 60 days ago`, () => {
    const lastYear = isPasswordActual(today.year, today.month, today.date - 60);

    expect(lastYear)
      .toBe('You should change your password.');
  });

  it(`should ask to change the password if was
    changed 31 days ago`, () => {
    const lastYear = isPasswordActual(today.year, today.month, today.date - 31);

    expect(lastYear)
      .toBe('You should change your password.');
  });

  it(`should return message 'Password is actual.' if was
    changed 30 days ago`, () => {
    const lastYear = isPasswordActual(today.year, today.month, today.date - 30);

    expect(lastYear)
      .toBe('Password is actual.');
  });
});
