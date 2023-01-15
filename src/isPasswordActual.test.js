'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');
  const date = new Date(Date.now());
  const today = {
    year: date.getUTCFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
  };

  test(`should be declared`, () => {
    expect(isPasswordActual)
      .toBeInstanceOf(Function);
  });

  test(`should return a string`, () => {
    expect(typeof isPasswordActual(today.year, today.month, today.date))
      .toBe('string');
  });

  test(`should return 'Password is actual.' 
  if the last password change was 30 days ago`, () => {
    const lastChangePassword
      = isPasswordActual(today.year, today.month, today.date - 30);

    expect(lastChangePassword)
      .toBe('Password is actual.');
  });

  test(`should return 'Password is actual.' 
  if the last password change was 15 days ago`, () => {
    const lastChangePassword
      = isPasswordActual(today.year, today.month, today.date - 15);

    expect(lastChangePassword)
      .toBe('Password is actual.');
  });

  test(`should return 'Password is actual.' 
  if the last password change was yesterday`, () => {
    const lastChangePassword
      = isPasswordActual(today.year, today.month, today.date - 1);

    expect(lastChangePassword)
      .toBe('Password is actual.');
  });

  test(`should return 'Password is actual.' if the last password change
  was today`, () => {
    const lastChangePassword
      = isPasswordActual(today.year, today.month, today.date);

    expect(lastChangePassword)
      .toBe('Password is actual.');
  });

  test(`should return 'You should change your password.' 
  if the last password change was 31 days ago`, () => {
    const lastChangePassword
      = isPasswordActual(today.year, today.month - 1, today.date);

    expect(lastChangePassword)
      .toBe('You should change your password.');
  });

  test(`should return 'You should change your password.' 
  if the last password change was more than month ago`, () => {
    const lastChangePassword
      = isPasswordActual(today.year, today.month - 1, today.date - 1);

    expect(lastChangePassword)
      .toBe('You should change your password.');
  });

  test(`should return 'You should change your password.' 
  if the last password change was 59 days ago`, () => {
    const lastChangePassword
      = isPasswordActual(today.year, today.month, today.date - 59);

    expect(lastChangePassword)
      .toBe('You should change your password.');
  });

  test(`should return 'You should change your password.' 
  if the last password change was 60 days ago`, () => {
    const lastChangePassword
      = isPasswordActual(today.year, today.month, today.date - 60);

    expect(lastChangePassword)
      .toBe('You should change your password.');
  });

  test(`should return 'Immediately change the password!' 
  if the last password change was 61 days ago`, () => {
    const lastChangePassword
      = isPasswordActual(today.year, today.month, today.date - 61);

    expect(lastChangePassword)
      .toBe('Immediately change the password!');
  });

  test(`should return 'Immediately change the password!' 
  if the last password change was more than two month ago`, () => {
    const lastChangePassword
      = isPasswordActual(today.year, today.month - 2, today.date);

    expect(lastChangePassword)
      .toBe('Immediately change the password!');
  });

  test(`should return 'Immediately change the password!' 
  if the last password was changed a year ago`, () => {
    const lastYear
      = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  test(`should return 'Immediately change the password!' 
  if the last password was changed more than year ago`, () => {
    const lastYear
      = isPasswordActual(today.year - 1, today.month - 1, today.date - 1);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  // write more tests here
});
