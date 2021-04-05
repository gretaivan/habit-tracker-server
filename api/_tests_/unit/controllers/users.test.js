const usersController = require('../../../controllers/users');
const User = require('../../../models/User');
const bcrypt = require('bcrypt');

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
        
        it('fails to create a new user with a 500 status code', async () => {
            let testUser = {id: 1, username: "Clifford", password: "BigRedD0g"};
            jest.spyOn(User, 'create').mockResolvedValue(undefined);
            const mockReq = {body: testUser};
            await usersController.create(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(500);
        });
    });

    describe('find', () => {
        it('returns a user\'s id with a 200 status code', async () => {
            let testUser = {id: 1, username: "Clifford", password: "BigRedD0g"};
            jest.spyOn(User, 'findByUsername').mockResolvedValue({id: testUser.id, password: testUser.password});
            jest.spyOn(bcrypt, 'compare').mockResolvedValue(new Promise((res, rej) => {
                res(true);
            }));
            const mockReq = {body: testUser};
            await usersController.find(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(testUser.id);
        })

        it('returns an error and a 403 status code with incorrect username', async () => {
            let testUser = {id: 1, username: "CliffordDog", password: "BigRedD0g"};
            jest.spyOn(User, 'findByUsername').mockResolvedValue(undefined);
            const mockReq = {body: testUser};
            await usersController.find(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(403);
        })

        it('returns an error and a 403 status code with an incorrect password', async () => {
            let testUser = {id: 1, username: "Clifford", password: "BigRedDog"};
            jest.spyOn(User, 'findByUsername').mockResolvedValue({id: testUser.id, password: testUser.password});
            jest.spyOn(bcrypt, 'compare').mockResolvedValue(new Promise((res, rej) => {
                res(false);
            }));
            const mockReq = {body: testUser};
            await usersController.find(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(403);
        })
    })
});