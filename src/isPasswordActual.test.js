'use strict';

describe(`Function 'isPasswordActual' should`, () => {
  const isPasswordActual = require('./isPasswordActual');

  it(`be declared`, () => {
    expect(isPasswordActual)
      .toBeInstanceOf(Function);
  });

  it(`return a string`, () => {
    const result = isPasswordActual(1, 1, 1);

    expect(typeof result)
      .toBe('string');
  });

  it(`return correct answer`
    + ` if password was updated < 30 days ago`, () => {
    expect(isPasswordActual(2022, 11, 1))
      .toBe('Password is actual.');
  });

  it(`return correct answer`
    + ` if password was updated > 30 days ago`, () => {
    expect(isPasswordActual(2022, 10, 1))
      .toBe('You should change your password.');
  });

  it(`return correct answer`
    + ` if password was updated > 60 days ago`, () => {
    expect(isPasswordActual(2022, 7, 1))
      .toBe('Immediately change the password!');
  });
});
