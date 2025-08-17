/* eslint-disable max-len */
'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual.js');
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
    expect(typeof isPasswordActual(2010, 3, 21)).toBe('string');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it(`should return that password is actual if was changed thirty days ago`, () => {
    const thirtyDaysAgo = isPasswordActual(today.year, today.month, today.date - 30);

    expect(thirtyDaysAgo)
      .toBe('Password is actual.');
  });

  it(`should recommends changing password if was changed thirtyseven days ago`, () => {
    const thirtySevenDaysAgo = isPasswordActual(today.year, today.month, today.date - 37);

    expect(thirtySevenDaysAgo)
      .toBe('You should change your password.');
  });

  it(`should ask to change the password if was changed 60 days ago`, () => {
    const sixtyOneDaysAgo = isPasswordActual(today.year, today.month, today.date - 61);

    expect(sixtyOneDaysAgo)
      .toBe('Immediately change the password!');
  });

  it(`should recommends changing the password if was changed 60 days ago`, () => {
    const sixtyDaysAgo = isPasswordActual(today.year, today.month, today.date - 60);

    expect(sixtyDaysAgo)
      .toBe('You should change your password.');
  });

  it('should return message about password', () => {
    const date1 = isPasswordActual(2020, 6, 9);

    expect(date1).toBe('Immediately change the password!');
  });

  it('should return message about password', () => {
    const date2 = isPasswordActual(2021, 6, 1);

    expect(date2).toBe('Immediately change the password!');
  });

  it('should return message about password', () => {
    const date3 = isPasswordActual(2021, 5, 1);

    expect(date3).toBe('Immediately change the password!');
  });
});
