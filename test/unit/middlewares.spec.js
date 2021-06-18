const { JsonWebTokenError } = require('jsonwebtoken');
const {
    isAuthenticated
} = require('../../middlewares/authenticate');

describe('Middlewares', () => {

    describe('isAuthenticated', () => {

        it('should return success false, code 401 if token is empty', async() => {
            const req = {
                header: jest.fn().mockReturnValue("")
            };
            const res = {
                status: jest.fn().mockReturnThis(), //return same object that it has beed called
                json: jest.fn()
            };
            const next = jest.fn();
            // this test is different because request data manipulated different, so we need to ckeck the mocks
            isAuthenticated(req, res, next)

            // checking the mocks
            expect(req.header.mock.calls).toEqual([
                ['token'] //means that header decode this param
            ]);
            expect(res.status.mock.calls).toEqual([
                [401] //http code unauthorized
            ]);
            expect(res.json.mock.calls[0][0].success).toEqual(false);
        });

        it('should return success false if token is expired', () => {
            // https://www.npmjs.com/package/jsonwebtoken#errors--codes
            const req = {
                header: jest.fn().mockReturnValue("invalidToken")
            };
            const res = {
                status: jest.fn().mockReturnThis(), //return same object that it has beed called
                json: jest.fn()
            };
            const next = jest.fn();
            isAuthenticated(req, res, next);
            expect(res.status.mock.calls).toEqual([
                [401] //http code unauthorized
            ]);
            expect(res.json.mock.calls[0][0].success).toEqual(false);
        });

    });

});