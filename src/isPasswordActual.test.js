'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');
  const now = new Date();
  const today = {
    year: now.getUTCFullYear(),
    month: now.getMonth() + 1,
    date: now.getDate(),
  };

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    const result = isPasswordActual(today.year, today.month, today.date);
    expect(typeof result).toBe('string');
  });

  it(`should return "Immediately change the password!" for 1 year ago`, () => {
    const lastYear = isPasswordActual(
      today.year - 1, today.month, today.date
    );
    const expected = 'Immediately change the password!';
    expect(lastYear).toBe(expected);
  });

  it(`should return "Password is actual." for today`, () => {
    const todayMsg = isPasswordActual(
      today.year, today.month, today.date
    );
    const expected = 'Password is actual.';
    expect(todayMsg).toBe(expected);
  });

  it(`should return "You should change your password." for 31 days ago`, () => {
    const past = new Date();
    past.setDate(past.getDate() - 31);
    const msg = isPasswordActual(
      past.getFullYear(), past.getMonth() + 1, past.getDate()
    );
    const expected = 'You should change your password.';
    expect(msg).toBe(expected);
  });

  it(`should return "Immediately change the password!" for 61 days ago`, () => {
    const past = new Date();
    past.setDate(past.getDate() - 61);
    const msg = isPasswordActual(
      past.getFullYear(), past.getMonth() + 1, past.getDate()
    );
    const expected = 'Immediately change the password!';
    expect(msg).toBe(expected);
  });
});

