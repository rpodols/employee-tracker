DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE departments(
  dept_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  dept_name VARCHAR(30)
);

CREATE TABLE roles(
  role_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  role_name VARCHAR(30),
  salary DECIMAL NOT NULL,
  dept INTEGER NULL, 
  FOREIGN KEY (dept) REFERENCES departments(dept_id)
  ON DELETE CASCADE
);


CREATE TABLE employees(
  employee_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  job_title INTEGER NULL,
  FOREIGN KEY (job_title) REFERENCES roles(role_id)
  ON DELETE SET NULL,
  manager INTEGER NULL,
  FOREIGN KEY (manager) REFERENCES employees(employee_id)
  ON DELETE SET NULL
);