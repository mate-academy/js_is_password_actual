# QA: Is password actual

Напиши тести для функції `isPasswordActual`, яка:

- приймає три числа: `year` - рік, `month` - місяць, `date` - число, коли востання було оновлено пароль;
- конвертує отримані числа в дату та перевіряє, скільки пройшло днів від цієї дати;
- повертає повідомлення про те, чи варто міняти пароль.

Якщо від дати останньої зміни пароля пройшло 30 днів або менше - функція повертає повідомлення `Password is actual.`.  
Якщо від дати останньої зміни пароля пройшло більше 30 днів - функція повертає повідомлення `You should change your password.`.  
Якщо від дати останньої зміни пароля пройшло більше 60 днів - функція повертає повідомлення `Immediately change the password!`.

Приклади:

```js
isPasswordActual(2020, 6, 9) === `Immediately change the password!`
isPasswordActual(2021, 6, 1) === `Password is actual.`
isPasswordActual(2021, 5, 1) === `You should change your password.`
```

---

- [Guideline](https://github.com/mate-academy/js_task-guideline/blob/master/README.md);
- Read more about [Jest expectations](https://jestjs.io/uk/docs/expect).
