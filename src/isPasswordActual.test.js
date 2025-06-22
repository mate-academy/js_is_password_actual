'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');
  const date = new Date(Date.now());
  const today = {
    year: date.getFullYear(),
    month: date.getMonth() + 1, //
    date: date.getDate(),
  };

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    const result = isPasswordActual(today.year, today.month, today.date);

    expect(typeof result).toBe('string');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear).toBe('Immediately change the password!');
  });

  it(`should ask to change the password if it was changed a month ago`,
    () => {
      const lastMonth = isPasswordActual(
        today.year, today.month - 1, today.date);

      expect(lastMonth).toBe('You should change your password.');
    });

  it('should return that the password is actual if it was changed today',
    () => {
      const todayResult = isPasswordActual(today.year, today.month, today.date);

      expect(todayResult).toBe('Password is actual.');
    });

  it(`should return that the password is actual if it was changed yesterday`,
    () => {
      const yesterday = new Date(today.year, today.month - 1, today.date - 1);
      const yesterdayResult = isPasswordActual(
        yesterday.getFullYear(),
        yesterday.getMonth() + 1,
        yesterday.getDate()
      );

      expect(yesterdayResult).toBe('Password is actual.');
    });

  it(`should return that the password is actual if it was changed 30 days ago`,
    () => {
      const thirtyDaysAgo = new Date(
        today.year,
        today.month - 1,
        today.date - 30
      );
      const thirtyDaysAgoResult = isPasswordActual(
        thirtyDaysAgo.getFullYear(),
        thirtyDaysAgo.getMonth() + 1,
        thirtyDaysAgo.getDate()
      );

      expect(thirtyDaysAgoResult).toBe('Password is actual.');
    });

  it(`should ask to change the password if it was changed 61 days ago`,
    () => {
      const sixtyOneDaysAgo = new Date(
        today.year,
        today.month - 1,
        today.date - 61
      );
      const sixtyOneDaysAgoResult = isPasswordActual(
        sixtyOneDaysAgo.getFullYear(),
        sixtyOneDaysAgo.getMonth() + 1,
        sixtyOneDaysAgo.getDate()
      );

      expect(sixtyOneDaysAgoResult).toBe('Immediately change the password!');
    });

  it(`should ask to change the password if it was changed 90 days ago`,
    () => {
      const ninetyDaysAgo = new Date(
        today.year,
        today.month - 1,
        today.date - 90
      );
      const ninetyDaysAgoResult = isPasswordActual(
        ninetyDaysAgo.getFullYear(),
        ninetyDaysAgo.getMonth() + 1,
        ninetyDaysAgo.getDate()
      );

      expect(ninetyDaysAgoResult).toBe('Immediately change the password!');
    });

  it(`should ask to change the password if it was changed 365 days ago`,
    () => {
      const oneYearAgo = new Date(today.year - 1, today.month - 1, today.date);
      const oneYearAgoResult = isPasswordActual(
        oneYearAgo.getFullYear(),
        oneYearAgo.getMonth() + 1,
        oneYearAgo.getDate()
      );

      expect(oneYearAgoResult).toBe('Immediately change the password!');
    });

  it(`should ask to change the password if it was changed 366 days ago`,
    () => {
      const oneYearAndOneDayAgo = new Date(
        today.year - 1,
        today.month - 1,
        today.date - 1
      );
      const oneYearAndOneDayAgoResult = isPasswordActual(
        oneYearAndOneDayAgo.getFullYear(),
        oneYearAndOneDayAgo.getMonth() + 1,
        oneYearAndOneDayAgo.getDate()
      );

      expect(oneYearAndOneDayAgoResult)
        .toBe('Immediately change the password!');
    });
});
