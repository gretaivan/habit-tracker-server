

class Habit {
    contructor(data){
        this.id = data.id;
        this.habit_name = data.habit_name; 
        this.frequency = data.frequency;
        this.completed = data.completed; //what is this for?
        this.no_times_completed = data.no_times_completed;  //do we need this?
        this.last_comp = data.last_comp; // do we need this? can we not just get it from comp_dates table 
        this.comp_dates_id = data.comp_dates_id;
        this.user_id = data.user_id //connects habit to specific user
    }


//create new habit

    static create(habit_name, frequency, user_id){
        return new Promise (async (resolve, reject) => {
            try {
                let habitData = await db.query(`INSERT INTO habits (habit_name, frequency) VALUES ($1, $2, $3) RETURNING *;`, [ habit_name, frequency, user_id ]);
                // I want to get back habit Data with an id, habit_name, frequency, comp_dates_id, the rest need to start at 0 
                let newHabit = new Habit(habitData.rows[0]);
                resolve (newHabit);
            } catch (err) {
                reject('Error creating habit');
            }
        });
    }

  
} 



module.exports = Habit;


