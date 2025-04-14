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
    expect(typeof isPasswordActual(2023, 9, 23) === 'string').toBeTruthy();
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear).toBe('Immediately change the password!');
  });

  it(
    `should ask to change the password if was changed`
      + `more than 30 days ago`,
    () => {
      const lastYear = isPasswordActual(
        today.year,
        today.month,
        today.date - 31
      );

      expect(lastYear).toBe('You should change your password.');
    }
  );

  it(`should tell that password is actual if less than 30 days passed`, () => {
    const lastYear = isPasswordActual(today.year, today.month, today.date - 29);

    expect(lastYear).toBe('Password is actual.');
  });

  it(`should tell that password is actual if exactly 30 days passed`, () => {
    const lastYear = isPasswordActual(today.year, today.month, today.date - 30);

    expect(lastYear).toBe('Password is actual.');
  });

  it(`should tell that password is actual if was passed today date`, () => {
    const lastYear = isPasswordActual(today.year, today.month, today.date);

    expect(lastYear).toBe('Password is actual.');
  });

  it(`should tell that password is actual if was passed future date`, () => {
    const lastYear = isPasswordActual(today.year, today.month, today.date + 1);

    expect(lastYear).toBe('Password is actual.');
  });
});
