'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');

  const MS_IN_DAY = 24 * 60 * 60 * 1000;

  function getPastDate(daysAgo) {
    const d = new Date(Date.now() - daysAgo * MS_IN_DAY);

    return {
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      date: d.getDate(),
    };
  }

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    const date = getPastDate(10);

    expect(
      typeof isPasswordActual(date.year, date.month, date.date)).toBe('string');
  });

  it(`should ask to change the password if it was changed a year ago`, () => {
    const d = getPastDate(365);

    expect(isPasswordActual(d.year, d.month, d.date))
      .toBe('Immediately change the password!');
  });

  test(
    'returns "Immediately change the password!" if more than 60 days passed',
    () => {
      [61, 100, 365].forEach(days => {
        const d = getPastDate(days);

        expect(isPasswordActual(d.year, d.month, d.date)).toBe(
          'Immediately change the password!');
      });
    });

  test(
    'returns "You should change your password." if passed btw 30 and 60',
    () => {
      [31, 40, 59].forEach(days => {
        const d = getPastDate(days);

        expect(isPasswordActual(d.year, d.month, d.date)).toBe(
          'You should change your password.');
      });
    });

  test('returns "Password is actual." if 30 days or less passed', () => {
    [0, 5, 15, 30].forEach(days => {
      const d = getPastDate(days);

      expect(isPasswordActual(d.year, d.month, d.date)).toBe(
        'Password is actual.');
    });
  });
});
