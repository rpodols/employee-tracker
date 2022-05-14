INSERT INTO departments (dept_name)
VALUES 
  ("Field"),
  ("Front Office"),
  ("Back Office"),
  ("Admin"),
  ("Engineer");

INSERT INTO roles (role_name, salary, dept) 
VALUES
  ("Journeyman", 10000, 1),
  ("Apprentice", 20000, 2),
  ("Bricklayer", 30000, 3),
  ("Electrician", 40000, 4),
  ("Plumber", 50000, 5);

INSERT INTO employees (first_name, last_name, job_title, manager)
VALUES
  ("ryan", "podolski", 1, null),
  ("piper", "doodlebear", 2, 1),
  ("teddy", "bare", 1, 1),
  ("sydney", "dunlap", 3, 2),
  ("hershel", "choco", 4, 3),
  ("josh", "murtz", 5, 4);


