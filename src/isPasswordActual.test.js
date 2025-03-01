describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require("./isPasswordActual");

  function getDateComponents(daysAgo) {
    const date = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);

    return {
      year: date.getUTCFullYear(),
      month: date.getUTCMonth() + 1,
      date: date.getUTCDate(),
    };
  }

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    const { year, month, date } = getDateComponents(0);

    expect(typeof isPasswordActual(year, month, date)).toBe("string");
  });

  it(`should ask to change the password if was changed >60 days ago`, () => {
    const { year, month, date } = getDateComponents(61);

    expect(isPasswordActual(year, month, date)).toBe(
      "Immediately change the password!"
    );
  });

  it(`should suggest to change password if changed 30-60 days ago`, () => {
    const { year, month, date } = getDateComponents(45);

    expect(isPasswordActual(year, month, date)).toBe(
      "You should change your password."
    );
  });

  it(`should return 'password is actual' if changed <30 days ago`, () => {
    const { year, month, date } = getDateComponents(29);

    expect(isPasswordActual(year, month, date)).toBe("Password is actual.");
  });
});
