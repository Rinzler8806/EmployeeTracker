DROP DATABASE IF EXISTS employeeTracker_db;

CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE department (
  id INTEGER NOT NULL AUTO_INCREMENT,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INTEGER NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2),
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INTEGER NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30)NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ("General"),("Subcontractor"),("Management");

INSERT INTO role (title,salary,department_id)
VALUES ("superintendent",120000,1),
("engineer",70000.44,1),
("foreman",90000.77,2),
("Project Manager",110000.88,3);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ("Stuart","Little",1,NULL),
("Kevin","Little",3,1),
("Bob","Nygard",2,1),
("Dave","Bock",1,1);