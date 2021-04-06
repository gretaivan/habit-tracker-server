const Habit = require('../../../models/Habit')



const db = require('../../../dbConfig/init');


const pg = require('pg');
jest.mock('pg');

describe('Habit', () => {
    beforeEach(() => jest.clearAllMocks())
    
    afterAll(() => jest.resetAllMocks())

    describe('create', () => {
        test('it resolves with habit on successful db query', async () => {
            let habitData = { habit_name: "Sleep", frequency: 4, user_id:3}
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [{...habitData, id: 1}]});
            const result = await Habit.create(habitData);
            expect(result).toHaveProperty('id')
        })
    });



})