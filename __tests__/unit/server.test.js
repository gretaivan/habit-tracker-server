// const request = require("supertest");
let server = require('../../server');

let port = 5000; 

describe('API server test', () => {

    beforeAll(() => {   
        server = server.listen(port, () => console.log(`[TEST SERVER]: running on port ${port}`));
    });

    afterAll(done => {
        server.close(done);
    });

    describe('Route "/" ', () => { 
        it('should GET with status code 200', done => { 
            request(server)
                .get('/')
                .expect(200, done) 
        });

        it('should respond with text content', done => { 
            request(server)
                .get('/')
                .expect('Content-Type', /text\/html/, done)
        });
    });  
});