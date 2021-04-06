const habitController = require('../../../controllers/habit') // I want to test this

const Habit = require('../../../models/habit') // Need to mock this

jest.mock(Habit)


//I need to mock the habit.create 

describe('create', () => {
    test('it returns a new book with a 201 status code', async () => {
        let testBook = {
            id: 2, title: 'Test Book', 
            yearOfPublication: 2021,
            abstract: 'testing', author_name: 'Bob', author_id: 1
        }
        jest.spyOn(Book, 'create')
            .mockResolvedValue(new Book(testBook));
            
        const mockReq = { body: testBook }
        await booksController.create(mockReq, mockRes);
        expect(mockStatus).toHaveBeenCalledWith(201);
        expect(mockJson).toHaveBeenCalledWith(new Book(testBook));
    })
});