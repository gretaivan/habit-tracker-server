INSERT INTO users (username, password)
VALUES
('trumpetgems', 'secret123' ),
('sparrow', 'secret789');



INSERT INTO habits (habit_name, frequency, user_id, completed, last_comp_date)
VALUES
('coding', 1, 2, true, '2020-10-05'),
('sleeping', 1, 3, true, '2021-04-06'),
('sleeping', 7, 1, true, '2021-04-01'),
('water', 3, 4, true, '2021-04-07'),
('coding', 1, 1, true, '2021-04-07');

INSERT INTO completed (completed_date, habits_id)
VALUES
('2020-10-05', 1);

