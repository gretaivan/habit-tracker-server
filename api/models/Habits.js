const db = require ('../dbConfig/init');

class Habit {
    constructor(data){
        this.frequency = data.frequency
        this.completed_today = data.completed_today
        this.num_times_comp = data.num_times_comp
        this.last_comp_date = data.last_comp_date
    }


//get all habits

//create habit

//findbyId

}
module.exports = Habit;