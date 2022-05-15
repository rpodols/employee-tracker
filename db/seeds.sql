INSERT INTO departments (dept_name)
VALUES 
  ("Field"),
  ("Front Office"),
  ("Back Office"),
  ("Admin"),
  ("Engineer"),
  ("Custodial");

INSERT INTO roles (role_name, salary, dept) 
VALUES
  ("Journeyman", 10000, 1),
  ("Apprentice", 20000, 2),
  ("Bricklayer", 30000, 3),
  ("Electrician", 40000, 4),
  ("Plumber", 50000, 5);

INSERT INTO employees (first_name, last_name, job_title, manager)
VALUES
  ("Ryan", "Podolski", 1, null),
  ("Piper", "DoodleBear", 2, 1),
  ("Teddy", "Bare", 1, 1),
  ("Sydney", "Dunlap", 3, 2),
  ("Hershel", "Choco", 4, 3),
  ("Rusty", "Rabbit", 2, 3),
  ("Hayley", "Danny", 2, 3),
  ("Josh", "Murtz", 5, 4);


