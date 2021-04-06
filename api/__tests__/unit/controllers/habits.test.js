const habitsController = require('../../../controllers/habits') // I want to test this

const Habit = require('../../../models/habits') // Need to mock this


const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }))
const mockRes = { status: mockStatus }



//I need to mock the habit.create 

// describe('create', () => {
//     test('it returns a new book with a 201 status code', async () => {
//         let testBook = {
//             id: 2, title: 'Test Book', 
//             yearOfPublication: 2021,
//             abstract: 'testing', author_name: 'Bob', author_id: 1
//         }
//         jest.spyOn(Book, 'create')
//             .mockResolvedValue(new Book(testBook));
            
//         const mockReq = { body: testBook }
//         await booksController.create(mockReq, mockRes);
//         expect(mockStatus).toHaveBeenCalledWith(201);
//         expect(mockJson).toHaveBeenCalledWith(new Book(testBook));
//     })
// });

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





