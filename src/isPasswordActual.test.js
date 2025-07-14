'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');
  const MS_PER_DAY = 1000 * 60 * 60 * 24;

  const today = new Date(Date.now());

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    const result = isPasswordActual(today.getFullYear(),
      today.getMonth() + 1, today.getDate());

    expect(typeof result).toBe('string');
  });

  it(`should return 'Password is actual.'`, () => {
    const result = isPasswordActual(today.getFullYear(),
      today.getMonth() + 1, today.getDate());

    expect(result).toBe('Password is actual.');
  });

  it(`if password was changed 10 days ago`, () => {
    const pastDate = new Date(today.getTime() - MS_PER_DAY * 10);
    const result = isPasswordActual(pastDate.getFullYear(),
      pastDate.getMonth() + 1, pastDate.getDate());

    expect(result).toBe('Password is actual.');
  });

  it(`if password was changed 45 days ago`, () => {
    const pastDate = new Date(today.getTime() - MS_PER_DAY * 45);
    const result = isPasswordActual(pastDate.getFullYear(),
      pastDate.getMonth() + 1, pastDate.getDate());

    expect(result).toBe('You should change your password.');
  });

  it(`'Immediately change the password!' changed 90 days ago`, () => {
    const pastDate = new Date(today.getTime() - MS_PER_DAY * 90);
    const result = isPasswordActual(pastDate.getFullYear(),
      pastDate.getMonth() + 1, pastDate.getDate());

    expect(result).toBe('Immediately change the password!');
  });

  it(`should handle invalid dates gracefully`, () => {
    expect(() => isPasswordActual(2025, 2, 30)).not.toThrow();
  });
});
