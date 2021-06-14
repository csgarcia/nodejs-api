const userService = require('../../services/users/users.services');

describe('Users', () => {

    describe('Create', () => {
        it('should return success false if user, password params are missing', async() => {
            const mockUser = "";
            const mockPassword = "";
            const Users = jest.fn();
            userService({ Users });
            const response = await userService.create(mockUser, mockPassword);
            expect(response.success).toEqual(false);
            expect(response.code).toEqual(400);
        });
        it('should return success false if user already exists in db', async() => {
            const mockUser = "existingUser";
            const mockPassword = "somePassword";
            const Users = {
                create: jest.fn().mockImplementation(() => {
                    throw new Error(`E11000 duplicate key error collection: nodejs_api.users index: user_1 dup key: { user: existingUser }`);
                })
            };
            userService({ Users });
            const response = await userService.create(mockUser, mockPassword);
            expect(response.success).toEqual(false);
            expect(response.code).toEqual(0);
        });
        it('should return success false if function expect some error', async() => {
            const mockUser = "existingUser";
            const mockPassword = "somePassword";
            const Users = {
                findOne: jest.fn().mockImplementation(() => {
                    throw new Error("Error in module");
                })
            }
            userService({ Users });
            const response = await userService.create(mockUser, mockPassword);
            expect(response.success).toEqual(false);
            expect(response.code).toEqual(0);

        });
        it('should return success true if user is created correctly', async() => {
            const mockUser = "newUser";
            const mockPassword = "somePassword";
            const Users = {
                findOne: jest.fn().mockResolvedValue(null),
                create: jest.fn().mockResolvedValue({
                    user: 'newUser'
                })
            };
            userService({ Users });
            const response = await userService.create(mockUser, mockPassword);
            expect(response.success).toEqual(true);
        });
    });

    describe('Login', () => {
        it('should return success false if user or password are missing', async() => {
            // define mocks
            const mockUser = "";
            const mockPassword = "";
            const Users = jest.fn();

            // inject mock dependencies
            userService({ Users });

            // exec
            const response = await userService.login(mockUser, mockPassword);
            expect(response.success).toEqual(false);
            expect(response.code).toEqual(400);
        });

        it('should return success false if credentials are invalid', async() => {
            const mockUser = "WrongUserName";
            const mockPassword = "WrongPassword";
            const Users = {
                findOne: jest.fn().mockResolvedValue(null)
            }
            userService({ Users });
            const response = await userService.login(mockUser, mockPassword);
            expect(response.success).toEqual(false);
            expect(response.code).toEqual(404);
        });

        it('should return success false credentials are valid but user is inactive', async() => {
            const mockUser = "correctUsername";
            const mockPassword = "correctPassword";
            const Users = {
                findOne: jest.fn().mockResolvedValue({
                    user: 'mock',
                    password: 'mock-pwd',
                    name: 'Mock Carlos',
                    last_name: 'Mock García',
                    active: false
                })
            }
            userService({ Users });
            const response = await userService.login(mockUser, mockPassword);
            expect(response.success).toEqual(false);
            expect(response.code).toEqual(401);
        });

        it('should return success false if function expect some error', async() => {
            const mockUser = "WrongUserName";
            const mockPassword = "WrongPassword";
            const Users = {
                findOne: jest.fn().mockImplementation(() => {
                    throw new Error("Error in module");
                })
            }
            userService({ Users });
            const response = await userService.login(mockUser, mockPassword);
            expect(response.success).toEqual(false);
            expect(response.code).toEqual(0);
        });

        it('should return success true if credentials are valid and user is active', async() => {
            const mockUser = "correctUsername";
            const mockPassword = "correctPassword";
            const Users = {
                findOne: jest.fn().mockResolvedValue({
                    user: 'mock',
                    password: 'mock-pwd',
                    name: 'Mock Carlos',
                    last_name: 'Mock García',
                    active: true
                })
            }
            userService({ Users });
            const response = await userService.login(mockUser, mockPassword);
            expect(response.success).toEqual(true);
            expect(response.data).toHaveProperty('name');
            expect(response.data).toHaveProperty('token');
        });
    });
});