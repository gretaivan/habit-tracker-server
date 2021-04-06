DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id serial PRIMARY KEY,
    username VARCHAR(25) NOT NULL,
    password varchar(100) NOT NULL
);