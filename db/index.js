const inquirer = require("inquirer");
const db = require("./db/connection.js");
const cTable = require("console.table");

// Connect to the database
db.connect((err) => {
    if (err) throw err;
    userOptions();
  });


const userOptions = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "options",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
        ],
      },
    ])
    .then((res) => {
        let choice = res.options;
        switch (choice) {
        case "View all departments":
          viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateEmployeeRole();
          break;
        default:
          exit();
      }
    });
};

// View all departments
const viewDepartments = () => {
    db.query(
      `SELECT department.id, department.name AS department FROM department;`,
      (err, res) => {
        if (err) throw err;
        console.table(res);
  
        userOptions();
      }
    );
  };

// View all roles
const viewRoles = () => {
    db.query(
      `SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;`,
      (err, res) => {
        if (err) throw err;
        console.table(res);
  
        userOptions();
      }
    );
  };  

// View all employees
const viewEmployees = () => {
    db.query(
      `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;`,
      (err, res) => {
        if (err) throw err;
        console.table(res);
  
        userOptions();
      }
    );
  };  