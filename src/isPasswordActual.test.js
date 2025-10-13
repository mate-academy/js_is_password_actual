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
    const result = isPasswordActual(today.year, today.month, today.date);
    expect(typeof result).toBe('string');
  });

  it(`should ask to change the password if it was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);
    expect(lastYear).toBe('Immediately change the password!');
  });

  it(`should return "Password is actual." if password was changed today`, () => {
    const todayMsg = isPasswordActual(today.year, today.month, today.date);
    expect(todayMsg).toBe('Password is actual.');
  });

  it(`should return "You should change your password." if changed 31 days ago`, () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 31);
    const msg = isPasswordActual(pastDate.getFullYear(), pastDate.getMonth() + 1, pastDate.getDate());
    expect(msg).toBe('You should change your password.');
  });

  it(`should return "Immediately change the password!" if changed 61 days ago`, () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 61);
    const msg = isPasswordActual(pastDate.getFullYear(), pastDate.getMonth() + 1, pastDate.getDate());
    expect(msg).toBe('Immediately change the password!');
  });
});
