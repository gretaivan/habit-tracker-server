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
        this.streak = data.streak;
    }

//all habits

static all(id){
    return new Promise (async (resolve, reject) => {
        try {
            let habitData = await db.query(`SELECT * FROM habits WHERE user_id = $1;`, [id]);
        
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
                console.log("UPDATING THE Completed: ")
                
                let updatedHabitData = await db.query(`UPDATE habits 
                                                    SET completed = True, 
                                                    last_comp_date = NOW()
                                                    WHERE id = $1 RETURNING *;`, [ this.id ]);
                let updatedHabit = new Habit(updatedHabitData.rows[0]);

                console.log(updatedHabit)
                resolve (updatedHabit);
            } catch (err) {
                reject('Error updating Habit');
            }
        });
    }



// streak update function
    static updateStreak(user_id, habit_name) {
        return new Promise(async (resolve, reject) => {
            try {

                console.log("UPDATING STREAK")
                
            // select frequency and difference from database and store as a variable for each userid and habit // 
                const frequency = await db.query(`SELECT frequency from habits
                                                WHERE user_id = $1
                                                AND habit_name = $2`, [user_id, habit_name])
                                                
                const difference = await db.query(`SELECT (NOW() - last_comp_date) AS difference
                                                FROM habits 
                                                WHERE user_id = ($1)
                                                AND habit_name = ($2)`, [user_id, habit_name])


            // check if the frequency is greater than difference from sql query //
                let incrementedData;
                let restartData;

                let differenceResult = difference.rows[0].difference === null ? 0 : difference.rows[0].difference.days

                if (frequency.rows[0].frequency >= (differenceResult || 0)) {

                // if frequency greater or equal to difference, found by last comp date and now, then increment by one //
                    incrementedData = await db.query(`UPDATE habits
                                            SET streak = streak + 1
                                            WHERE user_id = ($1)
                                            AND habit_name = ($2)
                                            RETURNING streak;`, [ user_id, habit_name])
                    //resolve
                    resolve(incrementedData.rows[0])
                } else {
                // if frequency greater or equal to difference, found by last comp date and now, then update to 0, restart //
                    restartData = await db.query(`UPDATE habits
                                            SET streak = 0
                                            WHERE user_id = ($1)
                                            AND habit_name = ($2)
                                            RETURNING *;`, [user_id, habit_name])

                    console.log(restartData.rows[0])
                    
                //resolve
                    resolve(restartData.rows[0]) 
                } 
            } catch (error) {
                reject('ERROR: streak could not be updated');
            }
        })
    }

    static resetCompleted(user_id, habit_name) {
        return new Promise(async (resolve, reject) => {
            try {
                let data = await db.query(`SELECT frequency, (NOW() - last_comp_date) AS difference from habits
                WHERE user_id = $1
                AND habit_name = $2;`, [user_id, habit_name])
                let updateData;
                let differenceResult = data.rows[0].difference === null ? 0 : data.rows[0].difference.days

                if (data.rows[0].frequency > (differenceResult || 0)) {
                    updateData = await db.query(`SELECT completed FROM habits
                                            WHERE user_id = ($1)
                                            AND habit_name = ($2);`, [ user_id, habit_name])
                } else {
                    updateData = await db.query(`UPDATE habits
                                            SET completed = false
                                            WHERE user_id = ($1)
                                            AND habit_name = ($2)
                                            RETURNING completed;`, [ user_id, habit_name])
                }
                resolve(updateData.rows[0].completed)
            }
            catch (err) {
                reject('ERROR: completed could not be updated');
            }
        })
    }

  /// completed handling as it is independent from true


}




module.exports = Habit;


