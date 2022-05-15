# Employee Tracker - Challenge 12

## Description
This project is the twelfth challenge of the coding bootcamp.

User Story: As a business owner, I want to be able to view and manage the departments, roles, and employees in my company so that I can organize and plan my business.

Starting from scratch, this challenge required writing code to do the following:
*   GIVEN a command-line application that accepts user input
        -   WHEN I start the application
        -   THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

        -   WHEN I choose to view all departments
        -   THEN I am presented with a formatted table showing department names and department ids

        -   WHEN I choose to view all roles
        -   THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

        -   WHEN I choose to view all employees
        -   THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

        -   WHEN I choose to add a department
        -   THEN I am prompted to enter the name of the department and that department is added to the database

        -   WHEN I choose to add a role
        -   THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

        -   WHEN I choose to add an employee
        -   THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

        -   WHEN I choose to update an employee role
        -   THEN I am prompted to select an employee to update and their new role and this information is updated in the database

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Tests](#tests)
- [Questions](#questions)

## Made Using:
* Node.js

## Installation
* to install, clone the repository from GitHub, run the command 'npm i' while in the project directory, and then run 'node app' to launch the employee tracker within the terminal/command line.  if database does not exist, additionally please run schema.sql, and seeds.sql to populate data into the database.  this can be done in the terminal - using the command 'mysql -u root -p', and then entering the mysql password.  if your mysql username is not root, please substitute your username in that command.  within mysql, run 'source db/schema.sql' to run the schema, and to seed, run 'source db/seeds.sql'.  running 'node app' in terminal after should result in a populated database.

## Usage
* this can be used to manage a company's employee database

## Contributing
* no outside contributions at this time

## License
* MIT License

[Click here for more license info!](https://choosealicense.com/licenses/mit/)

## Tests
* tests can be run by creating departments, roles, employees, and then viewing any entered data and updating if necessary.  a 'seeds.sql' will be included in the repository, which can be run populate the database with test data.

## Questions
* any questions, please feel free to reach out via email to rdpodols@gmail.com

## Link to Project & Screenshot
![Employee Tracker Screenshot)](/assets/images/applicationImage1.png)
[Click here to view the project!](https://rpodols.github.io/employee-tracker/)

## Walkthrough Video
* video walkthrough to show full capabilities of app:
    - Click here: https://drive.google.com/file/d/1wFehtt0XUkfQXfDVKC2hUP5H0KcuKsB1/view
