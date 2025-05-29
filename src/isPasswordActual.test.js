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
      today.date
    );

    expect(typeof result).toBe('string');
  });

  it(
    `should ask to change the password if was changed`
      + ` more than 60 days ago`,
    () => {
      const lastYear = isPasswordActual(
        today.year - 1,
        today.month,
        today.date
      );

      const twoMonthsAgo = isPasswordActual(
        today.year,
        today.month - 2,
        today.date
      );

      expect(lastYear).toBe(
        'Immediately change the password!'
      );

      expect(twoMonthsAgo).toBe(
        'Immediately change the password!'
      );
    }
  );

  it(
    'should ask to change the password '
      + 'if the last time the password was changed was more than 30 days ago',
    () => {
      const lastMonth = isPasswordActual(
        today.year,
        today.month,
        today.date - 31
      );

      expect(lastMonth).toBe(
        'You should change your password.'
      );
    }
  );

  it('should not ask to change the password', () => {
    const lastMonth = isPasswordActual(
      today.year,
      today.month - 1,
      today.date
    );

    const thisMonth = isPasswordActual(
      today.year,
      today.month,
      today.date - 5
    );

    const nextMonth = isPasswordActual(
      today.year,
      today.month + 1,
      today.date
    );

    expect(lastMonth).toBe('Password is actual.');
    expect(thisMonth).toBe('Password is actual.');
    expect(nextMonth).toBe('Password is actual.');
  });
});
