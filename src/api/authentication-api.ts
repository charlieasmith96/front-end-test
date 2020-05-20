import superagent from 'superagent';

export interface Authentication {
    identifiant: string;
    password: string;
}

export interface LogoutRequest {
    session_token: string
}

const url = 'http://localhost:3000';

export const authenticateUser = (authentication: Authentication) : Promise<any> => superagent
  .post(`${url}/auth`)
  .send(authentication)
  .then((response) => response.body);

export const logoutUser = (logoutRequest: LogoutRequest) : Promise<any> => superagent
  .post(`${url}/logout`)
  .send(logoutRequest)
  .then((response) => response.body);
