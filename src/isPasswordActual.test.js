/* eslint-disable quotes */
"use strict";

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require("./isPasswordActual");

  beforeAll(() => {
    jest.useFakeTimers("modern");
    jest.setSystemTime(new Date("2021-06-10"));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    expect(typeof isPasswordActual(2021, 6, 1)).toBe("string");
  });

  it(`changed > 60 days`, () => {
    expect(isPasswordActual(2020, 6, 9)).toBe(
      "Immediately change the password!",
    );
  });

  it(`30 days < changed < 60 days`, () => {
    expect(isPasswordActual(2021, 5, 1)).toBe(
      "You should change your password.",
    );
  });

  it(`changed < 30 days`, () => {
    expect(isPasswordActual(2021, 6, 1)).toBe("Password is actual.");
  });
});
