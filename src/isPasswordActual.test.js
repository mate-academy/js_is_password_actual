'use strict';

describe(`Function 'isPasswordActual':`, () => {
  jest.useFakeTimers().setSystemTime(new Date('2021-06-10'));

  const isPasswordActual = require('./isPasswordActual');

  const today = {
    year: 2021,
    month: 6,
    date: 10,
  };

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    const actual = isPasswordActual(today.year, today.month, today.date);

    expect(typeof actual).toBe('string');
  });

  it(`should іmmediately to change the password
    if was changed a year ago`, () => {
    const actual = isPasswordActual(today.year - 1, today.month, today.date);

    expect(actual).toBe('Immediately change the password!');
  });

  it(`should іmmediately to change the password
    if was changed more than 60 days ago`, () => {
    const actual = isPasswordActual(2021, 4, 9);

    expect(actual).toBe('Immediately change the password!');
  });

  it(`should to change the password
    if was changed 60 days ago`, () => {
    const actual = isPasswordActual(2021, 4, 11);

    expect(actual).toBe('You should change your password.');
  });

  it(`should to change the password
    if was changed 53 days ago`, () => {
    const actual = isPasswordActual(2021, 4, 18);

    expect(actual).toBe('You should change your password.');
  });

  it(`should to change the password
    if was changed 31 days ago`, () => {
    const actual = isPasswordActual(2021, 5, 10);

    expect(actual).toBe('You should change your password.');
  });

  it(`password is actual
    if was changed 30 days ago`, () => {
    const actual = isPasswordActual(2021, 5, 11);

    expect(actual).toBe('Password is actual.');
  });

  it(`password is actual
    if was changed 26 days ago`, () => {
    const actual = isPasswordActual(2021, 5, 15);

    expect(actual).toBe('Password is actual.');
  });

  it(`password is actual
    if was changed 1 day ago`, () => {
    const actual = isPasswordActual(today.year, today.month, today.date - 1);

    expect(actual).toBe('Password is actual.');
  });

  it(`password is actual
    if was changed today`, () => {
    const actual = isPasswordActual(today.year, today.month, today.date);

    expect(actual).toBe('Password is actual.');
  });
});
