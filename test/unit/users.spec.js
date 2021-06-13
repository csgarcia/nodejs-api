const userModel = require('../../services/users/users.services');

describe('Users', () => {
    describe('Login', () => {
        it('should return success false if user or password are missing', async() => {
            // define mocks
            const mockUser = "";
            const mockPassword = "";
            const Users = jest.fn();

            // inject mock dependencies
            userModel({ Users });

            // exec
            const response = await userModel.login(mockUser, mockPassword);
            expect(response.success).toEqual(false);
            expect(response.code).toEqual(400);
        });

        it('should return success false if credentials are invalid', async() => {
            const mockUser = "WrongUserName";
            const mockPassword = "WrongPassword";
            const Users = {
                findOne: jest.fn().mockResolvedValue(null)
            }
            userModel({ Users });
            const response = await userModel.login(mockUser, mockPassword);
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
            userModel({ Users });
            const response = await userModel.login(mockUser, mockPassword);
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
            userModel({ Users });
            const response = await userModel.login(mockUser, mockPassword);
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
            userModel({ Users });
            const response = await userModel.login(mockUser, mockPassword);
            expect(response.success).toEqual(true);
            expect(response.data).toHaveProperty('name');
            expect(response.data).toHaveProperty('token');
        });
    });
});