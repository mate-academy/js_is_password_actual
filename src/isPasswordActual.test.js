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
    expect(isPasswordActual(today.year, today.month, today.date))
      .toBe('Password is actual.');
  });

  it(`should ask to change the password immediately
    if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  // write more tests here
  it(`should tell the password is actual
    if it was changed 30 days ago`, () => {
    const lastYear = isPasswordActual(today.year, today.month, today.date - 30);

    expect(lastYear)
      .toBe('Password is actual.');
  });

  it(`should tell the password is actual
    if it was changed less than 30 days ago`, () => {
    const lastYear = isPasswordActual(today.year, today.month, today.date - 10);

    expect(lastYear)
      .toBe('Password is actual.');
  });

  it(`should tell to change the password
    if it was changed 60 days ago`, () => {
    const lastYear = isPasswordActual(
      today.year, today.month - 1, today.date - 29
    );

    expect(lastYear)
      .toBe('You should change your password.');
  });

  it(`should tell to change the password
    if it was changed between 30 and 60 days ago`, () => {
    const lastYear = isPasswordActual(
      today.year, today.month - 1, today.date - 10
    );

    expect(lastYear)
      .toBe('You should change your password.');
  });

  it(`should tell to immediately change the password
    if it was changed more than 60 days ago`, () => {
    const lastYear = isPasswordActual(
      today.year, today.month - 3, today.date - 10
    );

    expect(lastYear)
      .toBe('Immediately change the password!');
  });
});
