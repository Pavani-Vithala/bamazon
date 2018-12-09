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
connection.connect(function (err) {
    if (err) throw err;
    displayProductDetails();
});

function displayProductDetails() {
    var table = new Table({
        head: ['item_id', 'Product_Name', 'Department', 'Price', 'Stock']
        , colWidths: [10, 20, 20, 10, 10]
    });
    var query = "SELECT * from products";
    connection.query(query, function (err, res) {

        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
        }
        console.log(table.toString());
        runAction();
    });

}

function runAction() {

    inquirer.prompt([
        {
            name: "itemID",
            type: "input",
            message: "Enter the id of the product you want to purchase:",
        },
        {
            name: "Quantity",
            type: "input",
            message: "Enter the quantity of the product to purchase:"
        },

    ]).then(function (answer) {

        connection.query("SELECT item_id,price,stock_quantity FROM products WHERE ?", { item_id: answer.itemID }, function (err, res) {
           
            if (answer.Quantity > res[0].stock_quantity) {

                console.log("Insufficient quantity!");

            }
            else {

                var curStock = res[0].stock_quantity - answer.Quantity;

                var totalCost = res[0].price * answer.Quantity;

                var upQuery = "update products set stock_quantity = " + curStock + " where item_id = " + answer.itemID;

                connection.query(upQuery, function (err, res) {
                    if (err) {
                        console.log("Error");
                    }
                    else {
                        console.log("Your total Purchase Price is:" + totalCost);
                        console.log("Received order successfully:");
                        inquirer.prompt([
                            {
                                name: "continue",
                                type: "Confirm",
                                message: "Do you want to continue Shopping?(Y/N):",
                            }
                        ]).then(function (response) {
                            if (response.continue === 'Y')                            
                               displayProductDetails();
                            else {
                                console.log("Good Bye.See you soon");
                                return;
                            }
                        });
                    }
                });
            }
        });



    });
}

