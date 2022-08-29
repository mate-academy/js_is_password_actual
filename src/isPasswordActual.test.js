'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    expect(isPasswordActual()).toEqual(expect.any(String));
  });

  it(`should ask to change the password immediately if was changed a year ago`, () => {
    expect(isPasswordActual(2020, 6, 9))
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password immediately if was changed 61 day ago`, () => {
    expect(isPasswordActual(2022, 2, 28))
      .toBe('Immediately change the password!');
  });
  
  it(`should ask to change the password if was changed 59 day ago`, () => {
    expect(isPasswordActual(2022, 6, 30))
      .toBe('You should change your password.');
  });

  it(`should ask to change the password if was changed 31 day ago`, () => {
    expect(isPasswordActual(2022, 7, 28))
      .toBe('You should change your password.');
  });

  it(`should return password is actual if it was changed 29 day ago`, () => {
    expect(isPasswordActual(2022, 8, 1))
      .toBe('Password is actual.');
  });
  
  it(`should return password is actual if it was changed 1 day ago`, () => {
    expect(isPasswordActual(2022, 8, 28))
      .toBe('Password is actual.');
  });
   
  it(`should return password is actual if it was changed 0 day ago`, () => {
    expect(isPasswordActual(2022, 8, 29))
      .toBe('Password is actual.');
  });

  it(`should not throw an error if user entered numbers in string format`, () => {
    expect(isPasswordActual('2023', '8', '28'))
      .toBe('Password is actual.');
  });

  it(`should not throw an error if user entered boolean format`, () => {
    expect(isPasswordActual('2023', true, true))
      .toBe('Password is actual.');
  });

  it(`should not throw an error if user entered float number`, () => {
    expect(isPasswordActual(2023, 8, 20.5))
      .toBe('Password is actual.');
  });
 
  it(`should return password is actual if it the date is set up in the future`, () => {
    expect(isPasswordActual(2023, 8, 29))
      .toBe('Password is actual.');
  });

  // Negative scenario:
  it(`should throw an error if user entered wrong date format`, () => {
    expect(() => isPasswordActual(28, 8, 2023))
      .not.toThrow();
  });

  it(`should handle data with BCE in it properly`, () => {
    expect(isPasswordActual('20BCE', 8, 28))
      .not.toBe('Immediately change the password!');
  });
  
  it(`should handle data with BCE in it properly`, () => {
    expect(isPasswordActual('2040CE', 8, 28))
      .not.toBe('Password is actual.');
  });
});
