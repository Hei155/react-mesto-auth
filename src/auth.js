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
    .then((res) => {
        if (!res.ok) {
            return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
    })
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
    .then((res) => {
        if (res.status === '400') {
            return Promise.reject(`Error: ${res.status}`);
        }
        else if (res.status === '401') {
            return Promise.reject(`Error: ${res.status}`)
        }
        return res.json();
    })
    .then(data => localStorage.setItem('jwt', data.token))
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
    .then((res) => {
        return res.json();
    })
}