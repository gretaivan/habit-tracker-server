const db = require ('../dbConfig/init');

module.exports = class User {
    constructor(data){
        this.id = data.id; 
        this.username = data.username;
        this.password = data.password; 
    }
    
    static async create(userData){
        return new Promise (async (res, rej) => {
            try {
                const {username, password} = userData;
                let user = await db.query(`INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id;`, [username, password]);
                res(user.rows[0]);
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