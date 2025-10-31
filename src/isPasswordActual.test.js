'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');
 

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    const result = isPasswordActual(2020, 6, 9);

    expect(typeof result === 'string').toBeTruthy();
  });

  it(`date > actual date`, () => {
    const result = isPasswordActual(3020, 6, 9);

    expect(result).toBe('Password is actual.');
  });

  it(`date is decimal`, () => {
    const result = isPasswordActual(2020.4, 6.5, 9.6);

    expect(result).toBe('Immediately change the password!');
  });

  it(`date is negative`, () => {
    const result = isPasswordActual(-4, -5, -9);

    expect(result).toBe('Immediately change the password!');
  });

  test('mock system time to 30 days ago', () => {
    jest.useFakeTimers();

    const now30 = new Date();
    const thirtyDaysAgo = new Date(now30.setDate(now30.getDate() - 30));

    jest.setSystemTime(thirtyDaysAgo);

    expect(new Date().toISOString()).toBe(thirtyDaysAgo.toISOString());

    expect(
      isPasswordActual(
        thirtyDaysAgo.getUTCFullYear(),
        thirtyDaysAgo.getUTCMonth(),
        thirtyDaysAgo.getDate()
      )
    ).toBe('Password is actual.');
  });

  test('mock system time to 31 days ago', () => {
    jest.useFakeTimers();

    const now31 = new Date();
    const thirtyOneDaysAgo = new Date(now31.setDate(now31.getDate() - 31));

    jest.setSystemTime(thirtyOneDaysAgo);

    expect(new Date().toISOString()).toBe(thirtyOneDaysAgo.toISOString());

    expect(
      isPasswordActual(
        thirtyOneDaysAgo.getUTCFullYear(),
        thirtyOneDaysAgo.getUTCMonth(),
        thirtyOneDaysAgo.getUTCDate()
      )
    ).toBe('You should change your password.');
  });

  test('mock system time to 60 days ago', () => {
    jest.useFakeTimers();

    const now60 = new Date();
    const sixtyDaysAgo = new Date(now60.setDate(now60.getDate() - 60));

    jest.setSystemTime(sixtyDaysAgo);

    expect(new Date().toISOString()).toBe(sixtyDaysAgo.toISOString());

    expect(
      isPasswordActual(
        sixtyDaysAgo.getUTCFullYear(),
        sixtyDaysAgo.getUTCMonth(),
        sixtyDaysAgo.getDate()
      )
    ).toBe('You should change your password.');
  });

  test('mock system time to 61 days ago', () => {
    jest.useFakeTimers();

    const now61 = new Date();
    const sixtyOneDaysAgo = new Date(now61.setDate(now61.getDate() - 61));


    jest.setSystemTime(sixtyOneDaysAgo);

    expect(new Date().toISOString()).toBe(sixtyOneDaysAgo.toISOString());

    expect(
      isPasswordActual(
        sixtyOneDaysAgo.getUTCFullYear(),
        sixtyOneDaysAgo.getUTCMonth(),
        sixtyOneDaysAgo.getDate()
      )
    ).toBe('Immediately change the password!');
  });
});
