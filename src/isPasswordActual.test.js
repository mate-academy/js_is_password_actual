"use strict";

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require("./isPasswordActual");
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
    const { date, month, year } = today;
    const result = isPasswordActual(year, month, date);

    expect(typeof result).toBe("string"); // Костиль but who knows
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear).toBe("Immediately change the password!");
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    const lastMonth = isPasswordActual(today.year, today.month - 1, today.date);

    expect(lastMonth).toBe("You should change your password.");
  });

  it(`should not ask to change the password`, () => {
    const upToDate = isPasswordActual(today.year, today.month, today.date);

    expect(upToDate).toBe("Password is actual.");
  });

  it(`Should return 'password is actual if there is no data as a params'`, () => {
    expect(isPasswordActual()).toBe("Password is actual.");
  });
});
