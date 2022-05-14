const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
var figlet = require('figlet');

const welcome = figlet.text('Employee Tracker', {
    font: 'ANSI Regular',
}, function(err, data) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`==========================================================================================================================================

${data}
==========================================================================================================================================`)
});

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'employee_tracker_db'
    },
    welcome
  );

db.connect(function(err) {
if (err) {
    return console.error('error: ' + err.message);
}
mainMenu();
});

const mainMenu = () => {
    return inquirer
    .prompt([
        {
            type: 'list',
            name: 'mainMenu',
            message: 'Please choose an option below: ',
            choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Delete an Employee', 'Update Employee Manager', 'Quit']
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
        } if (data.mainMenu === 'Update Employee Manager') {
            return updateManager();
        } if (data.mainMenu === 'Delete an Employee') {
            return deleteEmployee();
        } if (data.mainMenu === 'Quit') {
            console.log("Thank you for using the Employee Tracker!");
            process.exit(0);
        }
    });
};

const viewAll = (table) => {
    let filter = "";
    if (table === "departments") {
        filter = `SELECT dept_id AS ID, dept_name AS Deptartment_Name FROM departments`;
    } else if (table === "roles") {
        filter = `SELECT role_id AS ID, role_name AS Role_Title, salary AS Salary, dept_name AS Department FROM roles JOIN departments ON dept = departments.dept_id`;
    } else {
        filter = `SELECT employees.employee_id AS ID, employees.first_name AS First_Name, employees.last_name AS Last_Name, role_name AS Role_Title, dept_name AS Department, salary AS Salary, CONCAT(man.first_name, " ", man.last_name) AS Manager FROM employees LEFT JOIN roles on job_title = roles.role_id LEFT JOIN departments ON roles.dept = departments.dept_id LEFT JOIN employees AS man on employees.manager = man.employee_id;`;
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
        }
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

const updateEmployeeRole = () => {
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
    
    const employeeList = [];
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
            type: "list",
            name: "employees",
            choices: employeeList,
            message: "Please choose an employee to update their role: "
        },
        {
            type: "list",
            name: "role",
            choices: roleList,
            message: "Please choose the employee's new role: "
        }
    ])
    .then(response => {
        const updateRole = `UPDATE employees SET job_title=(?) WHERE employee_id=(?)`;
        db.query(updateRole, [response.role, response.employees], (err, res) => {
            if (err) throw err;
            console.log(`Role successfully updated.`);
            mainMenu();
        });
    })
    .catch(err => {
        console.error(err);
    });
    });
});
};

const deleteEmployee = () => {
    const employeeList = [];
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
            type: "list",
            name: "employees",
            choices: employeeList,
            message: "Please choose an employee to delete from the database: "
        }
    ])
    .then(response => {
        const removeEmployee = `DELETE FROM employees WHERE employee_id=?`;
        db.query(removeEmployee, [response.employees], (err, res) => {
            if (err) throw err;
            console.log(`Employee successfully deleted.`);
            mainMenu();
        });
    })
    .catch(err => {
        console.error(err);
    });
    });
};

const updateManager = () => {
    
    const employeeList = [];
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
            type: "list",
            name: "employees",
            choices: employeeList,
            message: "Please choose an employee to update their manager: "
        },
        {
            type: "list",
            name: "manager",
            choices: employeeList,
            message: "Please choose the employee's new manager: "
        }
    ])
    .then(response => {
        const updateManager = `UPDATE employees SET manager=(?) WHERE employee_id=(?)`;
        db.query(updateManager, [response.manager, response.employees], (err, res) => {
            if (err) throw err;
            console.log(`Manager successfully updated.`);
            mainMenu();
        });
    })
    .catch(err => {
        console.error(err);
    });
    });
};