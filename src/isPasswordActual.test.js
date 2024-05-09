'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');
  // I use static dates for easier testing
  const today = {
    year: 2024,
    month: 5,
    day: 5,
  };

  const { year, month, day } = today;

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    const result = isPasswordActual(year, month, day);

    expect(typeof result).toBe('string');
  });

  it('passed less than 30 days', () => {
    const result = isPasswordActual(year, month, day);

    expect(result).toBe('Password is actual.');
  });

  it('passed more than 30 but less than 60 days', () => {
    const result = isPasswordActual(year, month - 1, day);

    expect(result).toBe('You should change your password.');
  });

  it('passed more than 60 days', () => {
    const result = isPasswordActual(year - 1, month, day);

    expect(result).toBe('Immediately change the password!');
  });
});
