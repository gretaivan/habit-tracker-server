const db = require ('../dbConfig/init');

module.exports = class User {
    constructor(data){
        this.id = data.id; 
        this.username = data.username;
        this.password = data.password; 
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