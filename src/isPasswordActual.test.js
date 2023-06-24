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
    // Add your assertion here
  });

  it(`should ask to change the password if it was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear).toBe('Immediately change the password!');
  });

  it(`should return 'Password is actual.'
     if less than or equal to 30 days have passed since
     the last password change`, () => {
    const within30Days = new Date(today);

    within30Days.setDate(today.date - 30);

    const resultWithin30Days = isPasswordActual(
      within30Days.getFullYear(),
      within30Days.getMonth() + 1,
      within30Days.getDate()
    );

    expect(resultWithin30Days).toBe('Password is actual.');

    const oneDayAgo = new Date(today);

    oneDayAgo.setDate(today.date - 1);

    const resultOneDayAgo = isPasswordActual(
      oneDayAgo.getFullYear(),
      oneDayAgo.getMonth() + 1,
      oneDayAgo.getDate()
    );

    expect(resultOneDayAgo).toBe('Password is actual.');
  });

  it(`should return 'You should change your password.'
     if more than 30 days have passed since the last password change`, () => {
    const moreThan30Days = new Date(today);

    moreThan30Days.setDate(today.date - 31);

    const resultMoreThan30Days = isPasswordActual(
      moreThan30Days.getFullYear(),
      moreThan30Days.getMonth() + 1,
      moreThan30Days.getDate()
    );

    expect(resultMoreThan30Days).toBe('Password is actual.');

    const oneMonthAgo = new Date(today);

    oneMonthAgo.setMonth(today.month - 1);

    const resultOneMonthAgo = isPasswordActual(
      oneMonthAgo.getFullYear(),
      oneMonthAgo.getMonth() + 1,
      oneMonthAgo.getDate()
    );

    expect(resultOneMonthAgo).toBe('Password is actual.');
  });

  it(`should return 'Immediately change the password!'
     if more than 60 days have passed since the last password change`, () => {
    const passwordChanged61DaysAgo = new Date(today);

    passwordChanged61DaysAgo.setDate(today.date - 61);

    if (passwordChanged61DaysAgo > new Date()) {
      expect(
        isPasswordActual(
          passwordChanged61DaysAgo.getFullYear(),
          passwordChanged61DaysAgo.getMonth() + 1,
          passwordChanged61DaysAgo.getDate()
        )
      ).toBe('Immediately change the password!');
    }

    const passwordChanged2MonthsAgo = new Date(today);

    passwordChanged2MonthsAgo.setMonth(today.month - 2);

    if (passwordChanged2MonthsAgo > new Date()) {
      expect(
        isPasswordActual(
          passwordChanged2MonthsAgo.getFullYear(),
          passwordChanged2MonthsAgo.getMonth() + 1,
          passwordChanged2MonthsAgo.getDate()
        )
      ).toBe('Immediately change the password!');
    }
  });
});
