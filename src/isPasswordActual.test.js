'use strict';

const isPasswordActual = require('./isPasswordActual');

describe(`Function 'isPasswordActual':`, () => {
  // Stały timestamp dla deterministycznych testów
  const FIXED_TS = new Date('2025-01-01T00:00:00').getTime();

  beforeAll(() => {
    jest.spyOn(Date, 'now').mockReturnValue(FIXED_TS);
  });

  afterAll(() => {
    Date.now.mockRestore();
  });

  const now = new Date(Date.now());
  const today = {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
  };

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    const result = isPasswordActual(today.year, today.month, today.day);
    expect(typeof result).toBe('string');
  });

  it(`should return "Immediately change the password!" for 1 year ago`, () => {
    const lastYear = isPasswordActual(
      today.year - 1,
      today.month,
      today.day
    );
    const expected = 'Immediately change the password!';
    expect(lastYear).toBe(expected);
  });

  it(`should return "Password is actual." for today`, () => {
    const todayMsg = isPasswordActual(
      today.year,
      today.month,
      today.day
    );
    const expected = 'Password is actual.';
    expect(todayMsg).toBe(expected);
  });

  it(`should return "You should change your password." for 31 days ago`, () => {
    const past = new Date(Date.now());
    past.setDate(past.getDate() - 31);
    const msg = isPasswordActual(
      past.getFullYear(),
      past.getMonth() + 1,
      past.getDate()
    );
    const expected = 'You should change your password.';
    expect(msg).toBe(expected);
  });

  it(`should return "Immediately change the password!" for 61 days ago`, () => {
    const past = new Date(Date.now());
    past.setDate(past.getDate() - 61);
    const msg = isPasswordActual(
      past.getFullYear(),
      past.getMonth() + 1,
      past.getDate()
    );
    const expected = 'Immediately change the password!';
    expect(msg).toBe(expected);
  });

  it(`should return "Password is actual." for exactly 30 days ago`, () => {
    const past = new Date(Date.now());
    past.setDate(past.getDate() - 30);
    const msg = isPasswordActual(
      past.getFullYear(),
      past.getMonth() + 1,
      past.getDate()
    );
    const expected = 'Password is actual.';
    expect(msg).toBe(expected);
  });

  it(`should return "You should change your password." for exactly 60 days ago`, () => {
    const past = new Date(Date.now());
    past.setDate(past.getDate() - 60);
    const msg = isPasswordActual(
      past.getFullYear(),
      past.getMonth() + 1,
      past.getDate()
    );
    const expected = 'You should change your password.';
    expect(msg).toBe(expected);
  });
});


