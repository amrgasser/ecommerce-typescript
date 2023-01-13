Connect to Docker PostGrest DB using ```docker compose up``` .

Ports can be defined in .env file as ```PORT``` .

Run  ```npm install ``` to install packages.

Port for database: 5432

Port for server: 3000

Environment variables:
- NODE_ENV
- POSTGRES_HOST
- PORT
- POSTGRES_DB
- POSTGRES_DB_TEST
- POSTGRES_USER
- POSTGRES_PASSWORD
- BCRYPT_PASSWORD
- SALT_ROUNDS
- TOKEN_SECRET

Run  ```npm install``` to install packages

DB setup
- Run ```CREATE USER postgres WITH PASSWORD 'postgres'```
- ```CREATE DATABASE ecom```  &&  ```CREATE DATABASE ecom_test```
- Run ```GRANT ALL PRIVELAGES ON DATABASE ecom TO postgres``` && ```GRANT ALL PRIVELAGES ON DATABASE ecom_test TO postgres```


Databse:
- TABLE users:
    - firstname (varchar)
    - lastname (varchar)
    - password (varchar)
- TABLE orders:
    - user_id number
    - status (varchar)
- TABLE products:
    - name (varchar)
    - price number


Endpoints:
- User:
    - GET ```/users``` fetch all users
    - Delete ```/users/:id``` delete a User
    - Post ```/users``` create a User (this also creates a default active order for the user)
        - Params: ```{firstName, lastname, password} ```
- Product:
    - GET ```/products``` fetch all products
    - Delete ```/products/:id``` fetch a certain product with id
    - Post ```/products``` create a Product using parameteres ```{name, price}```
- Order:
    - GET ```/orders``` fetch current active order for logged in user
    - Post ```/orders``` add product to current order Params {product_id, amount};



