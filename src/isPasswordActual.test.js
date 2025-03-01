"use strict";

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require("./isPasswordActual");
  const dateNow = new Date(Date.now());
  const today = {
    year: dateNow.getUTCFullYear(),
    month: dateNow.getMonth() + 1,
    date: dateNow.getDate(),
  };

  const { date, month, year } = today;

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    expect(typeof (isPasswordActual(today))).toBe("string");
  });

  it(`should ask to change the password if was changed a year+ ago`, () => {
    const lastYear = isPasswordActual(year - 1, month, date);

    expect(lastYear).toBe("Immediately change the password!");
  });

  it(`should segregate to change pass if was changed  more than 6mths ago`, () => {
    const sixMonthsAgo = isPasswordActual(year, month - 2, date);

    expect(sixMonthsAgo).toBe("You should change your password.");
  });

  it(`should return 'pass is actual' if it was recently modified (< 6 months)`, () => {
    const monthAgo = isPasswordActual(year, month - 1, date);

    expect(isPasswordActual(monthAgo)).toBe("Password is actual.")
  })
});
