CREATE TABLE orders_products (
    id SERIAL PRIMARY KEY, 
    order_id int references orders(id), 
    product_id int references products(id), 
    amount int
);