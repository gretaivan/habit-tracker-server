const Habit = require('../../../models/habits')

const db = require('../../../dbConfig/init');

const pg = require('pg');
jest.mock('pg');

describe('Habit', () => {
    beforeEach(() => jest.clearAllMocks())
    
    afterAll(() => jest.resetAllMocks())

describe('all', () => {
        test('it resolves with habits on successful db query', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [{}, {}, {}, {}]});
            const all = await Habit.all(2);
            expect(all).toHaveLength(4)
        })

        test('it resolves with a habit with a property of id on a successful db query', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [{}]});
            const all = await Habit.all(2);
            expect(all[0]).toHaveProperty('id')
 
    });
})

    describe('create', () => {
        test('it resolves with habit on successful db query', async () => {
            let habitData = { habit_name: "Sleep", frequency: 4, user_id:3}
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [{...habitData, id: 1}]});
            const result = await Habit.create(habitData);
            expect(result).toHaveProperty('id')
        })
    });

    describe('findHabitById', () => {
        test('it returns all fields from the database with a successful query', async () => {
            let habitData = {id: 2, habit_name: "Sleep", frequency: 4, user_id:3};
            jest.spyOn(db, 'query').mockResolvedValueOnce({rows: [habitData]});
            const result = await Habit.findHabitById(habitData.id);
            expect(result.id).toEqual(habitData.id);
        });

        test('it returns an error on unsuccessful database query', async () => {
            let habitData = {id: 2, habit_name: "Sleep", frequency: 4, user_id:3};
            jest.spyOn(db, 'query').mockResolvedValueOnce(undefined);
            await Habit.findHabitById(habitData.id).catch(e => {
                expect(e).toEqual('Habit not found');
            });
        })
    });

    describe('update', () => {
        test('it updates the habit, makes completed true and sets last comp date to now', async () => {
            let testData = {id: 1, completed: true, last_comp_date: "Now()"}
            jest.spyOn(db, 'query').mockResolvedValueOnce({rows: [testData]});
            const habit = new Habit(testData);
            const result = await habit.update();
            expect(result.id).toEqual(testData.id);
            expect(result.completed).toEqual(testData.completed);
            expect(result.last_comp_date).toEqual(testData.last_comp_date);
        });
        
        test('it throws an error on unsuccessful db query', async () => {
            let testData = {id: 1, completed: true, last_comp_date: "Now()"}
            jest.spyOn(db, 'query').mockResolvedValueOnce(undefined);
            const habit = new Habit(testData);
            await habit.update().catch(e => {
                expect(e).toEqual('Error updating Habit');
            })
        });
    })

    describe('updateStreak', () => {
        test('it increments the streak value if date is within limit', async () =>{
            let habitData = { habit_name: "Sleep", frequency: 1, user_id:3, completed: true, streak: 1}
            let updatedStreak = habitData.streak + 1;
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [{frequency: 1}]})
                .mockResolvedValueOnce({rows: [{difference: {days: 1}}]})
                .mockResolvedValueOnce({rows: [{streak: updatedStreak}]})
            const result = await Habit.updateStreak(habitData.user_id, habitData.habit_name);
            expect(result.streak).toEqual(updatedStreak);
        })
        
        test('it sets streak value to 0 if date is out of limit', async () =>{
            let habitData = { habit_name: "Sleep", frequency: 1, user_id:3, completed: true, streak: 1}
            let updatedStreak = 0;
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [{frequency: 1}]})
                .mockResolvedValueOnce({rows: [{difference: {days: 2}}]})
                .mockResolvedValueOnce({rows: [{streak: updatedStreak}]})
            const result = await Habit.updateStreak(habitData.user_id, habitData.habit_name);
            expect(result.streak).toEqual(updatedStreak);
        })

        test('rejects with an error on unsuccessful db query', async () => {
            let habitData = { habit_name: "Sleep", frequency: 1, user_id:3, completed: true, streak: 1}
            let updatedStreak = 0;
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce(undefined)
                .mockResolvedValueOnce(undefined)
            await Habit.updateStreak(habitData.user_id, habitData.habit_name).catch(e => {
                expect(e).toEqual('ERROR: streak could not be updated');
            })
        })
    })

    describe('resetCompleted', () => {
        test('completed sets to false after the limit is reached', async () => {
            let habitData = { habit_name: "Sleep", frequency: 1, user_id:3, completed: true, streak: 1}
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [{frequency: 1, difference: {days: 1}}]})
                .mockResolvedValueOnce({rows: [{completed: false}]})
            const result = await Habit.resetCompleted(habitData.user_id, habitData.habit_name);
            expect(result).toEqual(false);
        })

        test('completed does not change after the limit is reached', async () => {
            let habitData = { habit_name: "Sleep", frequency: 1, user_id:3, completed: true, streak: 1}
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [{frequency: 1, difference: {days: 0}}]})
                .mockResolvedValueOnce({rows: [{completed: habitData.completed}]})
            const result = await Habit.resetCompleted(habitData.user_id, habitData.habit_name);
            expect(result).toEqual(habitData.completed);
        })

        test('rejects with an error on unsuccessful db query', async () => {
            let habitData = { habit_name: "Sleep", frequency: 1, user_id:3, completed: true, streak: 1}
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce(undefined)
            await Habit.resetCompleted(habitData.user_id, habitData.habit_name).catch(e => {
                expect(e).toEqual('ERROR: completed could not be updated');
            })
        })
    })

})


