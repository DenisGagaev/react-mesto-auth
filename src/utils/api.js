class Api {
  constructor(data) {
    this._baseUrl = data.serverUrl;
    this._token = data.token;
  }
  // проверка статуса
  _requestResult(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(
        `Хьюстон, у нас проблемы: Ошибка ${res.status} ${res.statusText}`
      );
    }
  }
  // Запрос данных пользователя
  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: {
        authorization: this._token,
      },
    }).then((res) =>
      this._requestResult(res)
    );
  }
  // Отправка данных пользователя
  editProfile(data) {
    return fetch(`${this._baseUrl}users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name.trim(),
        about: data.about.trim()
      }),
    }).then((res) => this._requestResult(res));
  }
  // Запрос карточек
  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._requestResult(res));
  }
  // отправка данных Аватара
  editAvatar(data) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: data,
      }),
    }).then((res) => this._requestResult(res));
  }
  // отправка на сервер новой карточки
  sendCard(data) {
    return fetch(`${this._baseUrl}cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._requestResult(res));
  }
  // Запрос на удаление карточки
  deleteCard(data) {
    return fetch(`${this._baseUrl}cards/${data}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._requestResult(res));
  }
  //Добавить\удалить лайк
  changeLike(cardId, isLiked) {
    return fetch(`${this._baseUrl}cards/likes/${cardId}`, {
      method: !isLiked ? "PUT" : "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._requestResult(res));
  }
}

const api = new Api({
  serverUrl: "https://mesto.nomoreparties.co/v1/cohort-27/",
  token: "8747a9a0-014b-48d6-8e47-516b00c90197"
});

export default api;
