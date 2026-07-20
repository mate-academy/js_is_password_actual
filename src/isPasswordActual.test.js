'use strict';

const isPasswordActual = require('./isPasswordActual');

describe('isPasswordActual', () => {
  beforeAll(() => {
    jest.spyOn(Date, 'now').mockReturnValue(new Date(2021, 5, 10).getTime());
  });

  afterAll(() => {
    Date.now.mockRestore();
  });

  test('returns "Password is actual." for today', () => {
    expect(isPasswordActual(2021, 6, 10)).toBe('Password is actual.');
  });

  test('returns "Password is actual." for exactly 30 days', () => {
    expect(isPasswordActual(2021, 5, 11)).toBe('Password is actual.');
  });

  test('returns "You should change your password." for 31 days', () => {
    expect(isPasswordActual(2021, 5, 10)).toBe(
      'You should change your password.',
    );
  });

  test('returns "You should change your password." for exactly 60 days', () => {
    expect(isPasswordActual(2021, 4, 11)).toBe(
      'You should change your password.',
    );
  });

  test('returns "Immediately change the password!" for 61 days', () => {
    expect(isPasswordActual(2021, 4, 10)).toBe(
      'Immediately change the password!',
    );
  });
});
