'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');
  const date = new Date(Date.now());
  const today = {
    year: date.getUTCFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
  };

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    const result = isPasswordActual(today.year, today.month, today.date);
    expect(typeof result).toBe('string');
  });

  it(`should return "You should change your password." if password was changed 45 days ago`, () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 45);
    const result = isPasswordActual(
      pastDate.getFullYear(),
      pastDate.getMonth() + 1,
      pastDate.getDate()
    );
    expect(result).toBe('You should change your password.');
  });


  it(`should ask to change the password if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });
});
