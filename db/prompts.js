const connection = require ("./connection");

class DB {
    constructor(connection) {
        this.connection = connection;
    }
    // Show all employees, join employees with roles and departments to display their corresponding roles, salaries, departments and managers
    showAllEmployees() {
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        );
    }

    // Show all managers
    showAllManagers(employeeId) {
        return this.connection.promis().query(
            "SELECT id, first_name, last_name FROM employee WHERE id != ?",
            employeeId
        )
    }

    // Add new employee
    newEmployee(employee) {
        return this.connection.promise().query("INSERT INTO employee SET ?", employee);
    }

    // Delete an employee using the given id
    deleteEmployee(employeeId) {
        return this.connection.promise().query(
            "DELETE FROM employee WHERE id = ?",
            employeeId
        );
    }

    // Update employee's role using their id
    updateEmployeeRole(employeeId, roleId) {
        return this.connection.promise().query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            [roleId, employeeId]
        );
    }

    // Update the manager of a selected employee
    updateManagerofEmployee(employeeId, managerId) {
         return this.connection.promise().query(
            "UPDATE employee SET manager_id = ? WHERE id = ?",
            [managerId, employeeId]
        );
     }
    // Show all employee roles, join with their respective departments to display the name of their department
    showAllRoles() {
        return this.connection.promise().query(
            "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
        );
    }

    // Add new role
    newRole(role) {
        return this.connection.promise().query("INSERT INTO role SET ?", role);
    }

    // Delete a role from the database
    deleteRole(roleId) {
        return this.connection.promise().query("DELETE FROM role WHERE id = ?", roleId);
    }

    // Show all departments
    showAllDepartments() {
        return this.connection.promise().query(
            "SELECT department.id, department.name FROM department;"
        );
    }

    // Add new department
    newDepartment(department) {
        return this.connection.promise().query("INSERT INTO department SET ?", department);
    }

    // Delete a department
    deleteDepartment(departmentId) {
        return this.connection.promise().query(
            "DELETE FROM department WHERE id = ?",
            departmentId
        );
    }

    // Show all employees in selected department, join with roles to show their role title. 
    showEmployeesByDepartment(departmentId) {
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",
        departmentId
        );
    }

    // Show employees by manager, join with departments and roles to show their titles and department names
    showEmployeesByManager(managerId) {
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;",
          managerId
        );
    }
}

module.exports = new DB(connection);