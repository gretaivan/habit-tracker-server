const bcrypt = require('bcrypt');

describe('user endpoints', () => {
    let api;
    beforeEach(async () => {
        await resetTestDB();
    });

    beforeAll(async () =>{
        api = app.listen(5000, () => console.log('Test server running on port 5000'));
    });

    afterAll(done => {
        console.log('Gracefully stopping test server');
        api.close(done);
    });

    it('should find a user given a valid username and password and return the id', async () => {
        jest.spyOn(bcrypt, 'compare').mockResolvedValue(new Promise((res, rej) => {
            res(true);
        }));
        const res = await global.request(api).post('/users/login').send({username: 'user_test', password: "test123"});
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(1);
    });

    it('should not find a user given an invalid password', async () => {
        jest.spyOn(bcrypt, 'compare').mockResolvedValue(new Promise((res, rej) => {
            res(false);
        }));
        const res = await global.request(api).post('/users/login').send({username: 'user_test', passowrd: "Test123"});
        expect(res.statusCode).toEqual(403);
        expect(res.body).toHaveProperty('err');
    })

    it('should not find a user given an invalid username', async () => {
        const res = await global.request(api).post('/users/login').send({username: "userTest", password: "test123"});
        expect(res.statusCode).toEqual(403);
        expect(res.body).toHaveProperty('err');
    });
})