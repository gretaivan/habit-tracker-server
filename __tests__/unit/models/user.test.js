const User = require('../../../models/User');


let userData = {username: 'test', password: 'pass'};

describe('User model', () => {
    beforeEach(() => jest.clearAllMocks());

    beforeEach(async () => {
        await resetTestDB()
    })

    afterAll(() => jest.resetAllMocks());

    describe ('get all', () => {
        it ('resolves with user array', async () => {
            const all = await User.all;
            expect(all).toHaveLength(1);
        })
    })

    describe('create', () => {
       
        it('create generates id', async () => {
            const result = await User.create(userData);
            expect(result).toHaveProperty('id'); 
        });

        
        it('create resolves with a User instance', async () => {
            let result = await User.create(userData);
            expect(result).toBeInstanceOf(User);
        });
        describe('create rejects when passed data has wrong values', () => {
            test.each([
                [{username: null, password: 'pass'}],
                [{username: 'test'}],
                [{password: 'test3'}]
            ])('empty values %#', async (testCase) => {
                await expect(User.create(testCase)).rejects.toMatch('ERROR: user could not be created');
            });
   
            it('username already exists', async () => {
                let existingUsr = {username: 'user_test', password: 'test123'}
                await expect(User.create(existingUsr)).rejects.toEqual('ERROR: user could not be created\nError: name exists');
            });
        });            
    });
});