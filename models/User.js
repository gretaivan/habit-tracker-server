const db = require ('../dbConfig/init');

class User {
    constructor(data){
        this.id = data.id; 
        this.username = data.username;
        this.password = data.password; 
    }
    //TODO: get all users
    static get all(){
        return new Promise(async(res, rej) => {
            try{
                let result = await db.query(`SELECT * from users;`)
                const users = result.rows.map(user => new User(user));
                res(users); 
            } catch(err){
                rej('ERROR: user could not get the user record');
            }
        });
    }
    // TODO: create
    static create(data){

        return new Promise(async (res, rej) => {
            try{
                let userResult = await db.query(`INSERT INTO users (username, password)
                                            VALUES($1, $2) RETURNING *;`, [data.username, data.password]);                  
                let user = new User(userResult.rows[0]);
                console.log(user);
                res(user); 
            } catch(err) {
                rej('ERROR: user could not be created');
            }
        });
    };

    
  
} 

module.exports = User;