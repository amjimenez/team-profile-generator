const assert = require('assert');
const chai = require('chai');
const Intern = require('../lib/Intern');

let intern = new Intern(1, 'John Intern', 'john.intern@mail.com');
intern.school = 'USC';

// test intern user id is correct
describe('new Intern(1, "John Intern", "john.intern@mail.com")', function () {
  describe('#getId()', function () {
    it('should return 1', function () {
      assert.equal(1, intern.getId());
    });
  });
});

// test intern name is correct
describe('new Intern(1, "John Intern", "john.intern@mail.com")', function () {
  describe('#getName()', function () {
    it('should return John Intern', function () {
      assert.equal("John Intern", intern.getName());
    });
  });
});

// test intern email is correct
describe('new Intern(1, "John Intern", "john.intern@mail.com")', function () {
  describe('#getEmail()', function () {
    it('should return john.intern@mail.com', function () {
      assert.equal('john.intern@mail.com', intern.getEmail());
    });
  });
});

// test intern with invalid id
describe('new Intern(null, "John Intern", "john.intern@mail.com")', function () {
  describe('#getId()', function () {
   it('should throw an error', function () {
      chai.expect(console.error('intern ID must be a number'));
    }); 
  });
});

// test intern with missing name
describe('new Intern(1, "", "john.intern@mail.com")', function () {
  describe('#getName()', function () {
   it('should throw an error', function () {
      chai.expect(console.error('intern name is required'));
    }); 
  });
});

// test intern with invalid email
describe('new Intern(1, "John Intern", "john.Intern")', function () {
  describe('#getEmail()', function () {
   it('should throw an error', function () {
      chai.expect(console.error('intern email is invalid or missing'));
    }); 
  });
});

// test intern has school
describe('intern.school = USC', function () {
  describe('#getSchool()', function () {
    it('should return USC', function () {
      assert.equal("USC", intern.getSchool());
    }); 
  });
});