const db = require ('../dbConfig/init');

class Habit {
    constructor(data){
        this.id = data.id;
        this.habit_name = data.habit_name; 
        this.frequency = data.frequency;
        this.completed = data.completed; 
        this.no_times_completed = data.no_times_completed; 
        this.last_comp = data.last_comp; 
        this.comp_dates_id = data.comp_dates_id;
        this.user_id = data.user_id //connects habit to specific user
    }


//create new habit

    static async create(habitData){
        return new Promise (async (resolve, reject) => {
            try {
            
               let {habit_name, frequency, user_id} = habitData
                let result = await db.query(`INSERT INTO habits (habit_name, frequency, user_id) VALUES ($1, $2, $3) RETURNING *;`, [ habit_name, frequency, user_id ]);
                // I want to get back habit Data with an id, habit_name, frequency, comp_dates_id, the rest need to start at 0 
                console.log(result.rows[0])
                let newHabit = new Habit(result.rows[0]);
                console.log(newHabit)
                resolve (newHabit);
            } catch (err) {
                console.log(err)
                reject('Error creating habit');
            }
        });
    }

  
} 



module.exports = Habit;


