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
    expect(typeof isPasswordActual(2022, 5, 3)).toBe('string');
  });

  it(`should ask to change the password immediately if was changed
    a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password immediately if was changed
    2 months and 2 days ago`, () => {
    const pastDate = isPasswordActual(today.year,
      today.month - 2,
      today.date - 2);

    expect(pastDate)
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password immediately if was changed
    61 days ago`, () => {
    const pastDate = isPasswordActual(today.year,
      today.month,
      today.date - 61);

    expect(pastDate)
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password immediately if was changed
    60 days ago`, () => {
    const pastDate = isPasswordActual(today.year,
      today.month,
      today.date - 60);

    expect(pastDate)
      .toBe('You should change your password.');
  });

  it(`should ask to change the password if was changed
    31 days ago`, () => {
    const pastDate = isPasswordActual(today.year,
      today.month,
      today.date - 31);

    expect(pastDate)
      .toBe('You should change your password.');
  });

  it(`should return password is actual if was changed
    28 days ago`, () => {
    const pastDate = isPasswordActual(today.year,
      today.month,
      today.date - 28);

    expect(pastDate)
      .toBe('Password is actual.');
  });

  it(`should return password is actual if was changed
    0 days ago`, () => {
    const pastDate = isPasswordActual(today.year,
      today.month,
      today.date);

    expect(pastDate)
      .toBe('Password is actual.');
  });
});
