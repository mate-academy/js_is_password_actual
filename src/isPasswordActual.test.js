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
    const result = isPasswordActual(
      today.year,
      today.month,
      today.date,
    );

    expect(typeof result).toBe('string');
  });

  it(
    `should ask to change the password immediately if it was changed more than `
    + `60 days ago`,
    () => {
      const pastDate = new Date(
        date.getTime() - 61 * 24 * 60 * 60 * 1000,
      );

      const result = isPasswordActual(
        pastDate.getFullYear(),
        pastDate.getMonth() + 1,
        pastDate.getDate(),
      );

      expect(result).toBe('Immediately change the password!');
    },
  );

  it(
    `should suggest to change the password if it was changed more than 30 days `
    + `ago but less or equal 60`,
    () => {
      const pastDate = new Date(
        date.getTime() - 45 * 24 * 60 * 60 * 1000,
      );

      const result = isPasswordActual(
        pastDate.getFullYear(),
        pastDate.getMonth() + 1,
        pastDate.getDate(),
      );

      expect(result).toBe('You should change your password.');
    },
  );

  it(
    `should say password is actual if it was changed 30 or fewer days ago`,
    () => {
      const resultToday = isPasswordActual(
        today.year,
        today.month,
        today.date,
      );

      expect(resultToday).toBe('Password is actual.');

      const pastDate = new Date(
        date.getTime() - 10 * 24 * 60 * 60 * 1000,
      );

      const result10Days = isPasswordActual(
        pastDate.getFullYear(),
        pastDate.getMonth() + 1,
        pastDate.getDate(),
      );

      expect(result10Days).toBe('Password is actual.');
    },
  );

  it(`should correctly handle a date exactly 30 days ago`, () => {
    const pastDate = new Date(
      date.getTime() - 30 * 24 * 60 * 60 * 1000,
    );

    const result = isPasswordActual(
      pastDate.getFullYear(),
      pastDate.getMonth() + 1,
      pastDate.getDate(),
    );

    expect(result).toBe('Password is actual.');
  });

  it(`should correctly handle a date exactly 60 days ago`, () => {
    const pastDate = new Date(
      date.getTime() - 60 * 24 * 60 * 60 * 1000,
    );

    const result = isPasswordActual(
      pastDate.getFullYear(),
      pastDate.getMonth() + 1,
      pastDate.getDate(),
    );

    expect(result).toBe('You should change your password.');
  });
});
