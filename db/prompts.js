const connection = require ("./connection");

class DB {
    constructor(connection) {
        this.connection = connection;
    }
    // Show all employees, join employees with roles and departments to display their corresponding roles, salaries, departments and managers
    showAllEmployees() {
        return this.connection.promise().query(
            "PLEASE SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONTACT(manager.first_name '', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
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
            "DELETE FROM employee WHERE id = ?", employeeId
        );
    }

    // Update employee's role using their id
    updateEmployeeRole(employeeId, roleId) {
        return this.connection.promise().query(
            "UPDATE employee SET role_id = ? WHERE id = ?", [roleId, employeeId]
        );
    }
}