const lib = require('../lib');
test('Absolute -should return a positive number if the input is positive', () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
})
test('Absolute -should return a positive number if the input is positive', () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
})
test('Absolute -should return a 0 if the input is 0', () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
})