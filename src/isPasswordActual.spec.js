'use strict';

describe('isPasswordActual', () => {
  const isPasswordActual = require('./isPasswordActual');
  const date = new Date();
  const t = {
    year: date.getUTCFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
  };

  it('Should be decalred', () => {
    expect(isPasswordActual).toBeDefined();
  });

  it('should ask to change the password if was changed a year ago', () => {
    const lastYear = isPasswordActual(t.year - 1, t.month, t.date);

    expect(lastYear).toBe('Immediately change the password!');
  });

  it('Should return a string', () => {
    const message = isPasswordActual(t.year, t.month, t.date);

    expect(message).toBeInstanceOf(String);
  });

  it(`If 30 days or less have passed since the last 
password change, the function returns the
message "Password is actual."`, () => {
    const message = isPasswordActual(t.year, t.month, t.date - 30);

    expect(message).toBe('Password is actual.');
  });

  it(`If more than 30 days have passed since the 
last password change, the
function returns the message "You should change your password."`, () => {
    const message = isPasswordActual(t.year, t.month, t.date - 31);

    expect(message).toBe('You should change your password.');
  });

  it(`If more than 60 days have passed since the last 
password change, the function
returns the message "Immediately change the password!".`, () => {
    const message = isPasswordActual(t.year, t.month - 2, t.date);

    expect(message).toBe('Immediately change the password!');
  });
});
