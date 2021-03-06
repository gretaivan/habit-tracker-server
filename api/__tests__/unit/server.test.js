const request = require("supertest");
let server = require('../../server');
const User = require('../../models/User');

let port = 5000; 

describe('API server test', () => {

    beforeAll(() => {   
        server = server.listen(port, () => console.log(`[TEST SERVER]: running on port ${port}`));
    });

    beforeEach(async () => {
        await resetTestDB()
    })

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

    describe('User authentication', () => {
        
        describe('register', () => {
            it('responds in json format with username and code 201', (done) => {
                let testNewUser = {username: 'newuser', password: 'testing'};

                request(server)
                    .post('/auth/register')
                    .send(testNewUser)
                    .expect(201)
                    .expect('Content-Type', /json/, done);

            });
            it('responds in json format with error and code 500', (done) => {
                let testNewUser = {username: 'newuser', password: 'testing'};
                jest.spyOn(User, 'create').mockRejectedValue('ERROR: user could not be created')
                request(server)
                    .post('/auth/register')
                    .send(testNewUser)
                    .expect(500)
                    .expect('Content-Type', /json/, done);
            })
        });
    });
});