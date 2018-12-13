# bamazon
Amazon like app 

The purpose of this app is provide an Amazon like optiosn to users.

CUSTOMER APP(bamazonCustomer1.js)

This app makes useof the file bamazonCustomer.js. The back end table used is bamazon.Products.
The screenflow for the Customer add is as below


1.	As soon as you run the bamazonCustomer1.js, the available products are displayed along with a prompt to enter the id of the product to purchase
 ![alt text](https://github.com/Pavani-Vithala/bamazon/blob/master/Images/Customer/Customer1.png)
2.	Once you enter the id, it prompts for the quantity
 ![alt text](https://github.com/Pavani-Vithala/bamazon/blob/master/Images/Customer/Customer2.png)
3.	Once you enter the quantity, it displays the total price to the customer and displays that the order is received successfully. It also asks the customer if he wants to continue (Y/N). If the customer selects Y, repeats steps 1,2 and 3 to display the received order. When the table is displayed , the order 1 changes are reflected in the table.(inventory is reduced and also product_sales increases.
 ![alt text](https://github.com/Pavani-Vithala/bamazon/blob/master/Images/Customer/Customer3.png)
4.	If the customer selects N, Good Bye see you again will be displayed.
 ![alt text](https://github.com/Pavani-Vithala/bamazon/blob/master/Images/Customer/Customer4.png)
5.	In step2, if the quantity entered is more than the avialbe inventory, the system will display “Insufficient Quantity”
 ![alt text](https://github.com/Pavani-Vithala/bamazon/blob/master/Images/Customer/Customer5.png)
 
 
 MANAGER APP(bamazonManager.js)
 
 1.	When you run bamazonManager.js, the option displayed are as in the screenshot below

  ![alt text](https://github.com/Pavani-Vithala/bamazon/blob/master/Images/Manager/Manager1.png)

2.	When the option “View Products for Sale”, the Products table is displayed.

![alt text](https://github.com/Pavani-Vithala/bamazon/blob/master/Images/Manager/Manager2.png)
 
3.	When the option View Low inventory is selected, items with less than 5 stock are displayed

![alt text](https://github.com/Pavani-Vithala/bamazon/blob/master/Images/Manager/Manager3.png)
 
4.	When the option “Add to inventory” is selected, options to add inventory is displayed and a message after successfully adding product is displayed as below along with the updated table

![alt text](https://github.com/Pavani-Vithala/bamazon/blob/master/Images/Manager/Manager4.png)
 
5.	When the option “Add New product “ is selected, the below options are displayed and a success message after the product addition along with the updated table as below
 
![alt text](https://github.com/Pavani-Vithala/bamazon/blob/master/Images/Manager/Manager5.png)


SUPERVISOR APP(bamazonSupervisor1.js)

When bamazonSupervisor1.js is run, the below is the flow.

1.	The user is presented with the option as below
 ![alt text](https://github.com/Pavani-Vithala/bamazon/blob/master/Images/SuperVisor/Supervisor1.png)

2.	When the option View Product Sales by Department is selected, the below is displayed. A summarized display of product sales including total profits department wise.
 
 ![alt text](https://github.com/Pavani-Vithala/bamazon/blob/master/Images/SuperVisor/Supervisor2.png)

3.	When the option “Add Department” is selected, the options to add department are displayed and the department is added to the Departments table.
 

If we see the department table now, we can see the department added as below
 ![alt text](https://github.com/Pavani-Vithala/bamazon/blob/master/Images/SuperVisor/Supervisor3.png)

Note: Since there were no products in the Pharmacy department category in products1 table, we don’t get the details of the Pharmacy department in the summarized view.

![alt text](https://github.com/Pavani-Vithala/bamazon/blob/master/Images/SuperVisor/Supervisor4.png)


