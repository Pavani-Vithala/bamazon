var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table"); 

var table = new Table({
    head: ['item_id', 'Product_Name','Department','Price','Stock']
  , colWidths: [10,20,20,10,10]
});
 
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "password",
    database: "bamazon"
  }); 
  connection.connect(function(err) {
    if (err) throw err;
    displayProductDetails();
  });

  function displayProductDetails()
  {
    var query = "SELECT * from products";
    connection.query(query,function(err, res) {
        
      for (var i = 0; i < res.length; i++) {
         table.push([res[i].item_id,res[i].product_name,res[i].department_name,res[i].price,res[i].stock_quantity]) ;
           }
         console.log(table.toString());
         runAction();
      });

  }

  function runAction{

   console.log("To include inquirer functions");
}

