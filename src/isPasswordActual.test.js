'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');
  const MOCK_DATE = new Date(2021, 5, 10);

  beforeAll(() => {
    jest
      .spyOn(global.Date, 'now')
      .mockImplementation(() => MOCK_DATE.getTime());
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    expect(typeof isPasswordActual(2021, 6, 10)).toBe('string');
  });

  // write more tests here
  it(`should tell the password is actual
    if it was changed 30 days ago or earlier`, () => {
    const lastYear = isPasswordActual(2021, 6, 1);

    expect(lastYear).toBe('Password is actual.');
  });

  it(`should tell to change the password
    if it was changed between 30 and 60 days ago`, () => {
    const lastYear = isPasswordActual(2021, 5, 1);

    expect(lastYear).toBe('You should change your password.');
  });

  it(`should tell to immediately change the password
    if it was changed more than 60 days ago`, () => {
    const lastYear = isPasswordActual(2020, 6, 1);

    expect(lastYear).toBe('Immediately change the password!');
  });
});
