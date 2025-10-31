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
    const result = isPasswordActual(2020, 6, 9);
    expect(typeof result === "string").toBeTruthy();
  });

  it(`date > actual date`, () => {
    const result = isPasswordActual(3020, 6, 9);
    expect(result).toBe("Password is actual.");
  });

  it(`date is decimal`, () => {
    const result = isPasswordActual(2020.4, 6.5, 9.6);
    expect(result).toBe("Immediately change the password!");
  });

  it(`date is negative`, () => {
    const result = isPasswordActual(-4, -5, -9);
    expect(result).toBe("Immediately change the password!");
  });

  it(`month > 12 and date > 31`, () => {
    const result = isPasswordActual(2020, 65, 96);
    expect(result).toBe("Immediately change the password!");
  });

  it(`date < actual date for month and week`, () => {
    const result = isPasswordActual(
      today.year,
      today.month - 1,
      today.date - 7
    );

    Object.values(today).forEach((value) => {
      expect(Number.isInteger(value)).toBe(true);
    });

    expect(result).toBe("You should change your password.");
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear).toBe("Immediately change the password!");
  });
});
