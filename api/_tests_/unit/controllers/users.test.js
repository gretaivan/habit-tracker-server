const usersController = require('../../../controllers/users');
const User = require('../../../models/User');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({send: mockSend, json: mockJson, end: jest.fn()}));
const mockRes = {status: mockStatus};

describe('users controller', () => {
    beforeEach(() => jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('create', () => {
        it('creates a new user with a 201 status code', async () => {
            let testUser = {id: 1, username: "Clifford", password: "BigRedD0g"};
            jest.spyOn(User, 'create').mockResolvedValue(new User(testUser));
            const mockReq = {body: testUser};
            await usersController.create(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(201);
        });
    });

    describe('find', () => {
        it('returns a user\'s id with a 200 status code', async () => {
            let testUser = {id: 1, username: "Clifford", password: "BigRedD0g"};
            jest.spyOn(User, 'findByUsername').mockResolvedValue({id: testUser.id, password: testUser.password});
            const mockReq = {body: testUser};
            await usersController.find(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(testUser.id);
        })
    })
});