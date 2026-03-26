'use strict';

describe(`isPasswordActual`, () => {
  const isPasswordActual = require('./isPasswordActual');
  const date = new Date(Date.now());
  const today = {
    year: date.getUTCFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
  };

  it(`should be declared as a function`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return "Password is actual." if the password was changed today`, () => {
    expect(isPasswordActual(today.year, today.month, today.date)).toBe(
      'Password is actual.',
    );
  });

  it(`should return "Password is actual." if the password was changed within the last 30 days`, () => {
    const tenDaysAgo = new Date();

    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

    expect(
      isPasswordActual(
        tenDaysAgo.getFullYear(),
        tenDaysAgo.getMonth() + 1,
        tenDaysAgo.getDate(),
      ),
    ).toBe('Password is actual.');
  });

  it(`should return "You should change your password." if the password was changed 31 days ago`, () => {
    const days31Ago = new Date();

    days31Ago.setDate(days31Ago.getDate() - 31);

    expect(
      isPasswordActual(
        days31Ago.getFullYear(),
        days31Ago.getMonth() + 1,
        days31Ago.getDate(),
      ),
    ).toBe('You should change your password.');
  });

  it(`should return "You should change your password." if the password was changed 60 days ago`, () => {
    const days60Ago = new Date();

    days60Ago.setDate(days60Ago.getDate() - 60);

    expect(
      isPasswordActual(
        days60Ago.getFullYear(),
        days60Ago.getMonth() + 1,
        days60Ago.getDate(),
      ),
    ).toBe('You should change your password.');
  });

  it(`should return "Immediately change the password!" if the password was changed 61 days ago`, () => {
    const days61Ago = new Date();

    days61Ago.setDate(days61Ago.getDate() - 61);

    expect(
      isPasswordActual(
        days61Ago.getFullYear(),
        days61Ago.getMonth() + 1,
        days61Ago.getDate(),
      ),
    ).toBe('Immediately change the password!');
  });

  it(`should return "Immediately change the password!" if the password was changed a year ago`, () => {
    expect(isPasswordActual(today.year - 1, today.month, today.date)).toBe(
      'Immediately change the password!',
    );
  });

  it(`should handle the end of the month correctly`, () => {
    const lastDayOfMonth = new Date(today.year, today.month - 1, 0);

    expect(
      isPasswordActual(
        lastDayOfMonth.getFullYear(),
        lastDayOfMonth.getMonth() + 1,
        lastDayOfMonth.getDate(),
      ),
    ).toBe('Password is actual.');
  });

  it(`should return "Password is actual." if the password was changed exactly 30 days ago`, () => {
    const thirtyDaysAgo = new Date();

    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    expect(
      isPasswordActual(
        thirtyDaysAgo.getFullYear(),
        thirtyDaysAgo.getMonth() + 1,
        thirtyDaysAgo.getDate(),
      ),
    ).toBe('Password is actual.');
  });
});
