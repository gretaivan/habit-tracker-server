const db = require ('../dbConfig/init');

class User {
    contructor(data){
        this.id = data.id; 
        this.username = data.username;
        this.password = data.password; 
    }

  
} 