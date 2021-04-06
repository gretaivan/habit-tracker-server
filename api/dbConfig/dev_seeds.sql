INSERT INTO users (username, password)
VALUES
('trumpetgems', 'secret123' ),
('sparrow', 'secret789')



INSERT INTO habits (habit_name, frequency, user_id, completed, last_comp_date, comp_dates_id)
VALUES
('coding', 1, 2, true, 2020-10-05, 1 )


INSERT INTO completed (completed_date, habits_id)
VALUES
(2020-10-05, 1)
