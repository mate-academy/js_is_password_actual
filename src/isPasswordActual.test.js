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

  // eslint-disable-next-line max-len
  it(`should return 'Password is actual.' if password was updated today`, () => {
    const result = isPasswordActual(today.year, today.month, today.date);

    expect(result).toBe('Password is actual.');
  });

  // eslint-disable-next-line max-len
  it(`should return 'Password is actual.' if password was updated 30 days ago`, () => {
    const pastDate = new Date();

    pastDate.setDate(pastDate.getDate() - 30);

    const result = isPasswordActual(
      pastDate.getFullYear(),
      pastDate.getMonth() + 1,
      pastDate.getDate()
    );

    expect(result).toBe('Password is actual.');
  });

  // eslint-disable-next-line max-len
  it(`should return 'You should change your password.' if password was updated 31 days ago`, () => {
    const pastDate = new Date();

    pastDate.setDate(pastDate.getDate() - 31);

    const result = isPasswordActual(
      pastDate.getFullYear(),
      pastDate.getMonth() + 1,
      pastDate.getDate()
    );

    expect(result).toBe('You should change your password.');
  });

  // eslint-disable-next-line max-len
  it(`should return 'You should change your password.' if password was updated 60 days ago`, () => {
    const pastDate = new Date();

    pastDate.setDate(pastDate.getDate() - 60);

    const result = isPasswordActual(
      pastDate.getFullYear(),
      pastDate.getMonth() + 1,
      pastDate.getDate()
    );

    expect(result).toBe('You should change your password.');
  });

  // eslint-disable-next-line max-len
  it(`should return 'Immediately change the password!' if password was updated 61 days ago`, () => {
    const pastDate = new Date();

    pastDate.setDate(pastDate.getDate() - 61);

    const result = isPasswordActual(
      pastDate.getFullYear(),
      pastDate.getMonth() + 1,
      pastDate.getDate()
    );

    expect(result).toBe('Immediately change the password!');
  });
});
