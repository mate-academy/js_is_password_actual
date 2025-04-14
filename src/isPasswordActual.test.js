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
    const secondDays = isPasswordActual(today.year, today.month, today.date);

    expect(secondDays).toBe("Password is actual.");
  });

  it(`should ask to save the password if was changed a two days`, () => {
    const secondDays = isPasswordActual(
      today.year,
      today.month,
      today.date - 2
    );

    expect(secondDays).toBe("Password is actual.");
  });

  it(`should ask to change the password if it was changed a month ago`, () => {
    const thirtyDays = isPasswordActual(
      today.year,
      today.month,
      today.date - 32
    );

    expect(thirtyDays).toBe("You should change your password.");
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear).toBe("Immediately change the password!");
  });
});
