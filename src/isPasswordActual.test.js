'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');
  const date = new Date(Date.now());
  const today = {
    year: date.getUTCFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
  };

  function getPastData(dayAgo) {
    const dayInMilisecond = 86400000;
    const howManyToSubtract = dayAgo * dayInMilisecond;
    const searchedDate = new Date(Date.now() - howManyToSubtract);

    return {
      searchedYear: searchedDate.getUTCFullYear(),
      searchedMonth: searchedDate.getMonth() + 1,
      searchedDay: searchedDate.getDate(),
    };
  }

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    const value = isPasswordActual(2005, 5, 3);
    const valueType = typeof value;

    expect(valueType)
      .toBe('string');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear)
      .toBe('Immediately change the password!');
  });

  it(`should confirm that the "password" is actual if `
    + `30 days >= the last "password" change`, () => {
    const dataArguments = [getPastData(30), getPastData(29)];
    const [testDate1, testDate2] = dataArguments;
    const value = [
      isPasswordActual(testDate1.searchedYear,
        testDate1.searchedMonth, testDate1.searchedDay),
      isPasswordActual(testDate2.searchedYear,
        testDate2.searchedMonth, testDate2.searchedDay),
    ];

    value.forEach((fullDate, i) => {
      expect(fullDate)
        .toBe('Password is actual.');
    });
  });

  it(`should advise to change the "password" if `
    + `60 days >= the last "password" change < 30`, () => {
    const dataArguments = [getPastData(31), getPastData(60), getPastData(59)];
    const [testDate1, testDate2, testDate3] = dataArguments;
    const value = [
      isPasswordActual(testDate1.searchedYear,
        testDate1.searchedMonth, testDate1.searchedDay),
      isPasswordActual(testDate2.searchedYear,
        testDate2.searchedMonth, testDate2.searchedDay),
      isPasswordActual(testDate3.searchedYear,
        testDate3.searchedMonth, testDate3.searchedDay
      ),
    ];

    value.forEach((fullDate, i) => {
      expect(fullDate)
        .toBe('You should change your password.');
    });
  });

  it(`should ask to change the "password" if `
    + `the last "password" change was 61+ day ago`, () => {
    const dataArguments = [getPastData(61)];
    const [testDate1] = dataArguments;
    const value = [
      isPasswordActual(testDate1.searchedYear,
        testDate1.searchedMonth, testDate1.searchedDay),
    ];

    value.forEach((fullDate, i) => {
      expect(fullDate)
        .toBe('Immediately change the password!');
    });
  });

  it(`should advise to change the "password" if `
    + `60 days >= the last "password" change < 30`, () => {
    const dataArguments = [getPastData(31), getPastData(60), getPastData(59)];
    const [testDate1, testDate2, testDate3] = dataArguments;
    const value = [
      isPasswordActual(testDate1.searchedYear,
        testDate1.searchedMonth, testDate1.searchedDay),
      isPasswordActual(testDate2.searchedYear,
        testDate2.searchedMonth, testDate2.searchedDay),
      isPasswordActual(testDate3.searchedYear,
        testDate3.searchedMonth, testDate3.searchedDay
      ),
    ];

    value.forEach((fullDate, i) => {
      expect(fullDate)
        .toBe('You should change your password.');
    });
  });

  it(`should inform about incorect data if `
      + `'date' argument > 31 or 'month' argument > 12`, () => {
    const value = [
      isPasswordActual(2000, 13, 20),
      isPasswordActual(2000, 10, 32),
    ];

    value.forEach((fullDate, i) => {
      expect(fullDate)
        .toBe('The data of last password change is incorrect!');
    });
  });

  it(`should inform about incorect data if `
      + `'year' argument ∉ leap year`
      + `&& 'date' argument = February 29`, () => {
    const value = [
      isPasswordActual(2017, 2, 29),
      isPasswordActual(2022, 2, 29),
      isPasswordActual(2015, 2, 29),
    ];

    value.forEach((fullDate, i) => {
      expect(fullDate)
        .toBe('The data of last password change is incorrect!');
    });
  });

  it(`should inform about incorect data if `
      + `'date' argument > the last day of 'month' argument`, () => {
    const expectedParameters = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    expectedParameters.forEach((parameter, i) => {
      const isDifferent = parameter !== 31;

      if (isDifferent) {
        expect(isPasswordActual(2001, i + 1, 31))
          .toBe('The data of last password change is incorrect!');
      } else {
        expect(isPasswordActual(2001, i + 1, 31))
          .not.toBe('The data of last password change is incorrect!');
      }
    });
  });

  it(`should inform about incorect data if `
      + `user input future data`, () => {
    const value = [
      isPasswordActual(today.year + 1, today.month, today.date),
      isPasswordActual(today.year, today.month + 1, today.date),
      isPasswordActual(today.year, today.month, today.date + 1),
    ];

    value.forEach((fullDate, i) => {
      expect(fullDate)
        .toBe('The data of last password change is incorrect!');
    });
  });

  it(`should inform about incorect data if `
      + `function doesn't recive all arguments`, () => {
    const value = [
      isPasswordActual(),
      isPasswordActual(today.year, today.month),
    ];

    value.forEach((fullDate, i) => {
      expect(fullDate)
        .toBe('The data of last password change is incorrect!');
    });
  });
});
