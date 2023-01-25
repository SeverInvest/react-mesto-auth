// 'use strict';
import connect from './connect.js'

class Api {
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

  _request(url, options) {
    return fetch(
      `${this._baseUrl}${url}`,
      Object.assign(options, { headers: this._headers })
    )
      .then(this._checkResponse)
  }

  getInitialCards() {
    return this._request(
      '/cards',
      {
        method: "GET"
      }
    )
  }

  getUser() {
    return this._request(
      '/users/me',
      {
        method: "GET"
      }
    )
  }

  getInitialData() {
    return Promise.all([this.getUser(), this.getInitialCards()])
  }

  setUserInfo(info) {
    return this._request(
      '/users/me',
      {
        method: 'PATCH',
        body: JSON.stringify(info)
      }
    )
  }

  setCard(info) {
    return this._request(
      '/cards',
      {
        method: "POST",
        body: JSON.stringify(info)
      }
    )
  }

  toggleLikeCard({ idCard, methodCardLike }) {

    return this._request(
      `/cards/${idCard}/likes`,
      {
        method: methodCardLike
      }
    )
  }

  deleteCard(idCard) {
    return this._request(
      `/cards/${idCard}`,
      {
        method: "DELETE"
      }
    )
  }

  setAvatar(info) {
    return this._request(
      '/users/me/avatar',
      {
        method: "PATCH",
        body: JSON.stringify(info)
      }
    )
  }
}

const api = new Api(connect);

export default api;