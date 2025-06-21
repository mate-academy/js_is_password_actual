'use strict';

describe(`Function 'isPasswordActual':`, () => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date(Date.now()));

  const isPasswordActual = require('./isPasswordActual');

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`<= 30 days`, () => {
    const date = new Date(Date.now() - 3600 * 24 * 30 * 1000);

    const result = isPasswordActual(
      date.getUTCFullYear(),
      date.getMonth() + 1,
      date.getDate(),
    );

    expect(result).toBe('Password is actual.');
  });

  it(`> 30 days <= 60 days`, () => {
    const date = new Date(Date.now() - 3600 * 24 * 31 * 1000);

    const result = isPasswordActual(
      date.getUTCFullYear(),
      date.getMonth() + 1,
      date.getDate(),
    );

    expect(result).toBe('You should change your password.');
  });

  it(`exactly 60 days`, () => {
    const date = new Date(Date.now() - 3600 * 24 * 60 * 1000);

    const result = isPasswordActual(
      date.getUTCFullYear(),
      date.getMonth() + 1,
      date.getDate(),
    );

    expect(result).toBe('You should change your password.');
  });

  it(`> 60 days`, () => {
    const date = new Date(Date.now() - 3600 * 24 * 61 * 1000);

    const result = isPasswordActual(
      date.getUTCFullYear(),
      date.getMonth() + 1,
      date.getDate(),
    );

    expect(result).toBe('Immediately change the password!');
  });
});
