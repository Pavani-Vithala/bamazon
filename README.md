# bamazon
Amazon like app 

The purpose of this app is provide an Amazon like optiosn to users.

1. Customer app.

This app makes useof the file bamazonCustomer.js. The back end table used is bamazon.Products.
The screenflow for the Custoemr add is as below


1.	As soon as you run the bamazonCustomer1.js, the available products are displayed along with a prompt to enter the id of the product to purchase
 ![](image.png)
2.	Once you enter the id, it prompts for the quantity
 
3.	Once you enter the quantity, it displays the total price to the customer and displays that the order is received successfully. It also asks the customer if he wants to continue (Y/N). If the customer selects Y, repeats steps 1,2 and 3 to display the received order. When the table is displayed , the order 1 changes are reflected in the table.(inventory is reduced and also product_sales increases.
 
4.	If the customer selects N, Good Bye see you again will be displayed.
 
5.	In step2, if the quantity entered is more than the avialbe inventory, the system will display “Insufficient Quantity”
