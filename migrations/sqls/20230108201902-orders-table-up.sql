CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id int references users(id),
    status VARCHAR(100),
    total_amount int
);
