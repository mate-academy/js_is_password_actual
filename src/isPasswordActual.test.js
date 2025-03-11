'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');
  const date = new Date(Date.now());
  const today = {
    year: date.getUTCFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
  };

  function getPastDate(daysAgo) {
    const pastDate = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);

    return {
      year: pastDate.getUTCFullYear(),
      month: pastDate.getMonth() + 1,
      date: pastDate.getDate(),
    };
  }

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

  it(`should return "Password is actual."
    if the password was updated today`, () => {
    expect(isPasswordActual(today.year, today.month, today.date)).toBe(
      'Password is actual.'
    );
  });

  it(`should return "Password is actual."
    if the password was updated exactly 30 days ago`, () => {
    const past = getPastDate(30);

    expect(isPasswordActual(past.year, past.month, past.date)).toBe(
      'Password is actual.'
    );
  });

  it(`should return "You should change your password."
    if the password was updated 31 days ago`, () => {
    const past = getPastDate(31);

    expect(isPasswordActual(past.year, past.month, past.date)).toBe(
      'You should change your password.'
    );
  });

  it(`should return "You should change your password."
    if the password was updated exactly 60 days ago`, () => {
    const past = getPastDate(60);

    expect(isPasswordActual(past.year, past.month, past.date)).toBe(
      'You should change your password.'
    );
  });

  it(`should return "Immediately change the password!"
    if the password was updated 61 days ago`, () => {
    const past = getPastDate(61);

    expect(isPasswordActual(past.year, past.month, past.date)).toBe(
      'Immediately change the password!'
    );
  });
});
