'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    expect(typeof isPasswordActual(2015, 5, 10)).toBe('string');
  });

  it(`should ask to change the password if 'days' >= 60`, () => {
    const lastYear
     = isPasswordActual(2025, 6, 29);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password if 30 >= 'days' < 60`, () => {
    const lastYear
     = isPasswordActual(2025, 8, 15);

    expect(lastYear)
      .toBe('You should change your password.');
  });

  it(`should inform your password is actual if 'days' <= 30`, () => {
    const lastYear = isPasswordActual(2025, 8, 26);

    expect(lastYear)
      .toBe('Password is actual.');
  });
});
