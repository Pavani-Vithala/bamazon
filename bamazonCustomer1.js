var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

//Setting the DB parameters
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
});

//Display all existing ProductDetails if DB connection is successful else display error
connection.connect(function (err) {
    if (err) throw err;
    displayProductDetails();
});

//Function to display all existing products 
function displayProductDetails() {
    //Declaration of CLI table with column names
    var table1 = new Table({
        head: ['item_id', 'Product_Name', 'Department', 'Price', 'Stock', 'Product_Sales']
        , colWidths: [10, 20, 20, 10, 10, 20]
    });
    //Raw query to execute on DB connection
    var query = "SELECT * from products1";

    connection.query(query, function (err, res) {
        //For each record in the product table, push to the CLI table
        for (var i = 0; i < res.length; i++) {
            table1.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity, res[i].product_sales]);

        }
        //Display the table on the console
        console.log(table1.toString());
        //Call the function runAction() which provided the options to the user to act on using inquirer
        runAction();
    });

}
//This function provides users option to provide the item and quantity they want to purchase
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
        //based on the suer inputs obtained, run the select query on products1 table.
        connection.query("SELECT item_id,price,stock_quantity,product_sales FROM products1 WHERE ?", { item_id: answer.itemID }, function (err, res) {
            //If quantity required by user is more than the quantity in the DB,display insufficient quantity
            if (answer.Quantity > res[0].stock_quantity) {

                console.log("Insufficient quantity!");

            }
            // Otherwise, update the existing stock by substracting the user requeted stock and also the product sales value 
            else {
                // Current stock is equal to existing stock - stock requested
                var curStock = res[0].stock_quantity - answer.Quantity;
                // totalCost to customer is price of 1 item multiplied by quantity requested
                var totalCost = res[0].price * answer.Quantity;
                //Total product sales is equal to existing product sales plus the total cost
                var product_sales = res[0].product_sales + parseInt(totalCost);
                // Update the stock and product sales values in the DB
                var upQuery = "update products1 set stock_quantity = " + curStock + ", product_sales = " + product_sales + " where item_id = " + answer.itemID;
                // Execute the query and update the DB.Display the totoal cose to customer and also a success message, otherwise display error
                connection.query(upQuery, function (err, res) {
                    if (err) {
                        console.log("Error");
                    }
                    else {
                        console.log("Your total Purchase Price is:" + totalCost);
                        console.log("Received order successfully:");
                        //Prompt the customer if they want to continue shopping or  quit. If the respons is yes, display the product again.Else Say Good bye
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

