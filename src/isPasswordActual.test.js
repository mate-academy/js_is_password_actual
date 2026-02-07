/* eslint-disable quotes */
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
    expect(typeof isPasswordActual()).toBe("string");
  });

  it(`changed > 60 days`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear).toBe("Immediately change the password!");
  });

  it(`30 days < changed < 60 days`, () => {
    const result = isPasswordActual(today.year, today.month - 1, today.date);

    expect(result).toBe("You should change your password.");
  });

  it(`changed < 30 days`, () => {
    const result = isPasswordActual(today.year, today.month, today.date - 25);

    expect(result).toBe("Password is actual.");
  });
});
