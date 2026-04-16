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
    const result = isPasswordActual(today.year, today.month, today.date);

    expect(typeof result).toBe('string');
  });

  it(`should change the password if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear).toBe('Immediately change the password!');
  });

  it(`should be actual password
      if was changed less than 30 days`, () => {
    const result = isPasswordActual(today.year, today.month, today.date - 24);

    expect(result).toBe('Password is actual.');
  });

  it(`should be actual password
      if was changed equal 30 days`, () => {
    const result = isPasswordActual(today.year, today.month, today.date - 30);

    expect(result).toBe('Password is actual.');
  });

  it('should change password', () => {
    const result = isPasswordActual(
      today.year,
      today.month - 1,
      today.date - 10,
    );

    expect(result).toBe('You should change your password.');
  });

  it('should immediately change password', () => {
    const result = isPasswordActual(
      today.year,
      today.month - 2,
      today.date - 10,
    );

    expect(result).toBe('Immediately change the password!');
  });
});
