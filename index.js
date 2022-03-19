"use strict";

const mysql = require("mysql2");
const inquirer = require("inquirer");
const logo = require("asciiart-logo");
// const db = require("./db/prompts");
require("console.table");

start();

// Prompt messages
const promptMessages = {
  showAllEmployees: "Show all employees",
  showEmployeesByDepartment: "Show all employees by department",
  showEmployeesByManager: "Show all employees by manager",
  showAllRoles: "Show all roles",
  newEmployee: "Add an employee",
  removeRole: "Remove a role (Warning this action cannot be undone!",
  removeEmployee: "Remove an employee (Warning this action cannot be undone!)",
  updateEmployeeRole: "Update employee role",
  updateEmployeeManager: "Update employee manager",
  newRole: "Add a new role",
  showDepartments: "Show all departments",
  newDepartment: "Add new department",
  removeDepartment: "Remove department (Warning this action cannot be undone!)",
  quit: "Quit"
};

// Show logo text
function start() {
    const logoText = logo ({ name: "Employee Tracker" }).render();

    console.log(logoText);

    // loadMainPrompts();
}

// Bring in connection from former connection.js folder
const connection = mysql.createConnection({
  host: "localhost",
  // MySQL info
  user: "root",
  password: "BootcampMySQL88!",
  // database
  database: "employees",
});

// connect to the server and database
connection.connect(err => {
  if (err) throw err;
  prompt();
});

function prompt() {
  inquirer
    .prompt({
      name: "choice",
      type: "list",
      message: "Please select from the following options:",
      choices: [
        promptMessages.showAllEmployees,
        promptMessages.showEmployeesByDepartment,
        promptMessages.showEmployeesByManager,
        promptMessages.showAllRoles,
        promptMessages.newEmployee,
        promptMessages.removeEmployee,
        promptMessages.updateEmployeeRole,
        promptMessages.newRole,
        promptMessages.quit
      ]
    })
    .then(answer => {
      console.log("answer", answer);
      // Pull the correct function based on what the user selected
      switch (answer.choice) {
          case promptMessages.showAllEmployees:
              showEmployees();
              break;

          case promptMessages.showEmployeesByDepartment:
              showEmployeesByDepartment();
              break;

          case promptMessages.showEmployeesByManager:
              showEmployeesByManager();
              break;

          case promptMessages.showAllRoles:
              showAllRoles();
              break;
          
              case promptMessages.newEmployee:
              newEmployee();
              break;
              
          case promptMessages.removeEmployee:
              remove("delete");
              break;

          case promptMessages.updateEmployeeRole:
              remove("role");
              break;

          case promptMessages.showDepartments:
              showDepartments();
              break;

          case promptMessages.quit:
              connection.end();
              break;
      }
  });
}

// Show all employees

