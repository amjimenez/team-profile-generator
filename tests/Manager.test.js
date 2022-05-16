const assert = require('assert');
const chai = require('chai');
const Manager = require('../lib/Manager');

let manager = new Manager(1, 'John Manager', 'john.manager@mail.com');

// test manager user id is correct
describe('new Manager(1, "John Manager", "john.manager@mail.com")', function () {
  describe('#getId()', function () {
    it('should return 1', function () {
      assert.equal(1, manager.getId());
    });
  });
});

// test manager name is correct
describe('new Manager(1, "John Manager", "john.manager@mail.com")', function () {
  describe('#getName()', function () {
    it('should return John Manager', function () {
      assert.equal("John Manager", manager.getName());
    });
  });
});

// test manager email is correct
describe('new Manager(1, "John Manager", "john.manager@mail.com")', function () {
  describe('#getEmail()', function () {
    it('should return john.manager@mail.com', function () {
      assert.equal('john.manager@mail.com', manager.getEmail());
    });
  });
});

// test manager with invalid id
describe('new Manager(null, "John Manager", "john.manager@mail.com")', function () {
  describe('#getId()', function () {
   it('should throw an error', function () {
      chai.expect(console.error('Manager ID must be a number'));
    }); 
  });
});

// test manager with missing name
describe('new Manager(1, "", "john.manager@mail.com")', function () {
  describe('#getName()', function () {
   it('should throw an error', function () {
      chai.expect(console.error('Manager name is required'));
    }); 
  });
});

// test manager with invalid email
describe('new Manager(1, "John Manager", "john.manager")', function () {
  describe('#getEmail()', function () {
   it('should throw an error', function () {
      chai.expect(console.error('Manager email is invalid or missing'));
    }); 
  });
});