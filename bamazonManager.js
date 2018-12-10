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
    runAction();
});



function runAction() {

    inquirer.prompt({
        name: "Options",
        type: "list",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]

    }).then(function (answer) {
        switch (answer.Options) {
            case "View Products for Sale":
                displayProducts();
                break;
            case "View Low Inventory":
                lowInventory();
                break;
            case "Add to Inventory":
                addInventory();
                break;
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
            console.log(table.toString());

        });

    }

    // Funtion to display low inventory items
    function lowInventory() {
        var query = "SELECT * from products where stock_quantity < 5";
        var lowStock = new Table({
            head: ['item_id', 'Product_Name', 'Department', 'Price', 'Stock']
            , colWidths: [10, 20, 20, 10, 10]
        });
        connection.query(query, function (err, res) {

            for (var i = 0; i < res.length; i++) {
                lowStock.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
            }
            console.log(lowStock.toString());

        });

    }
    // Function to add Inventory 
    function addInventory() {
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

            connection.query("Select stock_quantity from products where item_id = " + resp.enterID, function (err, data) {
                var curStock = data[0].stock_quantity;
                if (err) {
                    console.log(err);
                }

                var stockToSet = parseInt(curStock) + parseInt(resp.enterQuant);
                var query = "update products set stock_quantity = " + stockToSet + " where item_id = " + resp.enterID + ";"

                connection.query(query, function (err, res) {

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
            
            var query = "insert into products(product_name,department_name,price,stock_quantity) values( '" + newProdName +"','" + newDeptName + "','" + newPrice + "'," + newStock + ");"
            console.log("Query is:"+ query);
            connection.query(query, function (err, res) {
                if (err) {
                    console.log(err);
                }
                else {

                    console.log("New Product added successfully");
                    displayProducts();

                }
            });


        });
    }

}




