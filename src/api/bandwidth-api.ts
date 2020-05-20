import superagent from 'superagent'

const url = 'http://localhost:3000'

export interface BandwidthRequest {
    session_token: string;
    from: number;
    to: number;
    aggregate?: AGGREGATE
}

export enum AGGREGATE {
    MAX = 'max', MIN = 'min', SUM = 'sum'
}

export const getBandwidthDataByDateWithSessionToken = (bandwidthRequest: BandwidthRequest) : Promise<any>  => {
    return superagent
    .post(`${url}/bandwidth`)
    .send(bandwidthRequest)
    .then(response =>  response.body)
}
