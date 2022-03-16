const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
require("console.table");

start();

// Show logo text and load the main prompts

function start() {
    const logoText = logo ({ name: "Employee Manager" }).render();

    console.log(logoText);

    loadMainPrompts();
}

function loadMainPrompts() {
    prompt([
        {
            type: "list",
            name: "choice",
            message: "Please make a selection",
            choices: [
                {
                    name: "Show all Employees",
                    value: "SHOW_EMPLOYEES"
                },
                {
                    name: "Show all employees by department",
                    value: "SHOW_EMPLOYEES_BY_DEPARTMENT"
                  },
                  {
                    name: "Show all employees by manager",
                    value: "SHOW_EMPLOYEES_BY_MANAGER"
                  },
                  {
                    name: "Add New Employee",
                    value: "ADD_EMPLOYEE"
                  },
                  {
                    name: "Delete Employee",
                    value: "DELETE_EMPLOYEE"
                  },
                  {
                    name: "Update Employee Role",
                    value: "UPDATE_EMPLOYEE_ROLE"
                  },
                  {
                    name: "Update Employee Manager",
                    value: "UPDATE_EMPLOYEE_MANAGER"
                  },
                  {
                    name: "Show All Roles",
                    value: "SHOW_ROLES"
                  },
                  {
                    name: "Add New Role",
                    value: "ADD_ROLE"
                  },
                  {
                    name: "Delete Role",
                    value: "DELETE_ROLE"
                  },
                  {
                    name: "Show All Departments",
                    value: "SHOW_DEPARTMENTS"
                  },
                  {
                    name: "Add New Department",
                    value: "ADD_DEPARTMENT"
                  },
                  {
                    name: "Delete Department",
                    value: "DELETE_DEPARTMENT"
                  },
                  {
                    name: "Show Total Utilized Budget By Department",
                    value: "SHOW_UTILIZED_BUDGET_BY_DEPARTMENT"
                  },
                  {
                    name: "Quit",
                    value: "QUIT"
                  }
            ]
        }
    ]).then(res => {
        let choice = res.choice;
        // Pull the correct function based on what the user selected
        switch (choice) {
            case "SHOW_EMPLOYEES":
                showEmployees();
                break;
              case "SHOW_EMPLOYEES_BY_DEPARTMENT":
                showEmployeesByDepartment();
                break;
              case "SHOW_EMPLOYEES_BY_MANAGER":
                showEmployeesByManager();
                break;
              case "ADD_EMPLOYEE":
                newEmployee();
                break;
              case "DELETE_EMPLOYEE":
                deleteEmployee();
                break;
              case "UPDATE_EMPLOYEE_ROLE":
                updateEmployeeRole();
                break;
              case "UPDATE_EMPLOYEE_MANAGER":
                updateEmployeeManager();
                break;
              case "SHOW_DEPARTMENTS":
                showDepartments();
                break;
              case "ADD_DEPARTMENT":
                newDepartment();
                break;
              case "DELETE_DEPARTMENT":
                deleteDepartment();
                break;
              case "SHOW_UTILIZED_BUDGET_BY_DEPARTMENT":
                showUtilizedBudgetByDepartment();
                break;
              case "SHOW_ROLES":
                showRoles();
                break;
              case "ADD_ROLE":
                newRole();
                break;
              case "DELETE_ROLE":
                deleteRole();
                break;
              default:
                quit();
        }
    }
    )
}

// Show all employees