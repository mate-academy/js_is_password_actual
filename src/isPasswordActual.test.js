'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');
  const moment = require('moment');
  const today = {
    year: moment().year(),
    month: moment().month() + 1,
    date: moment().date(),
  };

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    expect(typeof isPasswordActual(today.year, today.month, today.date))
      .toBe('string');
  });

  it(`should return 'Password is actual'`
    + `,if it was changed 30 or less days ago`, () => {
    const days30Ago = moment().subtract(30, 'days').add(1, 'M');
    const days20Ago = moment().subtract(20, 'days').add(1, 'M');
    const days10Ago = moment().subtract(10, 'days').add(1, 'M');

    expect(isPasswordActual(
      days30Ago.year(), days30Ago.month(), days30Ago.date(),
    ))
      .toBe('Password is actual.');

    expect(isPasswordActual(
      days20Ago.year(), days20Ago.month(), days20Ago.date(),
    ))
      .toBe('Password is actual.');

    expect(isPasswordActual(
      days10Ago.year(), days10Ago.month(), days10Ago.date(),
    ))
      .toBe('Password is actual.');
  });

  it(`should return 'You should change your password.'`
    + `,if it was changed more than 30 or less than 61 days ago`, () => {
    const days60Ago = moment().subtract(60, 'days').add(1, 'M');
    const days50Ago = moment().subtract(50, 'days').add(1, 'M');
    const days31Ago = moment().subtract(31, 'days').add(1, 'M');

    expect(isPasswordActual(
      days60Ago.year(), days60Ago.month(), days60Ago.date()
    ))
      .toBe('You should change your password.');

    expect(isPasswordActual(
      days50Ago.year(), days50Ago.month(), days50Ago.date()
    ))
      .toBe('You should change your password.');

    expect(isPasswordActual(
      days31Ago.year(), days31Ago.month(), days31Ago.date()
    ))
      .toBe('You should change your password.');
  });

  it(`should ask to change the password immediately,`
    + ` if it was changed more than 60 days ago`, () => {
    const days61Ago = moment().subtract(61, 'd').add(1, 'M');
    const yearAgo = moment().subtract(1, 'y').add(1, 'M');

    expect(isPasswordActual(
      yearAgo.year(), yearAgo.month(), yearAgo.date(),
    ))
      .toBe('Immediately change the password!');

    expect(isPasswordActual(
      days61Ago.year(), days61Ago.month(), days61Ago.date()
    ))
      .toBe('Immediately change the password!');
  });

  it('should throw an error if a property is undefined or not a number', () => {
    expect(() => isPasswordActual(false, today.month, null)).toThrow();
    expect(() => isPasswordActual(today.year, undefined, today.date)).toThrow();

    expect(() => isPasswordActual(undefined, today.month, today.date))
      .toThrow();
    expect(() => isPasswordActual(NaN, false, today.date)).toThrow();
    expect(() => isPasswordActual(null, false, today.date)).toThrow();
    expect(() => isPasswordActual('year', false, today.date)).toThrow();
  });

  it('should not work with future dates', () => {
    expect(() => isPasswordActual(today.year, today.month, today.date + 1))
      .toThrow();

    expect(() => isPasswordActual(today.year, today.month + 1, today.date))
      .toThrow();

    expect(() => isPasswordActual(today.year + 1, today.month, today.date))
      .toThrow();
  });

  it('should throw an error if a date is invalid (February 30)', () => {
    expect(() => isPasswordActual(2024, 2, 30)).toThrow();
    expect(() => isPasswordActual(2024, 14, 30)).toThrow();
    expect(() => isPasswordActual(2024, 27, 30)).toThrow();
    expect(() => isPasswordActual(2024, 1, 93)).toThrow();
    expect(() => isPasswordActual(2023, 2, 29)).toThrow();
  });
});
