import superagent from 'superagent'

export interface Authentication {
    identifiant: string;
    password: string;
}

const url = 'http://localhost:3000'

export var authenticateUser = (authentication: Authentication) : Promise<any> => {
    return superagent
    .post(`${url}/auth`)
    .send(authentication)
    .then(response => response.body)
    .catch(response => response.status)
}