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
    const result = isPasswordActual(today);

    expect.stringContaining(result);
  });

  it(`should ask to change the password ` + `
    if it was changed > 60 days ago`, () => {
    const moreThanSixtyDays
      = isPasswordActual(today.year, today.month, today.date - 61);

    expect(moreThanSixtyDays)
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password ` + `
    if it was changed > 30 days ago`, () => {
    const moreThanThirtyDays
      = isPasswordActual(today.year, today.month, today.date - 31);

    expect(moreThanThirtyDays)
      .toBe('You should change your password.');
  });

  it(`should not change password ` + `,
      if it was changed > 30 days ago`, () => {
    const lessThanThirtyDays
      = isPasswordActual(today.year, today.month, today.date - 30);

    expect(lessThanThirtyDays)
      .toBe('Password is actual.');
  });

  it(`should not change password ` + `,
      if it was changed === 0 days ago`, () => {
    const zeroChangedDays
      = isPasswordActual(today.year, today.month, today.date);

    expect(zeroChangedDays)
      .toBe('Password is actual.');
  });
});
