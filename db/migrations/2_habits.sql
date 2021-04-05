DROP TABLE IF EXISTS habits;
DROP TABLE IF EXISTS habit_1;
DROP TABLE IF EXISTS habit_2;
DROP TABLE IF EXISTS habit_3;


CREATE TABLE habits (
    habits_id int REFERENCES users(habit_id),
    habit_1 varchar(20),
    habit_2 varchar(20),
    habit_3 varchar(20)
);

CREATE TABLE habit_1 (
    habits_id int REFERENCES users(habit_id),
    habit_1 varchar REFERENCES habits(habit_1)
    frequency varchar(30),
    completed boolean,
    num_times_completed int,
    last_comp date,
    streak int
);

CREATE TABLE habit_2 (
    habits_id int REFERENCES users(habit_id),
    habit_2 varchar REFERENCES habits(habit_2)
    frequency varchar(30),
    completed boolean,
    num_times_completed int,
    last_comp date,
    streak int
);

CREATE TABLE habit_3 (
    habits_id int REFERENCES users(habit_id),
    habit_3 varchar REFERENCES habits(habit_3)
    frequency varchar(30),
    completed boolean,
    num_times_completed int,
    last_comp date,
    streak int
);


