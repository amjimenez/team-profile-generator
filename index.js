// Include required libraries
const inquirer = require('inquirer');
const fs = require('fs');

const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const AppHtml = require("./src/templates/app");
const EmployeeHtml = require("./src/templates/employee");

let employees = [];
let employeeIds = [];
let employeeEmails = [];
let githubUsernames = [];

// Employee questions common to all roles
const employeeQuestions = [
    {
        type: 'input',
        name: 'name',
        message: "Enter {{ employee }}'s name:",
        default: '',
        validate: function(input) {
            if (input == null || input.trim() == '') {
                return 'Employee name is required';
            }

            return true;
        }
    },
    {
        type: 'input',
        name: 'id',
        message: "Enter {{ employee }}'s employee ID:",
        default: '',
        validate: function(input) {
            let num = Number.parseInt(input);

            if (employeeIds.includes(num)) {
                return 'Employee ID is already in use';
            }

            if (Number.isNaN(num)) {
                return 'Employee ID must be a number';
            }

            employeeIds.push(num);

            return true;
        }
    },
    {
        type: 'input',
        name: 'email',
        message: "Enter {{ employee }}'s email address:",
        default: '',
        validate: function(input) {
            let email = input.toLowerCase();

            if (employeeEmails.includes(email)) {
                return 'Employee email is already in use';
            }

            const regex = new RegExp(/^.+\@.+$/);
            if (!regex.test(input)) {
                return 'Employee email is invalid or missing';
            }

            employeeEmails.push(email);

            return true;
        }
    }
];

function generateHtml() {
    let html = AppHtml;
    let content = '';
    let other = '';

    employees.forEach(function(employee) {
        content += EmployeeHtml(employee);
    });

    html = html.replace('{{ content }}', content);
    writeToFile('./dist/index.html', html);
}

function writeToFile(fileName, content) {
    fs.writeFile(fileName, content, err => {
      if (err) {
        console.error(err);
      }
      // file written successfully
    });
  }

// Add employee
function addEmployee(role) {
    let questions = [];

    employeeQuestions.forEach(function(question) {
        let newQuestion = Object.assign({}, question);
        newQuestion.message = newQuestion.message.replace('{{ employee }}', role);
        questions.push(newQuestion);
    });

    if (role == 'Manager') {
        questions.push({
            type: 'input',
            name: 'officeNumber',
            message: "Enter Manager's office number:",
            default: '',
            validate: function(input) {
                if (input == null || input.trim() == '') {
                    return 'Manager office number is required';
                }
    
                return true;
            }
        });
    }

    if (role == 'Engineer') {
        questions.push({
            type: 'input',
            name: 'github',
            message: "Enter Engineer's GitHub username:",
            default: '',
            validate: function(input) {
                let username = input.toLowerCase();

                if (githubUsernames.includes(username)) {
                    return 'Employee GitHub username is already in use';
                }

                if (username.trim() == '' || username == null) {
                    return 'Engineer GitHuber usenname is required';
                }

                githubUsernames.push(username);
    
                return true;
            }
        })
    }

    if (role == 'Intern') {
        questions.push({
            type: 'input',
            name: 'school',
            message: "Enter Intern's school:",
            default: '',
            validate: function(input) {
                if (input == null || input.trim() == '') {
                    return 'Intern school is required';
                }
    
                return true;
            }
        })
    }

    questions.push({
        type: 'list',
        name: 'addEmployee',
        message: "Add employee or finish building team:",
        choices: [
            'Engineer',
            'Intern',
            'Finish',
        ],
    });

    inquirer
    .prompt(questions) // prompt for employee information
    .then((answers) => {
        let employee;

        if (role == 'Manager') {
            employee = new Manager(answers.id, answers.name, answers.email);
            employee.officeNumber = answers.officeNumber;
        }

        if (role == 'Engineer') {
            employee = new Engineer(answers.id, answers.name, answers.email);
            employee.github = answers.github;
        }

        if (role == 'Intern') {
            employee = new Intern(answers.id, answers.name, answers.email);
            employee.school = answers.school;
        }

        employees.push(employee);

        // Check to see if we are adding a new employee
        if (answers.addEmployee != 'Finish') {
            // Recursively add employee until "Finish" is selected
            addEmployee(answers.addEmployee);
            return;
        }  

        generateHtml();
    })
    .catch((error) => {
      console.log(error)
    });
}

// Initialize app
function init() {
    addEmployee('Manager');
}

init();