# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index    GET ```localhost:3000/products```
- Show      GET ```localhost:3000/products/:id```
- Create [token required] POST ```localhost:3000/products``` with requestbody {name: "name", price: "price"}

#### Users
- Index [token required] GET ```localhost:3000/users```
- Show [token required] GET ```localhost:3000/user/:id```
- Create N[token required] GET ```localhost:3000/users```

#### Orders
- Current Order by user (args: user id)[token required] GET ```localhost:3000/orders```
- Add Item to order POST ```localhost:3000/orders``` Request Body: {product_id, amount}
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

