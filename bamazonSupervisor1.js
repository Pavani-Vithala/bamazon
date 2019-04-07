var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
});
// If Error display error else call the runAction function to to provide options to the SuperVisor
connection.connect(function (err) {
    if (err) throw err;
    runAction();
});


// Function to give the supervisor options
function runAction() {

    inquirer.prompt({
        name: "Options",
        type: "list",
        choices: ["View Product Sales by Department", "Add New Department"]

    }).then(function (answer) {
        switch (answer.Options) {
            // Display Sales by Department
            case "View Product Sales by Department":
                displaydeptSales();
                break;
            case "Add New Department":
                // Add a new Department
                addDepartment();
                break;

        }
    });



    // Function to display products available for sale

    function displaydeptSales() {
        var table = new Table({
            head: ['department_id', 'department_Name', 'overhead_costs', 'product_sales', 'total_profit']
            , colWidths: [20, 20, 20, 20, 20]
        });
        var query = "select dept.department_id as department_id,dept.department_name as department_name,dept.overhead_costs as overhead_costs,prod.product_sales as product_sales,(prod.product_sales-dept.overhead_costs) as total_profit from departments as dept inner join products1 as prod on prod.department_name = dept.department_name group by dept.department_name order by dept.department_id asc;";
        connection.query(query, function (err, res) {

            for (var i = 0; i < res.length; i++) {
                table.push([res[i].department_id, res[i].department_name, res[i].overhead_costs, res[i].product_sales, res[i].total_profit]);
            }
            console.log(table.toString());

        });

    }


    // Function to add new Department 
    function addDepartment() {
        inquirer.prompt([

            {
                name: "DeptName",
                type: "input",
                mesage: "Enter the qunatity you want to increase for the product:"
            },
            {
                name: "Overhead_Cost",
                type: "input",
                message: "Enter the overhead cost of the department:"
            }
        ]).then(function (newDept) {

            //var newDeptId = newDept.DeptId;
            var newDeptName = newDept.DeptName;
            var newoverhead = newDept.Overhead_Cost;

            var query = "insert into departments(department_name,overhead_costs) values('" + newDeptName + "'," + newoverhead + ");"
            console.log("Query is:" + query);
            connection.query(query, function (err, res) {
                if (err) {
                    console.log(err);
                }
                else {

                    console.log("New department added successfully");


                }
            });


        });
    }




}




