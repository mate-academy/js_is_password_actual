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
    expect(typeof isPasswordActual(today.year, today.month, today.date))
      .toBe('string');
  });

  it(`should ask to change the password immediately `
    + `if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it(`should tell that the password is actual `
    + `if was changed 30 days ago`, () => {
    const dateLocal = new Date(Date.now());

    dateLocal.setDate(dateLocal.getDate() - 30);

    const testDay = {
      year: dateLocal.getUTCFullYear(),
      month: dateLocal.getMonth() + 1,
      date: dateLocal.getDate(),
    };

    const result = isPasswordActual(testDay.year, testDay.month, testDay.date);

    expect(result)
      .toBe('Password is actual.');
  });

  it(`should tell that the password is actual `
    + `if was changed 30 days ago`, () => {
    const dateLocal = new Date(Date.now());

    dateLocal.setDate(dateLocal.getDate() - 30);

    const testDay = {
      year: dateLocal.getUTCFullYear(),
      month: dateLocal.getMonth() + 1,
      date: dateLocal.getDate(),
    };

    const result = isPasswordActual(testDay.year, testDay.month, testDay.date);

    expect(result)
      .toBe('Password is actual.');
  });

  it(`should tell that the password is actual `
    + `if was changed less than 30 days ago`, () => {
    const dateLocal = new Date(Date.now());

    dateLocal.setDate(dateLocal.getDate() - 29);

    const testDay = {
      year: dateLocal.getUTCFullYear(),
      month: dateLocal.getMonth() + 1,
      date: dateLocal.getDate(),
    };

    const result = isPasswordActual(testDay.year, testDay.month, testDay.date);

    expect(result)
      .toBe('Password is actual.');
  });

  it(`should ask to change the password `
    + `if was changed more than 30 and less than 60 days ago`, () => {
    const dateLocal = new Date(Date.now());

    dateLocal.setDate(dateLocal.getDate() - 50);

    const testDay = {
      year: dateLocal.getUTCFullYear(),
      month: dateLocal.getMonth() + 1,
      date: dateLocal.getDate(),
    };

    const result = isPasswordActual(testDay.year, testDay.month, testDay.date);

    expect(result)
      .toBe('You should change your password.');
  });

  it(`should ask to change the password immidiatly `
    + `if was changed more than 60 days ago`, () => {
    const dateLocal = new Date(Date.now());

    dateLocal.setDate(dateLocal.getDate() - 61);

    const testDay = {
      year: dateLocal.getUTCFullYear(),
      month: dateLocal.getMonth() + 1,
      date: dateLocal.getDate(),
    };

    const result = isPasswordActual(testDay.year, testDay.month, testDay.date);

    expect(result)
      .toBe('Immediately change the password!');
  });
});