function showEmployees () {
  const query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
  FROM employee
  LEFT JOIN employee manager on manager.id = employee.manager_id
  INNER JOIN role ON (role.id = employee.role_id)
  INNER JOIN department ON (department.id = role.department_id)
  ORDER BY employee.id;`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.log("\n");
    console.log("SHOW ALL EMPLOYEES");
    console.log("\n");
    console.table(res);
    prompt();
  })
}

// Show all employees that belong to a specific department
function showEmployeesByDepartment() {
  const query = `SELECT department.name AS department, role.title, employee.id, employee.first_name, employee.last_name
  FROM employee
  LEFT JOIN role ON (role.id = employee.role_id)
  LEFT JOIN department ON (department.id = role.department_id)
  ORDER BY department.name;`;
  connection.query(query, (err, res) => {
      if (err) throw err;
      console.log("\n");
      console.log("SHOW EMPLOYEE BY DEPARTMENT");
      console.log("\n");
      console.table(res);
      prompt();
  });
}

// Show all employees that report to a specific manager
function showEmployeesByManager() {
  const query = `SELECT CONCAT(manager.first_name, ' ', manager.last_name) AS manager, department.name AS department, employee.id, employee.first_name, employee.last_name, role.title
  FROM employee
  LEFT JOIN employee manager on manager.id = employee.manager_id
  INNER JOIN role ON (role.id = employee.role_id && employee.manager_id != 'NULL')
  INNER JOIN department ON (department.id = role.department_id)
  ORDER BY manager;`;
  connection.query(query, (err, res) => {
      if (err) throw err;
      console.log("\n");
      console.log("SHOW EMPLOYEE BY MANAGER");
      console.log("\n");
      console.table(res);
      prompt();
  });
}

// Show all roles
function showAllRoles() {
  const query = `SELECT role.title, employee.id, employee.first_name, employee.last_name, department.name AS department
  FROM employee
  LEFT JOIN role ON (role.id = employee.role_id)
  LEFT JOIN department ON (department.id = role.department_id)
  ORDER BY role.title;`;
  connection.query(query, (err, res) => {
      if (err) throw err;
      console.log('\n');
      console.log('VIEW EMPLOYEE BY ROLE');
      console.log('\n');
      console.table(res);
      prompt();
  });
}

 // Add an employee
 async function newEmployee() {
  const addname = await inquirer.prompt(askName());
  connection.query("SELECT role.id, role.title FROM role ORDER BY role.id;", async (err, res) => {
      if (err) throw err;
      const { role } = await inquirer.prompt([
          {
              name: 'role',
              type: 'list',
              choices: () => res.map(res => res.title),
              message: "Please enter the employee's role: "
          }
      ]);
      let roleId;
      for (const row of res) {
          if (row.title === role) {
              roleId = row.id;
              continue;
          }
      }
      connection.query("SELECT * FROM employee", async (err, res) => {
          if (err) throw err;
          let choices = res.map(res => `${res.first_name} ${res.last_name}`);
          choices.push("none");
          let { manager } = await inquirer.prompt([
              {
                  name: "manager",
                  type: "list",
                  choices: choices,
                  message: "Please select the employee's manager: "
              }
          ]);
          let managerId;
          let managerName;
          if (manager === "none") {
              managerId = null;
          } else {
              for (const data of res) {
                  data.fullName = `${data.first_name} ${data.last_name}`;
                  if (data.fullName === manager) {
                      managerId = data.id;
                      managerName = data.fullName;
                      console.log(managerId);
                      console.log(managerName);
                      continue;
                  }
              }
          }
          console.log("New employee has been entered, please view all employees to verify...");
          connection.query(
              "INSERT INTO employee SET ?",
              {
                  first_name: addname.first,
                  last_name: addname.last,
                  role_id: roleId,
                  manager_id: parseInt(managerId)
              },
              (err, res) => {
                  if (err) throw err;
                  prompt();

              }
          );
      });
  });

// Remove a role
function remove(input) {
  const promptQuery = {
    yes: "yes",
    no: "no I don't (view all employees on the main option)"
};
inquirer.prompt([
    {
        name: "action",
        type: "list",
        message: "In order to proceed an employee ID must be entered. View all employees to get" +
            "the employee ID. Do you know the employee ID?",
        choices: [promptQuery.yes, promptQuery.no]
    }
]).then(answer => {
    if (input === "delete" && answer.action === "yes") removeEmployee();
    else if (input === "role" && answer.action === "yes") updateEmployeeRole();
    else showAllEmployees();
});
}
  
// Remove an employee
async function removeEmployee() {

  const answer = await inquirer.prompt([
      {
          name: "first",
          type: "input",
          message: "Enter the ID of the employee you want to remove:  "
      }
  ]);

  connection.query('DELETE FROM employee WHERE ?',
      {
          id: answer.first
      },
      function (err) {
          if (err) throw err;
      }
  )
  console.log("Employee has been removed from the system!");
  prompt();

};

function askId() {
  return ([
      {
          name: "name",
          type: "input",
          message: "What is the employe ID?:  "
      }
  ]);
}

// Change an employee's role
async function updateEmployeeRole() {
  const employeeId = await inquirer.prompt(askId());

  connection.query('SELECT role.id, role.title FROM role ORDER BY role.id;', async (err, res) => {
      if (err) throw err;
      const { role } = await inquirer.prompt([
          {
              name: "role",
              type: "list",
              choices: () => res.map(res => res.title),
              message: "What is the new role of this employee?: "
          }
      ]);
      let roleId;
      for (const row of res) {
          if (row.title === role) {
              roleId = row.id;
              continue;
          }
      }
      connection.query(`UPDATE employee 
      SET role_id = ${roleId}
      WHERE employee.id = ${employeeId.name}`, async (err, res) => {
          if (err) throw err;
          console.log("The selected employee's role has been updated..")
          prompt();
      });
  });
}

function askName() {
  return ([
      {
          name: "first",
          type: "input",
          message: "Enter the employee's first name: "
      },
      {
          name: "last",
          type: "input",
          message: "Enter the employee's last name: "
      }
  ]);
}
}