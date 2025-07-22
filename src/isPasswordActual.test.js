'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    const result = isPasswordActual(year, month, date);

    expect(typeof result).toBe('string');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    const result = isPasswordActual(year - 1, month, date);

    expect(result).toBe('Immediately change the password!');
  });

  it(`should ask to change the password 
    if was changed more than a month ago`, () => {
    const pastDate = new Date(today);

    pastDate.setMonth(today.getMonth() - 1);
    pastDate.setDate(today.getDate() - 1);

    const result = isPasswordActual(
      pastDate.getFullYear(),
      pastDate.getMonth() + 1,
      pastDate.getDate()
    );

    expect(result).toBe('You should change your password.');
  });

  it(`should not ask to change the password 
    if was changed less than a month ago`, () => {
    const recentDate = new Date(today);

    recentDate.setDate(today.getDate() - 1);

    const result = isPasswordActual(
      recentDate.getFullYear(),
      recentDate.getMonth() + 1,
      recentDate.getDate()
    );

    expect(result).toBe('Password is actual.');
  });
});
