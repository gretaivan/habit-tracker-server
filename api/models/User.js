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
                const {username, passwordHashed} = userData;
                await db.query('INSERT INTO users (username, password) VALUES ($1, $2);', [username, passwordHashed]);
                res('User created');
            } catch (err) {
                rej('User could not be created');
            }
        })
    }
} 