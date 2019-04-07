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
//If DB connection is successful, display options to the Manager by calling the function runAction()
connection.connect(function (err) {
    if (err) throw err;
    runAction();
});


//Display options to manager using inquirer
function runAction() {

    inquirer.prompt({
        name: "Options",
        type: "list",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]

    }).then(function (answer) {
        switch (answer.Options) {
            //if the choice is to view products, display all the products by calling the ufnction displayProducts()
            case "View Products for Sale":
                displayProducts();
                break;
            //If the choice is to view Low inventory, call the function lowInventory
            case "View Low Inventory":
                lowInventory();
                break;
            //If the choice is to Add inventory, call the function addInventory
            case "Add to Inventory":
                addInventory();
                break;
            //If the choice is to add a new product , call the function addNewProduct()
            case "Add New Product":
                addNewProduct();
                break;
        }
    });



    // Function to display products available for sale

    function displayProducts() {
        var table = new Table({
            head: ['item_id', 'Product_Name', 'Department', 'Price', 'Stock']
            , colWidths: [10, 20, 20, 10, 10]
        });
        var query = "SELECT * from products";
        connection.query(query, function (err, res) {

            for (var i = 0; i < res.length; i++) {
                table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
            }

            //Display the table on the console
            console.log(table.toString());

        });

    }

    // Funtion to display low inventory items
    function lowInventory() {
        //initialize the query as all products less than quantity as 5
        var query = "SELECT * from products where stock_quantity < 5";
        //Declare a CLI table to push the low stock items
        var lowStock = new Table({
            head: ['item_id', 'Product_Name', 'Department', 'Price', 'Stock']
            , colWidths: [10, 20, 20, 10, 10]
        });
        connection.query(query, function (err, res) {
            //For each record in the product table, push to the CLI lowStock table
            for (var i = 0; i < res.length; i++) {
                lowStock.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
            }

            //Display the lowStock table to the console.
            console.log(lowStock.toString());

        });

    }
    // Function to add Inventory 
    function addInventory() {
        // // PRompt the user to enter the id and quantity to increase for the chosen product
        inquirer.prompt([
            {
                name: "enterID",
                type: "input",
                message: "Enter the id of the item you want to add Inventory for:"
            },
            {
                name: "enterQuant",
                type: "input",
                mesage: "Enter the qunatity you want to increase for the product:"
            },
        ]).then(function (resp) {
            // Select the product chosen and get the current stock of the product
            connection.query("Select stock_quantity from products where item_id = " + resp.enterID, function (err, data) {
                var curStock = data[0].stock_quantity;
                if (err) {
                    console.log(err);
                }
                // Declare a variable to add the current stock and the stock increase requested
                var stockToSet = parseInt(curStock) + parseInt(resp.enterQuant);
                // Update the products tbale wiht the stockToSet variable which is sum of current and the desired increase 
                var query = "update products set stock_quantity = " + stockToSet + " where item_id = " + resp.enterID + ";"

                connection.query(query, function (err, res) {
                    // if error, display error else display the products table reflecting increased stock
                    if (err) {
                        console.log(err);

                    } else {

                        console.log("Inventory Updated successfully:");
                        displayProducts();
                    }

                });
            });
        });
    }


    //Function to add new Products

    function addNewProduct() {
        //Provide prompts to enter new product details
        inquirer.prompt([
            {
                name: "prodName",
                type: "input",
                message: "Enter the new Product Name:"
            },

            {
                name: "deptName",
                type: "input",
                message: "Enter the Department Name of the new product:"
            },
            {
                name: "price",
                type: "input",
                message: "Enter the price of the new product:"
            },
            {
                name: "stock",
                type: "input",
                message: "Enter the stock of the new product:"
            },

        ]).then(function (newProd) {

            var newProdName = newProd.prodName;
            var newDeptName = newProd.deptName;
            var newPrice = newProd.price;
            var newStock = newProd.stock;
            //Insert the new product into the products table.if error, display error, else display product added successfully
            var query = "insert into products(product_name,department_name,price,stock_quantity) values( '" + newProdName + "','" + newDeptName + "','" + newPrice + "'," + newStock + ");"
            console.log("Query is:" + query);
            connection.query(query, function (err, res) {
                if (err) {
                    console.log(err);
                }
                else {

                    console.log("New Product added successfully");
                    //Display the products tabel with the added product
                    displayProducts();

                }
            });


        });
    }

}




