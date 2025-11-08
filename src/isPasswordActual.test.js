'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');
  const date = new Date(Date.now());
  const today = {
    year: date.getUTCFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
  };
  const cases = [
    {
      args: [2020, 1, 1],
      expected: 'Immediately change the password!',
    },
    {
      args: (() => {
        const d = new Date();

        d.setDate(d.getDate() - 40);

        return [d.getFullYear(), d.getMonth() + 1, d.getDate()];
      })(),
      expected: 'You should change your password.',
    },
    {
      args: (() => {
        const d = new Date();

        d.setDate(d.getDate() - 10);

        return [d.getFullYear(), d.getMonth() + 1, d.getDate()];
      })(),
      expected: 'Password is actual.',
    },
    {
      args: (() => {
        const d = new Date();

        d.setDate(d.getDate() - 30);

        return [d.getFullYear(), d.getMonth() + 1, d.getDate()];
      })(),
      expected: 'Password is actual.',
    },
    {
      args: (() => {
        const d = new Date();

        d.setDate(d.getDate() - 31);

        return [d.getFullYear(), d.getMonth() + 1, d.getDate()];
      })(),
      expected: 'You should change your password.',
    },
    {
      args: (() => {
        const d = new Date();

        d.setDate(d.getDate() - 60);

        return [d.getFullYear(), d.getMonth() + 1, d.getDate()];
      })(),
      expected: 'You should change your password.',
    },
    {
      args: (() => {
        const d = new Date();

        d.setDate(d.getDate() - 61);

        return [d.getFullYear(), d.getMonth() + 1, d.getDate()];
      })(),
      expected: 'Immediately change the password!',
    },
  ];

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    expect(typeof isPasswordActual(2020, 6, 9)).toBe('string');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear).toBe('Immediately change the password!');
  });

  it.each(cases)(
    'isPasswordActual(%j) returns %j',
    ({ args, expected }) => {
      expect(isPasswordActual(...args)).toBe(expected);
    }
  );
});
