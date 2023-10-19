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
    const result = isPasswordActual(today.year, today.month, today.date);
    expect(typeof result).toBe("string");
  });

  it(`should ask to change the password if it was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);
    expect(lastYear).toBe("Immediately change the password!");
  });

  it(`should ask to change the password if it was changed 31 days ago`, () => {
    const lastMonth = isPasswordActual(
      today.year,
      today.month,
      today.date - 31
    );
    expect(lastMonth).toBe("You should change your password.");
  });

  it(`should not ask to change the password if it was changed 30 days ago`, () => {
    const lastMonth = isPasswordActual(
      today.year,
      today.month,
      today.date - 30
    );
    expect(lastMonth).toBe("Password is actual.");
  });

  it(`should not ask to change the password if it was changed today`, () => {
    const today = isPasswordActual(today.year, today.month, today.date);
    expect(today).toBe("Password is actual.");
  });
});
