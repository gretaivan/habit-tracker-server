DROP TABLE IF EXISTS habit_type;
DROP TABLE IF EXISTS comp_dates;


CREATE TABLE habit_type (
    habit_id varchar REFERENCES users(habit_id),
    userId varchar(25) REFERENCES users(id),
    frequency varchar(30),
    completed_today boolean,
    num_times_comp int,
    last_comp date
);

CREATE TABLE comp_dates (
    last_comp date REFERENCES habit_type(last_comp)
)


