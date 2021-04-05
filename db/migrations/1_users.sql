DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id serial PRIMARY KEY,
    username VARCHAR(25) NOT NULL,
    password varchar(30) NOT NULL; 
    habits_id serial FOREIGN KEY,
);
