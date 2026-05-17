'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');

  const daysAgo = (n) => {
    const d = new Date(Date.now() - n * 24 * 60 * 60 * 1000);

    return [d.getFullYear(), d.getMonth() + 1, d.getDate()];
  };

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    expect(typeof isPasswordActual(...daysAgo(0))).toBe('string');
  });

  it(`should return 'Password is actual.' if changed today`, () => {
    expect(isPasswordActual(...daysAgo(0))).toBe('Password is actual.');
  });

  it(`should return 'Password is actual.' if changed 15 days ago`, () => {
    expect(isPasswordActual(...daysAgo(15))).toBe('Password is actual.');
  });

  it(`should return 'Password is actual.' if changed exactly 30 days ago`, () => {
    expect(isPasswordActual(...daysAgo(30))).toBe('Password is actual.');
  });

  it(`should return 'You should change your password.' if changed 31 days ago`, () => {
    expect(isPasswordActual(...daysAgo(31))).toBe(
      'You should change your password.',
    );
  });

  it(`should return 'You should change your password.' if changed 45 days ago`, () => {
    expect(isPasswordActual(...daysAgo(45))).toBe(
      'You should change your password.',
    );
  });

  it(`should return 'You should change your password.' if changed exactly 60 days ago`, () => {
    expect(isPasswordActual(...daysAgo(60))).toBe(
      'You should change your password.',
    );
  });

  it(`should return 'Immediately change the password!' if changed 61 days ago`, () => {
    expect(isPasswordActual(...daysAgo(61))).toBe(
      'Immediately change the password!',
    );
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    const d = new Date(Date.now());

    expect(
      isPasswordActual(d.getFullYear() - 1, d.getMonth() + 1, d.getDate()),
    ).toBe('Immediately change the password!');
  });
});
