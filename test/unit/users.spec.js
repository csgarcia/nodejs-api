const userService = require('../../services/users/users.services');

describe('Users', () => {


    describe('Create', () => {
        it('should return success false if user, password params are missing', async() => {
            const mockUser = "";
            const mockPassword = "";
            const Users = jest.fn();
            const encrypt = jest.fn();
            userService({ Users, encrypt });
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
            const encrypt = {
                encryptValue: jest.fn().mockResolvedValue("SomeEncryptedPassword")
            };
            userService({ Users, encrypt });
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
            const encrypt = {
                encryptValue: jest.fn().mockResolvedValue("SomeEncryptedPassword")
            };
            userService({ Users, encrypt });
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
            const encrypt = {
                encryptValue: jest.fn().mockResolvedValue("SomeEncryptedPassword")
            };
            userService({ Users, encrypt });
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
            const encrypt = jest.fn();

            // inject mock dependencies
            userService({ Users, encrypt });

            // exec
            const response = await userService.login(mockUser, mockPassword);
            expect(response.success).toEqual(false);
            expect(response.code).toEqual(400);
        });

        it('should return success false if user is not found by user property', async() => {
            const mockUser = "WrongUserName";
            const mockPassword = "somePassword";
            const Users = {
                findOne: jest.fn().mockResolvedValue(null)
            }
            const encrypt = {
                compareEncryptValue: jest.fn().mockReturnValue(true),
                getApiToken: jest.fn()
            };
            userService({ Users, encrypt });
            const response = await userService.login(mockUser, mockPassword);
            expect(response.success).toEqual(false);
            expect(response.code).toEqual(404);
        });

        it('should return success false if user is found but credentials are invalid', async() => {
            const mockUser = "userName";
            const mockPassword = "WrongPassword";
            const Users = {
                findOne: jest.fn().mockResolvedValue({
                    user: 'mock',
                    password: 'mock-pwd',
                    name: 'Mock Carlos',
                    last_name: 'Mock García',
                    active: true
                })
            }
            const encrypt = {
                compareEncryptValue: jest.fn().mockReturnValue(false),
                getApiToken: jest.fn()
            };
            userService({ Users, encrypt });
            const response = await userService.login(mockUser, mockPassword);
            expect(response.success).toEqual(false);
            expect(response.code).toEqual(403);
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
            const encrypt = {
                compareEncryptValue: jest.fn().mockReturnValue(true),
                getApiToken: jest.fn()
            };
            userService({ Users, encrypt });
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
            const encrypt = {
                compareEncryptValue: jest.fn().mockReturnValue(true),
                getApiToken: jest.fn()
            };
            userService({ Users, encrypt });
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
            const encrypt = {
                compareEncryptValue: jest.fn().mockReturnValue(true),
                getApiToken: jest.fn().mockReturnValue("SomeGeneratedToken")
            };
            userService({ Users, encrypt });
            const response = await userService.login(mockUser, mockPassword);
            expect(response.success).toEqual(true);
            expect(response.data).toHaveProperty('name');
            expect(response.data).toHaveProperty('token');
        });
    });
});