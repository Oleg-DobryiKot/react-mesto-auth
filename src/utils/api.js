class Api {
  constructor(login) {
    this._server = login.server;
    this._auth = login.auth;
    this._cohort = login.cohort;
    this._path = `${this._server}${this._cohort}`;
  }

  _handleResponse(request) {
    return request.then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getInitialCards() {
    const request = fetch(`${this._path}/cards`, {
      method: 'GET',
      headers: {
        authorization: this._auth
      }
    });
    return this._handleResponse(request);
  }

  getUserInfo() {
    const request = fetch(`${this._path}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._auth,
        'Content-Type': 'application/json'
      }
    })
    return this._handleResponse(request);
  }

  sendUserInfo(data) {
    const request = fetch(`${this._path}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._auth,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    return this._handleResponse(request);
  }

  addNewCard(data) {
    const request = fetch(`${this._path}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._auth,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    return this._handleResponse(request);
  }

  deleteCard(cardId) {
    const request = fetch(`${this._path}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._auth,
        'Content-Type': 'application/json'
      },
    })
    return this._handleResponse(request);
  }

  changeLikeCardStatus(cardId, isLiked) {
    const request = fetch(`${this._path}/cards/likes/${cardId}`, {
      method: isLiked ? 'PUT':'DELETE',
      headers: {
        authorization: this._auth,
        'Content-Type': 'application/json'
      },
    })
    return this._handleResponse(request);
  }

  likeCard(cardId) {
    const request = fetch(`${this._path}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this._auth,
        'Content-Type': 'application/json'
      },
    })
    return this._handleResponse(request);
  }

  unlikeCard(cardId) {
    const request = fetch(`${this._path}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._auth,
        'Content-Type': 'application/json'
      },
    })
    return this._handleResponse(request);
  }

  editAvatar(data) {
    const request = fetch(`${this._path}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._auth,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    return this._handleResponse(request);
  }
}

const login = {
  "server": "https://mesto.nomoreparties.co/v1/",
  "auth": "ca5f4285-decb-4fbb-b094-52f199996ef3",
  "cohort": "cohort-19"
}

const api = new Api(login);
export default api;