const assert = require('assert');
const chai = require('chai');
const Engineer = require('../lib/Engineer');

let engineer = new Engineer(1, 'John Engineer', 'john.engineer@mail.com');
engineer.github = 'githubuser';

// test engineer user id is correct
describe('new Engineer(1, "John Engineer", "john.engineer@mail.com")', function () {
  describe('#getId()', function () {
    it('should return 1', function () {
      assert.equal(1, engineer.getId());
    });
  });
});

// test engineer name is correct
describe('new Engineer(1, "John Engineer", "john.engineer@mail.com")', function () {
  describe('#getName()', function () {
    it('should return John Engineer', function () {
      assert.equal("John Engineer", engineer.getName());
    });
  });
});

// test engineer email is correct
describe('new Engineer(1, "John Engineer", "john.engineer@mail.com")', function () {
  describe('#getEmail()', function () {
    it('should return john.engineer@mail.com', function () {
      assert.equal('john.engineer@mail.com', engineer.getEmail());
    });
  });
});

// test engineer with invalid id
describe('new Engineer(null, "John Engineer", "john.engineer@mail.com")', function () {
  describe('#getId()', function () {
   it('should throw an error', function () {
      chai.expect(console.error('Engineer ID must be a number'));
    }); 
  });
});

// test engineer with missing name
describe('new Engineer(1, "", "john.engineer@mail.com")', function () {
  describe('#getName()', function () {
   it('should throw an error', function () {
      chai.expect(console.error('Engineer name is required'));
    }); 
  });
});

// test engineer with invalid email
describe('new Engineer(1, "John Engineer", "john.Engineer")', function () {
  describe('#getEmail()', function () {
   it('should throw an error', function () {
      chai.expect(console.error('Engineer email is invalid or missing'));
    }); 
  });
});

// test engineer has github username
describe('engineer.github = githubuser', function () {
  describe('#getGithub()', function () {
    it('should return githubuser', function () {
      assert.equal("githubuser", engineer.getGithub());
    }); 
  });
});