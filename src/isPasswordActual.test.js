'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');
  const fixedDate = new Date('2021-06-10T00:00:00.000Z').getTime();

  beforeAll(() => {
    jest.spyOn(Date, 'now').mockReturnValue(fixedDate);
  });

  afterAll(() => {
    Date.now.mockRestore();
  });

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    const result = isPasswordActual(2021, 6, 10);

    expect(typeof result).toBe('string');
  });

  it(`should return 'Password is actual.' if password changed today`, () => {
    const result = isPasswordActual(2021, 6, 10);

    expect(result).toBe('Password is actual.');
  });

  it(`should return 'Password is actual.' if 30 days have passed`, () => {
    const result = isPasswordActual(2021, 5, 10);

    expect(result).toBe('Password is actual.');
  });

  it(`should return 'You should change your password.' if 31 days have passed`, () => {
    const result = isPasswordActual(2021, 5, 9);

    expect(result).toBe('You should change your password.');
  });

  it(`should return 'You should change your password.' if 60 days have passed`, () => {
    const result = isPasswordActual(2021, 4, 10);

    expect(result).toBe('You should change your password.');
  });

  it(`should return 'Immediately change the password!' if 61 days have passed`, () => {
    const result = isPasswordActual(2021, 4, 9);

    expect(result).toBe('Immediately change the password!');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    const result = isPasswordActual(2020, 6, 10);

    expect(result).toBe('Immediately change the password!');
  });
});
