const db = require ('../dbConfig/init');

module.exports = class User {
    contructor(data){
        this.id = data.id; 
        this.username = data.username;
        this.password = data.password; 
    }
    
    static async create(userData){
        return new Promise (async (res, rej) => {
            try {
                const {username, password} = userData;
                await db.query(`INSERT INTO users (username, password) VALUES ($1, $2);`, [username, password]);
                res('User created');
            } catch (err) {
                rej('User could not be created');
            }
        })
    }

    static findByUsername(username){
        return new Promise (async (res, rej) => {
            try {
                let userPassword = await db.query(`SELECT id, password FROM users WHERE username = $1;`, [username]);
                res(userPassword.rows[0]);
            } catch (err) {
                rej('User not found');
            }
        })
    }
}