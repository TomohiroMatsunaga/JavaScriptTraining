export const fizzbuzz = () => { let result = ''; for (let i = 1; i <= 100; i++) result += `${i % 3 ? '' : 'Fizz'}${i % 5 ? '' : 'Buzz'}${i % 3 && i % 5 ? i : ''}\n`; return result; };
