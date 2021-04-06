const User = require('../../../models/User');

const pg = require('pg');
jest.mock('pg');

const db = require('../../../dbConfig/init');

describe('User', () => {
    beforeEach(() => jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('constructor', () => {
        it('created a new User object with correct inputs', () => {
            const userData = {id: 0, username: "Casper", password: "Fr13ndlyGh0st"};
            const user = new User(userData);
            expect(user.id).toEqual(userData.id);
            expect(user.username).toEqual(userData.username);
            expect(user.password).toEqual(userData.password);
        })
    })

    describe('findByUsername', () => {
        it('resolves with a password on successful db query', async () => {
            let username = "Brian";
            jest.spyOn(db, 'query').mockResolvedValueOnce({rows: [{id:1, password: "TheDog"}]});
            const result = await User.findByUsername(username);
            expect(result).toHaveProperty('id'); 
        })

        it('rejects with an error on unsuccessful db query', async () => {
            let username = "Stewie";
            jest.spyOn(db, 'query').mockResolvedValueOnce(undefined);
            await User.findByUsername(username).catch(e => {
                expect(e).toEqual("User not found");
            });
        });
    })
})