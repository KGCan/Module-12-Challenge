use employees;

INSERT INTO department 
    (department_name)
VALUES
    ('Office'),
    ('Sales'),
    ('Install'),
    ('Service');

INSERT INTO employeeRole 
    (title, salary, department_id)
VALUES
    ('Office Manager', 60000, 1),
    ('AR/AP', 45000, 1),
    ('HR Manager', 60000, 1),
    ('Sales Manager', 60000, 2),
    ('Sales Rep', 40000, 2),
    ('Install Manager', 60000, 3),
    ('Draft Tech', 50000, 3),
    ('Service Manager', 60000, 4),
    ('Line Cleaner', 30000, 4);

INSERT INTO employee 
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Kirsten', 'Canady', 1, 1),
    ('Jessica', 'Fipps', 2, NULL),
    ('Ellaina', 'Canady', 3, 2),
    ('Casey', 'Canady', 4, 3),
    ('Ryan', 'Porras', 5, NULL),
    ('Paul', 'Benevent', 6, 4),
    ('Steve', 'Schmeeve', 7, NULL),
    ('Tayler', 'Campbell', 8, 5),
    ('Robert', 'Bob', 9, NULL);