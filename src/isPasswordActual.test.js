'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');
  const date = new Date(Date.now());
  const today = {
    year: date.getUTCFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
  };

  it(`should be declared`, () => expect(isPasswordActual).toBeDefined());

  it(`should return a string`, () => {
    const result = isPasswordActual(today.year, today.month, today.date);

    expect(typeof result).toBe('string');
  });

  it(
    `should ask to immediately change the password last changed a year ago`,
    () => {
      const result = isPasswordActual(today.year - 1, today.month, today.date);

      expect(result).toBe('Immediately change the password!');
    }
  );

  it(`should ask to change the password last changed a month ago`, () => {
    const result = isPasswordActual(today.year, today.month - 1, today.date);

    expect(result).toBe('You should change your password.');
  });

  it(`should inform the password last changed within a month is actual`, () => {
    const result = isPasswordActual(today.year, today.month, today.date - 30);

    expect(result).toBe('Password is actual.');
  });
});
