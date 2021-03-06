DROP TABLE IF EXISTS habits;

CREATE TABLE habits (
    id serial PRIMARY KEY,
    habit_name VARCHAR(500) NOT NULL,
    frequency INT NOT NULL,
    user_id INT NOT NULL,
    completed BOOLEAN,
    last_comp_date DATE,
    streak INT DEFAULT 0
    );


DROP TABLE IF EXISTS completed;

CREATE TABLE completed (
    id serial PRIMARY KEY,
    completed_date date NOT NULL,
    habits_id int NOT NULL
);
