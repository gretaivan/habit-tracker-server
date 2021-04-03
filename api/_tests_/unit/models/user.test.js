const User = require('../../../models/User');

const pg = require('pg');
jest.mock('pg');

const db = require('../../../dbConfig/init');

describe('User', () => {
    beforeEach(() => jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('create', () => {
        it('resolves with an id on successful db query', async () => {
            let userData = {username: "Steve", password: "the M0nkey"};
            jest.spyOn(db, 'query').mockResolvedValueOnce({rows: [{id:1}]});
            const result = await User.create(userData);
            expect(result).toHaveProperty('id');
        });
    });

    describe('findByUsername', () => {
        it('resolves with a password on successful db query', async () => {
            let username = "Brian";
            jest.spyOn(db, 'query').mockResolvedValueOnce({rows: [{id:1, password: "TheDog"}]});
            const result = await User.findByUsername(username);
            expect(result).toHaveProperty('id'); 
        })
    })
})