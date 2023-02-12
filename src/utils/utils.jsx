export function isError(error) {
  console.log(error);
};

export function checkResponse(result) {
  if (result.ok) {
    return result.json();
  }
  return Promise.reject(`Ошибка: ${result.status}`);
};

export function request(url, options) {
  return fetch(
    `${this._baseUrl}${url}`,
    Object.assign(options, { headers: this._headers })
  )
    .then(this._checkResponse)
};
