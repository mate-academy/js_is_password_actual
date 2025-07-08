/* eslint-disable max-len */
'use strict';

const isPasswordActual = require('./isPasswordActual');

describe('isPasswordActual', () => {
  const RealDateNow = Date.now;

  // Fixăm "data curentă" la 2021-06-10 pentru testele noastre
  beforeAll(() => {
    const fixedDate = new Date(2021, 5, 10).getTime(); // iunie = 5

    global.Date.now = () => fixedDate;
  });

  afterAll(() => {
    global.Date.now = RealDateNow;
  });

  test('should return "Immediately change the password!" if more than 60 days passed', () => {
    expect(isPasswordActual(2020, 6, 9))
      .toBe('Immediately change the password!');
  });

  test('should return "You should change your password." if more than 30 but <= 60 days passed', () => {
    expect(isPasswordActual(2021, 5, 1))
      .toBe('You should change your password.');
  });

  test('should return "Password is actual." if 30 days or fewer have passed', () => {
    expect(isPasswordActual(2021, 6, 1))
      .toBe('Password is actual.');
  });

  test('should return "Password is actual." if password changed today', () => {
    expect(isPasswordActual(2021, 6, 10))
      .toBe('Password is actual.');
  });

  test('should return "You should change your password." for exactly 31 days', () => {
    expect(isPasswordActual(2021, 5, 10))
      .toBe('You should change your password.');
  });

  test('should return "Immediately change the password!" for exactly 61 days', () => {
    expect(isPasswordActual(2021, 4, 10))
      .toBe('Immediately change the password!');
  });
});
