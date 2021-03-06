const habitsController = require('../../../controllers/habits') // I want to test this

const Habit = require('../../../models/habits') // Need to mock this


const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }))
const mockRes = { status: mockStatus }
const mockReq = {params: {id: 1} };

describe('Habit Controller', () => {
    beforeEach(() => jest.clearAllMocks())
    
    afterAll(() => jest.resetAllMocks())

    describe('all', () => {
        test('it returns habits with a 200 status code', async () => {
            jest.spyOn(Habit, 'all')
                .mockResolvedValue(['habit1', 'habit2']);
            await habitsController.all(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(['habit1', 'habit2']);
        })
        
        test('returns error and 500 status code with invalid id', async () => {
            let userId = 1;
            jest.spyOn(Habit, 'all').mockRejectedValue("Habit not found");
            const mockReq = {params: {id: userId}};
            await habitsController.all(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(500);
            expect(mockJson).toHaveBeenCalledWith({err: "Habit not found"});
        })
    });

    describe('create', () => {
        test('it returns a new habit with a 201 status code', async () => {

            let testHabit = {                
                    habit_name: 'Sleep',
                    frequency: 4,
                    user_id: 3
                }
            jest.spyOn(Habit, 'create').mockResolvedValue(new Habit(testHabit))

            const mockReq = { body: testHabit}

            await habitsController.create(mockReq, mockRes)
            expect(mockStatus).toHaveBeenCalledWith(201);
            expect(mockJson).toHaveBeenCalledWith(new Habit(testHabit));
        });
        
        test('it returns an error with a 404 status code with invalid id', async () => {
            let testHabit = {
                
                    habit_name: 'Sleep',
                    frequency: 4,
                    user_id: 3
                }
            jest.spyOn(Habit, 'create').mockRejectedValue("Error creating Habit")

            const mockReq = { body: testHabit}

            await habitsController.create(mockReq, mockRes)
            expect(mockStatus).toHaveBeenCalledWith(404);
            expect(mockJson).toHaveBeenCalledWith({err: "Error creating Habit"});
        })
    })

    describe('findHabitById', () => {
        test('return all data and 200 status code for a single habit based on id', async () => {
            let habitId = 1;
            let testHabit = {
                habit_name: 'coding',
                frequency: 1,
                user_id: 1
            };

            jest.spyOn(Habit, 'findHabitById').mockResolvedValue(new Habit(testHabit));

            const mockReq = {params: {id: habitId}};

            await habitsController.findHabitById(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(new Habit(testHabit));
        });

        test('returns an error and 500 status code when unsuccessful', async () => {
            jest.spyOn(Habit, 'findHabitById').mockRejectedValue('Habit not found');

            const mockReq = {params: {id: 1}};

            await habitsController.findHabitById(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(500);
        })
    })

    describe('updateHabit', () => {
        test('returns updated habit and 200 status code with valid id', async () => {
            let habitId = 1;
            let testData = {user_id: 1, habit_name: 'coding'}
            jest.spyOn(Habit, 'findHabitById').mockResolvedValue({update: function() {return testData}});
            jest.spyOn(Habit, 'updateStreak').mockResolvedValue({streak: 0});
            const mockReq = {params: {id: habitId}};
            await habitsController.updateHabit(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(testData);
        })
        
        test('returns error and 200 status code with invalid id', async () => {
            let habitId = 1;
            testData = {user_id: 1, habit_name: 'coding'}
            jest.spyOn(Habit, 'findHabitById').mockRejectedValue("Habit not found");
            const mockReq = {params: {id: habitId}};
            await habitsController.updateHabit(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(500);
            expect(mockJson).toHaveBeenCalledWith({err: "Habit not found"});
        })
    })

    describe('updateCompleted', () => {
        test('returns updated habit and 200 status code with valid id', async () => {
            jest.spyOn(Habit, 'findHabitById').mockResolvedValue({});
            jest.spyOn(Habit, 'resetCompleted').mockResolvedValue(true);
            const mockReq = {params: {id: 1}};
            await habitsController.updateCompleted(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith({completed: true});
        })
        
        test('returns error and 200 status code with invalid id', async () => {
            jest.spyOn(Habit, 'findHabitById').mockRejectedValue("Habit not found");
            const mockReq = {params: {id: 145}};
            await habitsController.updateCompleted(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(500);
            expect(mockJson).toHaveBeenCalledWith({err: "Habit not found"});
        })
    })
})
