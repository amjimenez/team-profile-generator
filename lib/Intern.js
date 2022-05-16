const Employee = require("./Employee");

class Intern extends Employee {

    school = '';

    getSchool() {
        return this.school;
    }

    getRole() {
        return 'Intern';
    }
}

module.exports = Intern;