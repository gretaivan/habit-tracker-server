const { Pool } = require('pg');
const fs = require('fs'); 

const request = require('supertest'); 
const apiServer = require('../../server'); 

const reset = fs.readFileSync(__dirname + '/reset.sql').toString();

//reset between tests
const resetTestDB = () =>  {
    return new Promise(async (res, rej) => {
        try {
            const db = new Pool(); 
            await db.query(reset);
            res('[TEST SERVER]: DB has been reset');
        } catch (err) {
            rej('[TEST server]: could not reset DB'); 
        }
    })
}

global.request = request;
global.app = apiServer;
global.resetTestDB = resetTestDB;