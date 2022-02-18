const consoleTable = require('console.table');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const con = mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: "Zsaber123!", 
    database: 'company_db'
}
);


async function applicationPrompt(){

        await inquirer.prompt([
        {
            type:"list",
            name: "applicationChoices",
            choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"],
            message: "What would you like to do?"
        }
    ])
        .then(async (applicationData) => { 
            if (applicationData.applicationChoices == "view all departments"){
                var query = 
                `SELECT * FROM department`
                con.query(query, function (err, res){
                    if (err) throw err;
                    console.table(res);
                    console.log("viewing all departments\n");
                    applicationPrompt()
                })
            }
            else if (applicationData.applicationChoices == "view all roles"){
                var query = 
                `Select employeerole.id as id, employeerole.title as Title, employeerole.salary as Salary, department.department_name as Department_Name
                FROM employeerole 
                LEFT JOIN department ON employeerole.department = department.id`
                con.query(query, function (err, res){
                    if (err) throw err;
                    console.table(res);
                    console.log("viewing all roles\n")
                    applicationPrompt()
                })
            }
            else if (applicationData.applicationChoices == "view all employees"){
                var query =
                `Select e.id as id, e.first_name as first_name, e.last_name as last_name, r.title as Title, 
                department.department_name as Department_name, r.salary as Salary, CONCAT(m.first_name, ' ' , m.last_name) as Manager
                FROM employee e
                LEFT JOIN employeerole r ON e.role_id = r.id
                LEFT JOIN employee m ON m.id = e.manager_id
                LEFT JOIN department ON r.department = department.id
                `
                con.query(query, function (err,res){
                    if(err) throw err;
                    console.table(res);
                    console.log("viewing all employees\n")
                    applicationPrompt()
                })
            }
            else if (applicationData.applicationChoices == "add a department"){
                await inquirer.prompt([
                    {
                        type:"input",
                        name:"departmentName",
                        message:"What department do you want to add?"
                    }
                ])
                .then(async(userInput) =>{
                    var query = `INSERT INTO department (department_name) VALUES ("${userInput.departmentName}");`
                    con.query(query, function (err,res){
                        if(err) throw err;
                        applicationPrompt()
                    })
                })
            }
            else if (applicationData.applicationChoices == "add a role"){
                await inquirer.prompt([
                    {
                        type:"input",
                        name:"roleTitle",
                        message:"What title do you want to add?"
                    },
                    {
                        type:"input",
                        name:"roleSalary",
                        message:"How much is the salary?"
                    },
                    {
                        type:"input",
                        name:"roleDepartment",
                        message:"What department ID is it?"
                    },
                ])
                .then(async(userInput) =>{
                    var query = `INSERT INTO employeeRole (title, salary, department) VALUES ("${userInput.roleTitle}", ${userInput.roleSalary}, ${userInput.roleDepartment});`
                    con.query(query, function (err,res){
                        if(err) throw err;
                        applicationPrompt()
                    })
                })
            }
            else if (applicationData.applicationChoices == "add an employee"){
                await inquirer.prompt([
                    {
                        type:"input",
                        name:"employee_firstName",
                        message:"What is the employee's first name?"
                    },
                    {
                        type:"input",
                        name:"employee_lastName",
                        message:"What is the employee's last name"
                    },
                    {
                        type:"input",
                        name:"employee_roleId",
                        message:"What is the employee's role id?"
                    },
                    {
                        type:"input",
                        name:"employee_managerId",
                        message:"What is the id of the manager that manages the employee?"
                    },
                ])
                .then(async(userInput) =>{
                    var query = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("${userInput.employee_firstName}", "${userInput.employee_lastName}", 
                    ${userInput.employee_roleId}, ${userInput.employee_managerId})`
                    con.query(query, function (err,res){
                        if(err) throw err;
                        applicationPrompt()
                    })
                })
            }
            else if (applicationData.applicationChoices == "update an employee role"){
                var query = 
                `SELECT employee.first_name, employee.last_name, employeerole.title 
                FROM employee
                LEFT JOIN employeerole ON employee.role_id = employeerole.id
                `
                con.query(query, function (err,res){
                    if(err) throw err;
                    const employeeChoices = res.map(({first_name, last_name}) =>
                    ({
                        name: first_name + " " + last_name
                    }))
                    const titleChoices = res.map(({title}) =>
                    ({
                        name: title,
                    }))
                    inquirer.prompt([
                    {
                        type: "list",
                        name: "employeeChoices",
                        choices: employeeChoices,
                        message: "Choose an employee"
                    },
                    {
                        type: "list",
                        name: "roleUpdate",
                        choices: titleChoices,
                        message: "What role do you want to give him/her"
                    }
                    ])

                    .then((userInput) => {
                        var data = `SELECT id FROM employeeRole WHERE title = "${userInput.roleUpdate}";`
                        con.query(data, function (err, res){
                            if (err) throw err;
                            var selectedData = res[0]["id"]
                            var query = `UPDATE employee SET role_id = ${selectedData} WHERE first_name = "${userInput.employeeChoices.split(" ")[0]}";`
                            con.query(query, function (err, res){
                                if (err) throw err;
                                applicationPrompt()
                            })
                        })
                    })
            })
            }
        }
    
        )
}


function main(){
    applicationPrompt()
}

main()