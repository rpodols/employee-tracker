const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'employee_tracker_db'
    },
    console.log(`Connected to the employee_tracker_db database.`)
  );

//sets up db connection
db.connect(function(err) {
if (err) {
    return console.error('error: ' + err.message);
}
console.log('Connected to the MySQL server.');
mainMenu();
});

const mainMenu = () => {
    return inquirer
    .prompt([
        {
            type: 'list',
            name: 'mainMenu',
            message: 'Please choose an option below: ',
            choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role']
        }
    ]).then((data) => {
        if (data.mainMenu === 'View all Departments') {
            return viewAll("departments");
        } if (data.mainMenu === 'View all Roles') {
            return viewAll("roles");
        } if (data.mainMenu === 'View all Employees') {
            return viewAll("employees");
        } if (data.mainMenu === 'Add a Department') {
            return addDepartment();
        } if (data.mainMenu === 'Add a Role') {
            return addRole();
        }if (data.mainMenu === 'Add an Employee') {
            return addEmployee();
        } if (data.mainMenu === 'Update an Employee Role') {
            return updateEmployeeRole();
        }
    });
};

const viewAll = (table) => {
    let filter = "";
    if (table === "departments") {
        filter = `SELECT * FROM departments`;
    } else if (table === "roles") {
        filter = `SELECT * FROM roles`;
    } else {
        filter = `SELECT * FROM employees`;
    }
    db.query(filter, (err, res) => {
        if (err) throw err;
        console.table(res);
    
        mainMenu();
      });

};

const addDepartment = () => {
    return inquirer
    .prompt([
        {
            type: "input",
            name: "department",
            message: "Please enter the new department name: "
        }
    ])
    .then(response => {
        const newDept = `INSERT INTO departments (dept_name) VALUES (?)`;
        db.query(newDept, [response.department], (err, res) => {
            if (err) throw err;
            console.log(`Successfully added ${response.department} to the database.`);
            mainMenu();
        });
    })
    .catch(err => {
        console.error(err);
    });
};

const addRole = () => {
    const departmentList = [];
    db.query("SELECT * FROM departments", (err, res) => {
        if (err) throw err;

        res.forEach(department => {
            let deptObj = {
                name: department.dept_name,
                value: department.dept_id
            }
            departmentList.push(deptObj);
        });

    return inquirer
    .prompt([
        {
            type: "input",
            name: "name",
            message: "Please enter the name of the role: "
        },
        {
            type: "list",
            name: "department",
            choices: departmentList,
            message: "Please choose the department this role falls under: "
        },
        {
            type: "input",
            name: "salary",
            message: "Please enter the salary of this role: "
        },
    ])
    .then(response => {
        const newRole = `INSERT INTO roles (role_name, dept, salary) VALUES (?)`;
        db.query(newRole, [[response.name, response.department, response.salary]], (err, res) => {
            if (err) throw err;
            console.log(`Successfully added ${response.name} to the database.`);
            mainMenu();
        });
    })
    .catch(err => {
        console.error(err);
    });
    });
};

const addEmployee = () => {
    const roleList = [];
    db.query("SELECT * FROM roles", (err, res) => {
        if (err) throw err;

        res.forEach(role => {
            let roleObj = {
                name: role.role_name,
                value: role.role_id
            }
            roleList.push(roleObj);
        });
    
    const employeeList = [
        {
            name: 'None',
            value: null
        }
    ];
    db.query("SELECT * FROM employees", (err, res) => {
        if (err) throw err;

        res.forEach( ({ first_name, last_name, employee_id }) => {
            let employeeObj = {
                name: first_name + " " + last_name,
                value: employee_id
            }
            employeeList.push(employeeObj);
        });

    return inquirer
    .prompt([
        {
            type: "input",
            name: "firstName",
            message: "Please enter the employee's first name: "
        },
        {
            type: "input",
            name: "lastName",
            message: "Please enter the employee's last name: "
        },
        {
            type: "list",
            name: "role",
            choices: roleList,
            message: "Please choose the employee's role: "
        },
        {
            type: "list",
            name: "manager",
            choices: employeeList,
            message: "Please choose the employee's manager: "
        },
    ])
    .then(response => {
        const newEmployee = `INSERT INTO employees (first_name, last_name, job_title, manager) VALUES (?)`;
        db.query(newEmployee, [[response.firstName, response.lastName, response.role, response.manager]], (err, res) => {
            if (err) throw err;
            console.log(`Successfully added ${response.firstName} ${response.lastName} to the database.`);
            mainMenu();
        });
    })
    .catch(err => {
        console.error(err);
    });
    });
    });
};