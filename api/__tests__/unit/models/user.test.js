const { TestScheduler } = require('@jest/core');
const User = require('../../../models/User');


describe('User model', () => {
    describe('create', ()=> {
        it('takes in data object and creates a User instance', () => {
            expect.toBeInstanceOf(User); 
        });
        it('creates user and generates id', () => {
            expect.toHaveProperty('id'); 
        });
        test.each([
            [{username: 'test', password: 'pass'}, User],
            [{ username: 'test'}, Error]
          ])('create with test case %#', (testData, expected) => {
            expect(testData).toBeInstanceOf(expected);
          });
    })
});