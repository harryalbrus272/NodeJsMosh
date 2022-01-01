const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');

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

describe('getProduct', () => {
  it('-should return the product with the given id', () => {
    const result = lib.getProduct(1);
    // For exact matches
    //expect(result).toEqual({ id: 1, price: 10 });
    // For bigger objects - will pass as long as it contains the two properties
    expect(result).toMatchObject({ id: 1, price: 10 });
    // to have particulat properties
    expect(result).toHaveProperty('id', 1);
  });
});

describe('registerUser', () => {
  it('-should throw if username is falsy', () => {
    // null, undefined, Nan, '', 0,  false are considered to be falsy values
    const args = [null, undefined, NaN, '', 0, false];
    args.forEach((a) => {
      expect(() => {
        lib.registerUser(a);
      }).toThrow();
    });
  });
  // Happy path
  it('-should return a user object if valid username is passed', () => {
    const result = lib.registerUser('Shashwat');
    expect(result).toMatchObject({ username: 'Shashwat' });
    expect(result.id).toBeGreaterThan(0);
  });
});

describe('applyDiscount', () => {
  it('-should apply 10% discount if user has more than 10 points', () => {
    db.getCustomerSync = function (customerId) {
      console.log('Fake reading customer');
      return { id: customerId, points: 20 };
    };
    const order = { customerId: 1, totalPrice: 10 };
    const result = lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});

describe('notifyCustomer', () => {
  it('-should sent an email to the customer', () => {
    /** Explaination of mock functions */
    //const mockFunction = jest.fn();
    //mockFunction.mockReturnValue(1);
    //mockFunction.mockResolvedValue(1);
    //mockFunction.mockRejectedValue(new Error('...'));
    // const result = mockFunction();
    /** Explaination of mock functions ends*/
    db.getCustomerSync = jest.fn().mockReturnValue({email: 'a'});
    // db.getCustomerSync = function () {
    //   return { email: 'a' };
    // };
    mail.send = jest.fn();
    // let mailSent = false;
    // mail.send = function (email, message) {
    //   mailSent = true;
    // };
    lib.notifyCustomer({ customerId: 1 });
    expect(mail.send).toHaveBeenCalled();
  });
});
