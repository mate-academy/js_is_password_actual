'use strict';

const isPasswordActual = require('./isPasswordActual');

describe('Function isPasswordActual:', () => {
  const date = new Date(Date.now());
  const today = {
    year: date.getUTCFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
  };

  it('is declared', () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it('returns a string', () => {
    const result = isPasswordActual(today.year, today.month, today.date);

    expect(typeof result).toBe('string');
  });

  it('returns "Immediately change the password!" for a year ago', () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear).toBe('Immediately change the password!');
  });

  it('returns "Password is actual." for today', () => {
    const result = isPasswordActual(today.year, today.month, today.date);

    expect(result).toBe('Password is actual.');
  });

  it('returns "Password is actual." for yesterday', () => {
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const result = isPasswordActual(
      yesterday.getUTCFullYear(),
      yesterday.getMonth() + 1,
      yesterday.getDate()
    );

    expect(result).toBe('Password is actual.');
  });

  it('returns "You should change your password." for 31 days ago', () => {
    const thirtyOneDaysAgo = new Date(Date.now() - 31 * 24 * 60 * 60 * 1000);
    const result = isPasswordActual(
      thirtyOneDaysAgo.getUTCFullYear(),
      thirtyOneDaysAgo.getMonth() + 1,
      thirtyOneDaysAgo.getDate()
    );

    expect(result).toBe('You should change your password.');
  });

  it('returns "Immediately change the password!" for 61 days ago', () => {
    const sixtyOneDaysAgo = new Date(Date.now() - 61 * 24 * 60 * 60 * 1000);
    const result = isPasswordActual(
      sixtyOneDaysAgo.getUTCFullYear(),
      sixtyOneDaysAgo.getMonth() + 1,
      sixtyOneDaysAgo.getDate()
    );

    expect(result).toBe('Immediately change the password!');
  });

  it('returns "You should change your password." for 45 days ago', () => {
    const fortyFiveDaysAgo = new Date(Date.now() - 45 * 24 * 60 * 60 * 1000);
    const result = isPasswordActual(
      fortyFiveDaysAgo.getUTCFullYear(),
      fortyFiveDaysAgo.getMonth() + 1,
      fortyFiveDaysAgo.getDate()
    );

    expect(result).toBe('You should change your password.');
  });

  it('returns "Password is actual." for 30 days ago', () => {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const result = isPasswordActual(
      thirtyDaysAgo.getUTCFullYear(),
      thirtyDaysAgo.getMonth() + 1,
      thirtyDaysAgo.getDate()
    );

    expect(result).toBe('Password is actual.');
  });
});
