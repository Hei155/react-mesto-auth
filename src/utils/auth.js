const BASE_URL = "https://auth.nomoreparties.co";

export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(
            {
            password,
            email
            })
    })
    .then((res) => handleResponse(res));
}

export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({password, email})
    })
    .then((res) => handleResponse(res))
    .then((data) => {
        localStorage.setItem('jwt', data.token);
        localStorage.setItem('password', password);
        localStorage.setItem('email', email);
    });
}

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type' : 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then((res) => handleResponse(res));
}

function handleResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }