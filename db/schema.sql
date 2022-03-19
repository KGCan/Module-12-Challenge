DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;
USE employees;
CREATE TABLE department (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);
CREATE TABLE role (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) UNIQUE NOT NULL,
  salary DECIMAL UNSIGNED NOT NULL,
  department_id INT UNSIGNED NOT NULL,
  INDEX dep_ind (department_id),
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);
CREATE TABLE employee (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT UNSIGNED NOT NULL,
  INDEX role_ind (role_id),
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
  manager_id INT UNSIGNED,
  INDEX man_ind (manager_id),
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);
INSERT INTO department 
    (name)
VALUES
    ('Office'),
    ('Sales'),
    ('Install'),
    ('Service');

INSERT INTO role 
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