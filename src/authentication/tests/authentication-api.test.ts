import { authenticateUser } from '../../api/authentication-api';

const nock = require('nock')

describe('get authentication status', () => {
    it('should return session key given username and password', async() => {

        const url = 'http://localhost:3000';

        const response = {
                session_key: "test-key"
        }

        nock(url)
        .post(`/auth`)
        .reply(200, response)

        const responseBody = await authenticateUser({identifiant: "test", password: "test-password"});

        expect(responseBody).toEqual({"session_key": "test-key"})
    }
     ),
     it('should return error status if http call fails', async() => {
        const url = 'http://localhost:3000';

        nock(url)
        .post(`/auth`)
        .reply(403)

        const responseBody = await authenticateUser({identifiant: "test", password: "test-password"});

        expect(responseBody).toEqual(403)
    })     
 })
