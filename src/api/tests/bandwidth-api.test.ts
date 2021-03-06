import { getBandwidthDataByDateWithSessionToken } from '../bandwidth-api';
import { AGGREGATE } from '../bandwidth-api'
const nock = require('nock')

describe('getBandwidthDataByDateWithSessionToken', () => {
    it('should return data if successful http response', async() => {
        
        const url = 'http://localhost:3000';

        const response = {
            "cdn": 123,
            "p2p": 324
        }

        nock(url)
        .post(`/bandwidth`)
        .reply(200, response)

        const result = await getBandwidthDataByDateWithSessionToken({session_token: "test-token",
            from: 1589809358800,
            to: 1589899358800,
            aggregate: AGGREGATE.SUM
           })

        expect(result).toEqual(response)

    }),
    it('should return error if http request fails', async() => {
        const url = 'http://localhost:3000';

        nock(url)
        .post(`/bandwidth`)
        .reply(400)

        const request = {session_token: "test-token",
        from: 1589809358800,
        to: 1589899358800,
        aggregate: AGGREGATE.SUM
       }

        expect(getBandwidthDataByDateWithSessionToken(request)).rejects.toEqual(new Error("Bad Request"))
    })
})