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
    options.headers = { ...this._headers, ...options.headers };

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
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  addCard({ name, link }) {
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
      //body: JSON.stringify({}),
    });
  }

  likeCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
    });
  }

  dislikeCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
    });
  }

  // other methods for working with the API
}

//to do :

//delete button == priority after clicking yes event listners? the logic of deleting the cards ==NOT WORKING
//setting/updating the user info to the server
//like button
//edit profile pic, form to edit profile pic, api to edit profile
//edit and add cards
//check what reviewer wants
//checklist, pull code and review code before submitting
//new forms for editing/deleting pic and cards
//getAppInfo() == promise.all get user info get card list in one promise

//user info - GET https://around-api.en.tripleten-services.com/v1/users/me
//cards from server - GET https://around-api.en.tripleten-services.com/v1/cards
//edit profile - PATCH https://around-api.en.tripleten-services.com/v1/users/me
//adding new card - POST https://around-api.en.tripleten-services.com/v1/cards
//delete a card - DELETE https://around-api.en.tripleten-services.com/v1/cards/cardId
//result delete card -DELETE https://around-api.en.tripleten-services.com/v1/cards/5d1f0611d321eb4bdcd707dd
//likes - PUT https://around-api.en.tripleten-services.com/v1/cards/cardId/likes
//removing likes- DELETE https://around-api.en.tripleten-services.com/v1/cards/cardId/likes
//updating profile pic - PATCH https://around-api.en.tripleten-services.com/v1/users/me/avatar

// User routes

// GET /users/me – Get the current user’s info
// PATCH /users/me – Update your profile information
// PATCH /users/me/avatar – Update avatar
// Card routes

// GET /cards – Get all cards
// POST /cards – Create a card
// DELETE /cards/:cardId – Delete a card
// PUT /cards/:cardId/likes – Like a card
// DELETE /cards/:cardId/likes – Dislike a card
