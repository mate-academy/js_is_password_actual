'use strict';

const isPasswordActual = require('./isPasswordActual');

describe(`Function 'isPasswordActual':`, () => {
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

  it(`returns function instance`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`returns a string`, () => {
    const result = isPasswordActual(today.year, today.month, today.day);
    expect(typeof result).toBe('string');
  });

  it(`returns "Immediately change the password!" for 1 year ago`, () => {
    const lastYear = isPasswordActual(
      today.year - 1,
      today.month,
      today.day
    );
    const expected = 'Immediately change the password!';
    expect(lastYear).toBe(expected);
  });

  it(`returns "Password is actual." for today`, () => {
    const todayMsg = isPasswordActual(today.year, today.month, today.day);
    const expected = 'Password is actual.';
    expect(todayMsg).toBe(expected);
  });

  it(`returns "You should change password." for 31 days ago`, () => {
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

  it(`returns "Immediately change password!" for 61 days ago`, () => {
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

  it(`returns "Password is actual." for 30 days ago`, () => {
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

  it(`returns "You should change password." for 60 days ago`, () => {
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

