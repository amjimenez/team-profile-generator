// Include required libraries
const inquirer = require('inquirer');
const fs = require('fs');

const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const AppHtml = require("./src/templates/app");
const EmployeeHtml = require("./src/templates/employee");

// Employee questions common to all roles
const employeeQuestions = [
    {
        type: 'input',
        name: 'name',
        message: "Enter {{ employee }}'s name:",
        default: '',
    },
    {
        type: 'input',
        name: 'id',
        message: "Enter {{ employee }}'s employee ID:",
        default: '',
    },
    {
        type: 'input',
        name: 'email',
        message: "Enter {{ employee }}'s email address:",
        default: '',
    }
];

let employees = [];

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
        });
    }

    if (role == 'Engineer') {
        questions.push({
            type: 'input',
            name: 'github',
            message: "Enter Engineer's GitHub username:",
            default: '',
        })
    }

    if (role == 'Intern') {
        questions.push({
            type: 'input',
            name: 'school',
            message: "Enter Intern's school:",
            default: '',
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