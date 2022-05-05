# Dillon Floral Corporation Employee Dashboard

## Purpose
This is a prototype for an application that will eventually replace the archaic command line apps used for purchase orders, sales orders, inventory management, etc at my family's wholesale floral business.

## Built With
* MongoDB
* Express.js
* React.js
* Node.js
* Material UI
* Canvasjs-react-charts
* IndexedDB
* Heroku

## Repository
https://github.com/Sdillon215/dillon-employee-dashboard

## Demo Instructions
To demo the app simply click the link below and use one of the two login options. Currently there is a demo login for "buyer@email.com" and "sales@email.com" the password is the same and presented in the modal when the page opens. On both the sales and buyer dashboard initial render all department's sales and purchase order history is displayed on a graph. Employees must choose a department to start an order or view current inventory details. Once a department is chosen the employee is able to start an order and the current inventory for the current department is displayed below the graph. After a purchase or sales order is submitted the current inventory is immediately updated and the graph is re-rendered to display the most up-to-date information.
 
## Deployed Heroku link
https://dillon-dash.herokuapp.com/
 
## Current Functionality & Future Development
 
### Current
This application is in its earliest stage of MVP. The first goals were to...
* Create a usable interface
* Enable login/password encryption
* Have users routed to dashboard associated with their assigned responsibilities
* Render purchase order/sales order history on page load and after department select
* After page load render current department inventory
* Ability to input sales order/purchase order and update all relevant components
* Handle state globally
 
### Future
* Finalize IndexedDB so that the application is fully functional offline
* Style updates
* Mobile responsive
* Reevaluate Database structure

## Contribution
Made by Sean