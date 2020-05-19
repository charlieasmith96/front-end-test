import superagent from 'superagent'

const url = 'http://localhost:3000'

export interface BandwidthRequest {
    session_token: string;
    from: number;
    to: number;
    aggregation?: AGGREGATION
}

export enum AGGREGATION {
    MAX = 'max', MIN = 'min', SUM = 'sum'
}

export const getBandwidthDataBySessionToken = (bandwidthRequest: BandwidthRequest) : Promise<any>  => {
    return superagent
    .post(`${url}/bandwidth`)
    .send(bandwidthRequest)
    .then(response => response.body)
    .catch(response => response.status)
}
