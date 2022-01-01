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

describe('Greet', () => {
  it('-should return the greeting message', () => {
    const result = lib.greet('Shashwat');
    //Make sure that the test are not too specific
    expect(result).toMatch(/Shashwat/);
  });
});

describe('getCurrencies', () => {
  it('-should return supported currencies', () => {
    const result = lib.getCurrencies();
    
    //Too general - number will also pass
    expect(result).toBeDefined();
    expect(result).not.toBeNull();

    //Proper Way 
    expect(result).toContain('USD');
    expect(result).toContain('AUD');
    expect(result).toContain('EUR');

    //Too specific
    expect(result[0]).toBe('USD');
    expect(result[1]).toBe('AUD');
    expect(result[2]).toBe('EUR');
    expect(result.length).toBe(3);


    //Ideal Way
    expect(result).toEqual(expect.arrayContaining(['USD', 'EUR', 'AUD']));
  });
});