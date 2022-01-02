const { iteratee } = require('lodash');
const lib = require('../exercise1');

describe('fizzBuzz', () => {
  it('-should throw an exception if input is not a number', () => {
    expect(() => lib.fizzBuzz('a')).toThrow();
  });

  it('-should run FizzBuzz if input is divisible by 3 and 5', () => {
    const result = lib.fizzBuzz(15);
    expect(result).toBe('FizzBuzz');
  });
  
  it('-should return Fizz if input is only divisible by 3', () => {
    const result = lib.fizzBuzz(3);
    expect(result).toBe('Fizz');
  });
  
  it('-should return Buzz if input is only divisible by 5', () => {
    const result = lib.fizzBuzz(5);
    expect(result).toBe('Buzz');
  });
  
  it('-should return the number if input is not divisible by neither 3 nor 5', () => {
    const result = lib.fizzBuzz(2);
    expect(result).toBe(2);
  });
});
