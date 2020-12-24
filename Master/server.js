var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Darktide3966332!",
    database: "employeeTracker_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

function start() {
    inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What can we help you with today?',
        choices: ['View department', 'view roles', 'view employees', 'add department', 'add employee', 'add role', 'update employee role', 'delete employee', 'delete department', 'delete role']
    })
        .then((res) => {
            if (res.action == 'View department') {
                viewDept()
            } else if (res.action == 'view roles') {
                viewRoles()
            } else if (res.action == 'view employees') {
                viewEmployees()
            } else if (res.action == 'add department') {
                addDept()
            } else if (res.action == 'add employee') {
                addEmployee()
            } else if (res.action == 'add role') {
                addRole()
            } else if (res.action == 'update employee role') {
                updateRole()
            }
            else if (res.action == 'delete employee') {
                    deleteEmployee()
            }
            else if (res.action == 'delete department') {
                deleteDept()
            }
            else if (res.action == 'delete role') {
                deleteRole()
            }
            })
}

function viewDept() {
    console.log('view Dept selected...')
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

function viewRoles() {
    console.log('Role selected...')
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

function viewEmployees() {
    console.log('Employee selected...')
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

function addDept() {
    inquirer.prompt({
        name: 'whichDept',
        type: 'input',
        message: 'What is the name of the department you would like to create?',
    }).then((res) => {
        console.log("Inserting a department...\n");
        connection.query(
            "INSERT INTO department SET ?", {
            name: res.whichDept
        },
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " department inserted!\n");
                start();
            }
        );
    })
}

function addRole() {
    inquirer.prompt({
        name: 'whichRole',
        type: 'input',
        message: 'What is the role of the employee you would like to create?',
    }).then((res) => {
        console.log("Designating a role...\n");
        var query = connection.query(
            "INSERT INTO role SET ?", {
            title: res.whichRole
        },
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " role applied!\n");
                start();
            }
        );
    })
}

function updateRole() {
    inquirer.prompt([{
        name: 'employeeID',
        type: 'input',
        message: 'What is the employees id that you would like to update?',
    },
    {
        name: 'role_id',
        type: 'input',
        message: 'What is the employees new role?',
    }])
        .then((res) => {
            console.log("Updating employee role...\n");
            var query = connection.query(
                "UPDATE employee SET ? WHERE ?",
                [{
                    role_id: res.role_id
                },
                {
                    id: res.employeeID
                },
                ],
                function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " role updated!\n");
                    start();
                }
            );
        })
}

function deleteEmployee() {
    console.log("Deleting employee...\n");
    inquirer.prompt({
        name: 'employeeID',
        type: 'input',
        message: 'What is the employees id that you would like to delete?',
    })
        .then((res) => {
            connection.query(
                "DELETE FROM employee WHERE ?",
                {
                    id: res.employeeID
                },
                function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " employee deleted!\n");
                    start();
                }
            )
        });
}

function deleteDept() {
    console.log("Deleting department...\n");
    inquirer.prompt({
        name: 'departmentID',
        type: 'input',
        message: 'What is the departments id that you would like to delete?',
    })
        .then((res) => {
            connection.query(
                "DELETE FROM department WHERE ?",
                {
                    id: res.departmentID
                },
                function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " department deleted!\n");
                    start();
                }
            )
        });
}

function deleteRole() {
    console.log("Deleting role...\n");
    inquirer.prompt({
        name: 'roleID',
        type: 'input',
        message: 'What is the id of the role that you would like to delete?',
    })
        .then((res) => {
            connection.query(
                "DELETE FROM role WHERE ?",
                {
                    id: res.roleID
                },
                function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " role deleted!\n");
                    start();
                }
            )
        });
}