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

function showEmployees () {
    db.showAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            console.log("\n");
            console.table(employees);
        })
        .then(() => loadMainPrompts());
}

// Show all employees that belong to a specific department
function showEmployeesByDepartment() {
    db.showAllDepartments()
    .then(([rows]) => {
        let departments = rows;
        const departmentOptions = departments.map(({ id, name }) => ({
          name: name,
          value: id
        }));

        prompt([
            {
                type: "list",
                name: "departmentId",
                message: "Please select a department to see it's employees",
                choices: departmentOptions
              }
        ])
        .then(res => db.showEmployeesByDepartment(res.departmentId))
        .then(([rows]) => {
          let employees = rows;
          console.log("\n");
          console.table(employees);
        })
        .then(() => loadMainPrompts())
    });
}

// Show all employees that report to a specific manager
function showEmployeesByManager() {
    db.showAllEmployees()
      .then(([rows]) => {
        let managers = rows;
        const managerOptions = managers.map(({ id, first_name, last_name }) => ({
          name: `${first_name} ${last_name}`,
          value: id
        }));
  
        prompt([
          {
            type: "list",
            name: "managerId",
            message: "Please select an employee to view thier manager",
            choices: managerOptions
          }
        ])
          .then(res => db.showEmployeesByManager(res.managerId))
          .then(([rows]) => {
            let employees = rows;
            console.log("\n");
            if (employees.length === 0) {
              console.log("The selected employee has no assigned manager");
            } else {
              console.table(employees);
            }
          })
          .then(() => loadMainPrompts())
      });
  }
  
// Delete an employee
function deleteEmployee() {
    db.showAllEmployees()
      .then(([rows]) => {
        let employees = rows;
        const employeeOptions = employees.map(({ id, first_name, last_name }) => ({
          name: `${first_name} ${last_name}`,
          value: id
        }));
  
        prompt([
          {
            type: "list",
            name: "employeeId",
            message: "Please select the employee you would like to delete.  CAUTION: This action cannot be undone",
            choices: employeeOptions
          }
        ])
          .then(res => db.deleteEmployee(res.employeeId))
          .then(() => console.log("This employee has been deleted from the database"))
          .then(() => loadMainPrompts())
      })
  }

// Change an employee's role
function updateEmployeeRole() {
    db.showAllEmployees()
      .then(([rows]) => {
        let employees = rows;
        const employeeOptions = employees.map(({ id, first_name, last_name }) => ({
          name: `${first_name} ${last_name}`,
          value: id
        }));
  
        prompt([
          {
            type: "list",
            name: "employeeId",
            message: "Please select the employee who's role you would like to change",
            choices: employeeOptions
          }
        ])
          .then(res => {
            let employeeId = res.employeeId;
            db.showAllRoles()
              .then(([rows]) => {
                let roles = rows;
                const roleOptions = roles.map(({ id, title }) => ({
                  name: title,
                  value: id
                }));
  
                prompt([
                  {
                    type: "list",
                    name: "roleId",
                    message: "Please select the new role for this employee",
                    choices: roleOptions
                  }
                ])
                  .then(res => db.changeEmployeeRole(employeeId, res.roleId))
                  .then(() => console.log("The selected Employee's role has been changed"))
                  .then(() => loadMainPrompts())
              });
          });
      })
  }

// Change employee's Manager
function updateEmployeeManager() {
    db.showAllEmployees()
      .then(([rows]) => {
        let employees = rows;
        const employeeOptions = employees.map(({ id, first_name, last_name }) => ({
          name: `${first_name} ${last_name}`,
          value: id
        }));
  
        prompt([
          {
            type: "list",
            name: "employeeId",
            message: "Please select the employee who's manager you would like to change",
            choices: employeeOptions
          }
        ])
          .then(res => {
            let employeeId = res.employeeId
            db.showAllManagers(employeeId)
              .then(([rows]) => {
                let managers = rows;
                const managerOptions = managers.map(({ id, first_name, last_name }) => ({
                  name: `${first_name} ${last_name}`,
                  value: id
                }));
  
                prompt([
                  {
                    type: "list",
                    name: "managerId",
                    message:
                      "Please choose a new manager for the selected employee",
                    choices: managerOptions
                  }
                ])
                  .then(res => db.updateManagerofEmployee(employeeId, res.managerId))
                  .then(() => console.log("Employee's Manager has been updated"))
                  .then(() => loadMainPrompts())
              })
          })
      })
  }

