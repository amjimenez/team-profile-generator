const Employee = require("./Employee");

class Manager extends Employee {
    
    officeNumber = '';

    getOfficeNumber() {
        return this.officeNumber;
    }

    getRole() {
        return 'Manager';
    }
}

module.exports = Manager;