const habitsController = require('../../../controllers/habits') // I want to test this

const Habit = require('../../../models/habits') // Need to mock this


const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }))
const mockRes = { status: mockStatus }



describe('all', () => {
    test('it returns habits with a 200 status code', async () => {
        jest.spyOn(Habit, 'all', 'get')
             .mockResolvedValue(['habit1', 'habit2']);
        await habitsController.all(null, mockRes);
        expect(mockStatus).toHaveBeenCalledWith(200);
        expect(mockJson).toHaveBeenCalledWith(['habit1', 'habit2']);
    })
});



describe('create', () => {
    test('it returns a new habit with a 201 status code', async () => {

        let testHabit = {
             
                habit_name: 'Sleep',
                frequency: 4,
                user_id: 3
              }
        jest.spyOn(Habit, 'create')
              .mockResolvedValue(new Habit(testHabit))

        const mockReq = { body: testHabit}

        await habitsController.create(mockReq, mockRes)
        expect(mockStatus).toHaveBeenCalledWith(201);
        expect(mockJson).toHaveBeenCalledWith(new Habit(testHabit));
        })




    })






