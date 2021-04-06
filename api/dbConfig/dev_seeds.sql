INSERT INTO users (username, password, habit_id)
VALUES
('trumpetgems', 'secret123', 'habit1' ),
('sparrow', 'secret789', 'habit2' )



INSERT INTO habit_type (habit_id, user, frequency, completed_today, num_times_comp, last_comp)
VALUES
('habit1', 'coding', 'everyday', 'true', 5, 2020-10-05 )


INSERT INTO comp_dates (last_comp)
VALUES
(2020-10-05, 2020-11-05)