// Show all roles
function showRoles() {
    db.showAllRoles()
      .then(([rows]) => {
        let roles = rows;
        console.log("\n");
        console.table(roles);
      })
      .then(() => loadMainPrompts());
  }

// Add a role
function newRole() {
    db.showAllDepartments()
      .then(([rows]) => {
        let departments = rows;
        const departmentOptions = departments.map(({ id, name }) => ({
          name: name,
          value: id
        }));
  
        prompt([
          {
            name: "title",
            message: "What is the role title?"
          },
          {
            name: "salary",
            message: "What is the salary of the role?"
          },
          {
            type: "list",
            name: "department_id",
            message: "Which department does the role belong to?",
            choices: departmentOptions
          }
        ])
          .then(role => {
            db.newRole(role)
              .then(() => console.log(`Added ${role.title} to the database`))
              .then(() => loadMainPrompts())
          })
      })
  }

// Delete a role
function deleteRole() {
    db.showAllRoles()
      .then(([rows]) => {
        let roles = rows;
        const roleOptions = roles.map(({ id, title }) => ({
          name: title,
          value: id
        }));
  
        prompt([
          {
            type: "list",
            name: "roleId",
            message:
              "Which role do you want to remove? (Warning: This will also remove all employees associated with that role)",
            choices: roleOptions
          }
        ])
          .then(res => db.deleteRole(res.roleId))
          .then(() => console.log("Role has been deleted from the database"))
          .then(() => loadMainPrompts())
      })
  }
  
  // Show all deparments
  function showDepartments() {
    db.showAllDepartments()
      .then(([rows]) => {
        let departments = rows;
        console.log("\n");
        console.table(departments);
      })
      .then(() => loadMainPrompts());
  }
  
  // Add a department
  function newDepartment() {
    prompt([
      {
        name: "name",
        message: "Please enter the name of the new department"
      }
    ])
      .then(res => {
        let name = res;
        db.newDepartment(name)
          .then(() => console.log(`Added ${name.name} to the database`))
          .then(() => loadMainPrompts())
      })
  }
  
  // Delete a department
  function deleteDepartment() {
    db.showAllDepartments()
      .then(([rows]) => {
        let departments = rows;
        const departmentOptions = departments.map(({ id, name }) => ({
          name: name,
          value: id
        }));
  
        prompt({
          type: "list",
          name: "departmentId",
          message:
            "Which department would you like to delete? (Warning: This will also remove all associated roles and employees)",
          choices: departmentOptions
        })
          .then(res => db.deleteDepartment(res.departmentId))
          .then(() => console.log("Department has been deleted from the database"))
          .then(() => loadMainPrompts())
      })
  }
  
 // Add an employee
  function newEmployee() {
    prompt([
      {
        name: "first_name",
        message: "Please enter the employee's first name"
      },
      {
        name: "last_name",
        message: "Please enter the employee's last name"
      }
    ])
      .then(res => {
        let firstName = res.first_name;
        let lastName = res.last_name;
  
        db.showAllRoles()
          .then(([rows]) => {
            let roles = rows;
            const roleOptions = roles.map(({ id, title }) => ({
              name: title,
              value: id
            }));
  
            prompt({
              type: "list",
              name: "roleId",
              message: "Please enter the employee's role",
              choices: roleOptions
            })
              .then(res => {
                let roleId = res.roleId;
  
                db.showAllEmployees()
                  .then(([rows]) => {
                    let employees = rows;
                    const managerOptions = employees.map(({ id, first_name, last_name }) => ({
                      name: `${first_name} ${last_name}`,
                      value: id
                    }));
  
                    managerOptions.unshift({ name: "None", value: null });
  
                    prompt({
                      type: "list",
                      name: "managerId",
                      message: "Please select the employee's manager",
                      choices: managerOptions
                    })
                      .then(res => {
                        let employee = {
                          manager_id: res.managerId,
                          role_id: roleId,
                          first_name: firstName,
                          last_name: lastName
                        }
  
                        db.newEmployee(employee);
                      })
                      .then(() => console.log(
                        `Added ${firstName} ${lastName} to the database`
                      ))
                      .then(() => loadMainPrompts())
                  })
              })
          })
      })
  }
  
  // Exit the application
  function quit() {
    console.log("Goodbye!");
    process.exit();
  }
  