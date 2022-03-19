SELECT role.id, role.title, role.salary FROM role ORDER BY role.id;
SELECT role.id, role.title FROM role ORDER BY role.id;
SELECT * FROM employee;

SELECT department.id, department.name FROM department ORDER BY department.id;

SELECT department.name AS department, role.title, employee.id, employee.first_name, employee.last_name
    FROM employee
    LEFT JOIN role ON (role.id = employee.role_id)
    LEFT JOIN department ON (department.id = role.department_id)
    ORDER BY department.name;
    
SELECT CONCAT(manager.first_name, ' ', manager.last_name) AS manager, department.name AS department, employee.id, employee.first_name, employee.last_name, role.title
  FROM employee
  LEFT JOIN employee manager on manager.id = employee.manager_id
  INNER JOIN role ON (role.id = employee.role_id && employee.manager_id != 'NULL')
  INNER JOIN department ON (department.id = role.department_id)
  ORDER BY manager;
  
SELECT role.title, employee.id, employee.first_name, employee.last_name, department.name AS department
    FROM employee
    LEFT JOIN role ON (role.id = employee.role_id)
    LEFT JOIN department ON (department.id = role.department_id)
    ORDER BY role.title;

SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
  FROM employee
  LEFT JOIN employee manager on manager.id = employee.manager_id
  INNER JOIN role ON (role.id = employee.role_id)
  INNER JOIN department ON (department.id = role.department_id)
  ORDER BY employee.id;
  
SELECT first_name, last_name, role_id FROM employee 	WHERE employee.id = ?;

DELETE FROM department WHERE id = ?;

INSERT INTO department SET ?, department;

DELETE FROM role WHERE id = ?, roleId;

INSERT INTO role SET ?, role;

UPDATE employee SET manager_id = ? WHERE id = ?, (managerId, employeeId);

UPDATE employee SET role_id = ? WHERE id = ?, (roleId, employeeId);

DELETE FROM employee WHERE id = ?, employeeId;

SELECT id, first_name, last_name FROM employee WHERE id != ?, employeeId;


-- use employees;

-- INSERT INTO department 
--     (department_name)
-- VALUES
--     ('Office'),
--     ('Sales'),
--     ('Install'),
--     ('Service');

-- INSERT INTO employeeRole 
--     (title, salary, department_id)
-- VALUES
--     ('Office Manager', 60000, 1),
--     ('AR/AP', 45000, 1),
--     ('HR Manager', 60000, 1),
--     ('Sales Manager', 60000, 2),
--     ('Sales Rep', 40000, 2),
--     ('Install Manager', 60000, 3),
--     ('Draft Tech', 50000, 3),
--     ('Service Manager', 60000, 4),
--     ('Line Cleaner', 30000, 4);

-- INSERT INTO employee 
--     (first_name, last_name, role_id, manager_id)
-- VALUES
--     ('Kirsten', 'Canady', 1, 1),
--     ('Jessica', 'Fipps', 2, NULL),
--     ('Ellaina', 'Canady', 3, 2),
--     ('Casey', 'Canady', 4, 3),
--     ('Ryan', 'Porras', 5, NULL),
--     ('Paul', 'Benevent', 6, 4),
--     ('Steve', 'Schmeeve', 7, NULL),
--     ('Tayler', 'Campbell', 8, 5),
--     ('Robert', 'Bob', 9, NULL);