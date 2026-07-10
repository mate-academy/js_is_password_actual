'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');

  beforeAll(() => {
    jest
      .spyOn(Date, 'now')
      .mockImplementation(() => Date.UTC(2021, 5, 10, 12, 0, 0));
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    const result = isPasswordActual(2021, 6, 1);

    expect(typeof result).toBe('string');
  });

  it(`should return 'Password is actual.' for the example date June 1, 2021 (9 days ago)`, () => {
    const result = isPasswordActual(2021, 6, 1);

    expect(result).toBe('Password is actual.');
  });

  it(`should return 'You should change your password.' for the example date May 1, 2021 (40 days ago)`, () => {
    const result = isPasswordActual(2021, 5, 1);

    expect(result).toBe('You should change your password.');
  });

  it(`should return 'Immediately change the password!' for the example date June 9, 2020 (over a year ago)`, () => {
    const result = isPasswordActual(2020, 6, 9);

    expect(result).toBe('Immediately change the password!');
  });

  it(`should return 'Password is actual.' for exactly 30 days ago (May 11, 2021)`, () => {
    const result = isPasswordActual(2021, 5, 11);

    expect(result).toBe('Password is actual.');
  });

  it(`should return 'You should change your password.' for exactly 60 days ago (April 11, 2021)`, () => {
    const result = isPasswordActual(2021, 4, 11);

    expect(result).toBe('You should change your password.');
  });

  it(`should return 'Immediately change the password!' for 61 days ago (April 10, 2021)`, () => {
    const result = isPasswordActual(2021, 4, 10);

    expect(result).toBe('Immediately change the password!');
  });
});
