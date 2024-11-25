export default class Api {
  constructor({ baseUrl, token }) {
    this._baseUrl = baseUrl;
    this._headers = {
      authorization: token,
      "Content-Type": "application/json",
    };
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  _request(url, options = {}) {
    options.headers = {
      "Content-Type": "application/json",
      ...this._headers,
      ...options.headers,
    };

    return fetch(url, options).then(this._handleResponse);
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      method: "GET",
    });
  }

  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "GET",
    });
  }

  setUserInfo({ name, about }) {
    console.log(JSON.stringify({ name: name, about: about }));
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  addCard({ name, link }) {
    console.log("addCard called with:", { name, link });
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  removeCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
    });
  }

  likeCard(cardId) {
    console.log("Card ID from likeCard Api.js card", cardId);
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
    });
  }

  dislikeCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
    });
  }

  updateAvatar(avatarUrl) {
    console.log(JSON.stringify(avatarUrl));
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    });
  }
}
