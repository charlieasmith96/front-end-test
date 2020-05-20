import { authenticateUser, logoutUser  } from '../authentication-api';
const nock = require('nock')

describe('authenticateUser', () => {
    it('should return data if successful http response', async() => {
        
        const url = 'http://localhost:3000';

        const request = {
            identifiant : "test-idefiant",
            password: "test-password"
        }

        const response = {
            session_token: "test-token",
        }

        nock(url)
        .post(`/auth`)
        .reply(200, response)

        const result = await authenticateUser(request)

        expect(result).toEqual(response)
    }),
    it('should return error if http request fails', async() => {
        const url = 'http://localhost:3000';

        nock(url)
        .post(`/auth`)
        .reply(400)

        const request = {
            identifiant : "test-idefiant",
            password: "test-password"
        }

        expect(authenticateUser(request)).rejects.toEqual(new Error("Bad Request"))
    })
})

describe('logoutUser', () => {
    it('should return success if successful http response', async() => {
        
        const url = 'http://localhost:3000';

        const request = {
            session_token: "test-token",
        }

        nock(url)
        .post(`/logout`)
        .reply(200);

        await logoutUser(request)
    }),
    it('should return error if http request fails', async() => {
        const url = 'http://localhost:3000';

        nock(url)
        .post(`/logout`)
        .reply(400)

        const request = {
            session_token: "test-token",
        }

        expect(logoutUser(request)).rejects.toEqual(new Error("Bad Request"))
    })
})