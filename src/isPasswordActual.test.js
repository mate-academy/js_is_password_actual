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
    const type = typeof isPasswordActual(today.year, today.month, today.date);

    expect(type).toBe("string");
  });

  it(`should show a message about change password immediately`, () => {
    const result = isPasswordActual(today.year - 1, today.month, today.date);

    expect(result).toBe("Immediately change the password!");
  });

  it(`should recommend change password`, () => {
    const result = isPasswordActual(
      today.year,
      today.month - 1,
      today.date - 10
    );

    expect(result).toBe("You should change your password.");
  });

  it(`should show that password is actual`, () => {
    const result = isPasswordActual(today.year, today.month, today.date - 10);

    expect(result).toBe("Password is actual.");
  });
});
