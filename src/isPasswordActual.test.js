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
    expect(typeof isPasswordActual(today.year, today.month, today.date)).toBe('string');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });
  it(`should ask to change the password if was changed a month ago`, () => {
    const lastMonth = isPasswordActual(today.year, today.month - 2, today.date);

    expect(lastMonth)
      .toBe('You should change your password.');
  });
  it(`should not ask to change the password if was changed less than a month ago`, () => {
    const tenDaysAgo = isPasswordActual(today.year, today.month, today.date - 10);

    expect(tenDaysAgo)
      .toBe('Password is actual.');
  });

  it('should ask to change the password if it was changed exactly 30 days ago', () => {
    const thirtyDaysAgo = isPasswordActual(today.year, today.month, today.date - 30);
    expect(thirtyDaysAgo).toBe('Password is actual.');
  });
  it('should ask to change the password if it was changed exactly 60 days ago', () => {
    const thirtyDaysAgo = isPasswordActual(today.year, today.month, today.date - 60);
    expect(thirtyDaysAgo).toBe('You should change your password.');
  });

  it('should correctly handle January (month 0)', () => {
    const firstJan = isPasswordActual(today.year, 0, today.date);
    expect(typeof firstJan).toBe('string');
  });
});
