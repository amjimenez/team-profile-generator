class Employee {
    constructor(id, name, email) {

        // validate id
        if (Number.isNaN(id)) {
            console.error('Employee ID must be a number');
        }

        // validate name
        if (name.trim() == '' || name == null) {
            console.error('Employee name is required');
        }

        // validate email
        const regex = new RegExp(/^.+\@.+$/);
        if (!regex.test(email)) {
            console.error('Employee email is invalid or missing');
        }

        this.id = id;
        this.name = name;
        this.email = email;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getEmail() {
        return this.email;
    }

    getRole() {
        return 'Employee';
    }
}

module.exports = Employee;