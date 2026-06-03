'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');
  let dateSpy;

  beforeEach(() => {
    const mockDateMs = new Date(2021, 5, 10).getTime();

    dateSpy = jest.spyOn(Date, 'now').mockImplementation(() => mockDateMs);
  });

  afterEach(() => {
    dateSpy.mockRestore();
  });

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    expect(typeof isPasswordActual(2021, 6, 1)).toBe('string');
  });

  it(`should return immediate change status if changed more than 60 days ago`, () => {
    expect(isPasswordActual(2020, 6, 9)).toBe(
      'Immediately change the password!',
    );
  });

  it(`should return warning status if changed between 31 and 60 days ago`, () => {
    expect(isPasswordActual(2021, 5, 1)).toBe(
      'You should change your password.',
    );
  });

  it(`should return actual status if changed 30 days ago or less`, () => {
    expect(isPasswordActual(2021, 6, 1)).toBe('Password is actual.');
  });
});
