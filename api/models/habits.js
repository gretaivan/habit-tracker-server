const db = require ('../dbConfig/init');

class Habit {
    constructor(data){
        this.id = data.id;
        this.habit_name = data.habit_name; 
        this.frequency = data.frequency;
        this.completed = data.completed || null; 
        // this.no_times_completed = data.no_times_completed; 
        this.last_comp_date = data.last_comp_date || null; 
        this.comp_dates_id = data.comp_dates_id || null;
        this.user_id = data.user_id //connects habit to specific user
    }

//all habits

static all(id){
    return new Promise (async (resolve, reject) => {
        try {
            console.log(id)
            let habitData = await db.query(`SELECT * FROM habits WHERE user_id = $1;`, [id]);
            console.log(habitData)
        
            let habits = habitData.rows.map(h => new Habit(h));
            
            resolve (habits);
        } catch (err) {
            reject('Habit not found');
        }
    });
};



//create new habit

    static async create(habit_name, frequency, user_id){
        return new Promise (async (resolve, reject) => {
            try {
                let result = await db.query(`INSERT INTO habits (habit_name, frequency, user_id) VALUES ($1, $2, $3) RETURNING *;`, [ habit_name, frequency, user_id ]);
            // I want to get back habit Data with an id, habit_name, frequency, comp_dates_id, the rest need to start at 0 
                let newHabit = new Habit(result.rows[0]);
                resolve (newHabit);
            } catch (err) {
                reject('Error creating habit');
            }
        });
    }




    static async findHabitById(id){
        return new Promise (async (resolve, reject) => {
            try {
                let habitData = await db.query(`SELECT * FROM habits WHERE id = $1;`, [ id ]);
                let habit = new Habit(habitData.rows[0]);
                resolve (habit);
            } catch (err) {
                reject('Habit not found');
            }
        })
    }


    update() {
        return new Promise (async (resolve, reject) => {
            try {
                let updatedHabitData = await db.query(`UPDATE habits 
                                                    SET completed = True, 
                                                    last_comp_date = NOW()
                                                    WHERE id = $1 RETURNING *;`, [ this.id ]);
                let updatedHabit = new Habit(updatedHabitData.rows[0]);
                resolve (updatedHabit);
            } catch (err) {
                reject('Error updating Habit');
            }
        });
    }



// streak update function
    static updateStreak(userid, habit_name) {
        return new Promise(async (res, rej) => {
            try {
            // select frequency and difference from database and store as a variable for each userid and habit // 
                const frequency = await db.query(`SELECT freqency from habits
                                                WHERE userid = ($1)
                                                AND habit_name = ($2)
                                                AND completed = True;`, [data.userid, data.habit_name])
                                                
                const difference = await db.query(`SELECT NOW() - last_comp_date AS difference
                                                FROM habits 
                                                HERE userid = ($1)
                                                AND habit_name = ($2)
                                                AND completed = True;`, [data.userid, data.habit_name])
            
            // check if the frequency is greater than difference from sql query //
            if (frequency >= difference) {

            // if frequency greater or equal to difference, found by last comp date and now, then increment by one //
                incrementData = await db.query(`UPDATE habits
                                        SET streak = streak+1
                                        WHERE userid = ($1)
                                        AND habit_name = ($2)
                                        AND completed = True;`, [data.habit_name, data.userid])
            } else {
            // if frequency greater or equal to difference, found by last comp date and now, then update to 0, restart //
                restartData = await db.query(`UPDATE habits
                                        SET streak = 0
                                        WHERE userid = ($1)
                                        AND habit_name = ($2)
                                        AND completed = FALSE;`, [data.habit_name, data.userid])
            }
            if (!incrementData.length) { 
            resolve(incrementData) }
            } catch (error) {
                rej('ERROR: streak could not be updated\n' + err);
            }
        })
    }

  


}




module.exports = Habit;


