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

  it(`shouldn't ask to change the password if it was changed a day ago`, () => {
    const lastDay = isPasswordActual(today.year, today.month, today.date - 1);

    expect(lastDay)
      .toBe('Password is actual.');
  });

  it(`should ask to change the password if it was changed 
     more than a month ago`, () => {
    const lastMonth = isPasswordActual(today.year, today.month - 1, today.date);

    expect(lastMonth)
      .toBe('You should change your password.');
  });

  it(`should ask to change the password if it was changed
      more than two months ago`, () => {
    const lastTwoMonths = isPasswordActual(
      today.year, 
      today.month - 2, 
      today.date);

    expect(lastTwoMonths)
      .toBe('Immediately change the password!');
  });

  // write more tests here
});
