// const { TestScheduler } = require('@jest/core');
const User = require('../../../models/User');
// const { unsubscribe } = require('../../../server');
const db = require('../../../dbConfig/init');
const e = require('express');

let userData = {username: 'test', password: 'pass'};

describe('User model', () => {
    beforeEach(() => jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('create', ()=> {
        
        // it('takes in data object and creates a User instance', () => {
        //     expect.toBeInstanceOf(User); 
        // });
       
        it('creates user and generates id', async () => {
            
            jest.spyOn(db, 'query').mockResolvedValueOnce({rows: [ { ...userData, id: 1}] });
            const result = await User.create(userData);
            expect(result).toHaveProperty('id'); 
        });

        
        it('creates user and returns a user instance', async () => {
        jest.spyOn(db, 'query').mockResolvedValueOnce({rows: [ { ...userData, id: 1}] });
        let result = await User.create(userData);
        expect(result).toBeInstanceOf(User);
        });

        test.each([
            [{username: null, password: 'pass'}],
            [{username: 'test'}],
            [{password: 'test3'}]
        ])('rejects empty values in the user test case %#', async (testCase) => {
            
            // let result = await User.create(testCase);
            await expect(User.create(testCase)).rejects.toEqual('ERROR: user could not be created');
        });

    })
});