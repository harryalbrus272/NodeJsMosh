const lib = require('../lib');

// Grouping a bunch of tests
describe('Absolute', () => {
  it('-should return a positive number if the input is positive', () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });
  it('-should return a positive number if the input is positive', () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });
  it('-should return a 0 if the input is 0', () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});
