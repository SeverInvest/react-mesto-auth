import connect_auth from '../utils/connect_auth.js'

class Auth {
  constructor(connect) {
    this._baseUrl = connect.baseUrl;
    this._headers = connect.headers;
  }
  _checkResponse(result) {
    if (result.ok) {
      return result.json();
    }
    return Promise.reject(`Ошибка: ${result.status}`);
  }

  _request_auth(url, options, token = '') {
    return fetch(
      `${this._baseUrl}${url}`,
      Object.assign(options,
        Object.assign(
          { headers: this._headers },
          token && { 'Authorization': `Bearer ${token}` }
        )
      )
    )
      .then(this._checkResponse)
  }

  _request(url, options) {
    return fetch(
      `${this._baseUrl}${url}`,
      Object.assign(options, { headers: this._headers })
    )
      .then(this._checkResponse)
  }

  register(email, password) {
    return this._request(
      '/signup',
      {
        method: 'POST',
        body: JSON.stringify({ email, password })
      }
    )
  };

  authorize(email, password) {
    return this._request(
      '/signin',
      {
        method: 'POST',
        body: JSON.stringify({ email, password })
      }
    )
  };

  checkToken(token) {
    return this._request_auth(
      "/users/me",
      {
        method: 'GET'
      },
      token
    )
  }

}

const auth = new Auth(connect_auth);

export default auth;