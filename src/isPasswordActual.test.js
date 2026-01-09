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
    expect(typeof isPasswordActual(today.year, today.month, today.date))
      .toBe('string');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it('should ask to change the password if was changed 2 months ago', () => {
    const twoMonthsAgo = new Date(Date.now());

    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

    const result = isPasswordActual(
      twoMonthsAgo.getUTCFullYear(),
      twoMonthsAgo.getMonth() + 1,
      twoMonthsAgo.getDate(),
    );

    expect(result)
      .toBe('Immediately change the password!');
  });

  it('should suggest to change the password if was changed 40 days ago', () => {
    const fortyDaysAgo = new Date(Date.now());

    fortyDaysAgo.setDate(fortyDaysAgo.getDate() - 40);

    const result = isPasswordActual(
      fortyDaysAgo.getUTCFullYear(),
      fortyDaysAgo.getMonth() + 1,
      fortyDaysAgo.getDate(),
    );

    expect(result)
      .toBe('You should change your password.');
  });

  it('should suggest to change the password if was changed 31 days ago', () => {
    const thirtyOneDaysAgo = new Date(Date.now());

    thirtyOneDaysAgo.setDate(thirtyOneDaysAgo.getDate() - 31);

    const result = isPasswordActual(
      thirtyOneDaysAgo.getUTCFullYear(),
      thirtyOneDaysAgo.getMonth() + 1,
      thirtyOneDaysAgo.getDate(),
    );

    expect(result)
      .toBe('You should change your password.');
  });

  it(`should say that the password is actual
      if was changed 10 days ago`, () => {
    const tenDaysAgo = new Date(Date.now());

    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

    const result = isPasswordActual(
      tenDaysAgo.getUTCFullYear(),
      tenDaysAgo.getMonth() + 1,
      tenDaysAgo.getDate(),
    );

    expect(result)
      .toBe('Password is actual.');
  });
});
