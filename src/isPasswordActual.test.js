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
    const result = isPasswordActual();

    expect(typeof result).toBe("string");
  });

  it(
    `should ask to change the password ` + `if password was changed a year ago`,
    () => {
      const result = isPasswordActual(today.year - 1, today.month, today.date);

      expect(result).toBe("Immediately change the password!");
    }
  );

  it(
    `should ask to change the password ` +
      `if password was changed more than 2 months`,
    () => {
      const result = isPasswordActual(today.year, today.month - 3, today.date);

      expect(result).toBe("Immediately change the password!");
    }
  );

  it(
    `should suggest to change the password ` +
      `if password was changed more than 1 month ago and less 2 months`,
    () => {
      const result = isPasswordActual(
        today.year,
        today.month - 1,
        today.date - 1
      );

      expect(result).toBe("You should change your password.");
    }
  );

  it(`should check if password was changed less than 1 month`, () => {
    const result = isPasswordActual(today.year, today.month, today.date - 25);

    expect(result).toBe("Password is actual.");
  });
});
