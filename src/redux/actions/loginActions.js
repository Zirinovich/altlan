require('es6-promise').polyfill();
require('isomorphic-fetch');
import {default as formData} from 'form-urlencoded';
import {SubmissionError} from 'redux-form';

export const LOGIN_REQUEST = 'LOGIN_REQUEST_STARTED',
    LOGIN_SUCCESS = 'LOGIN_REQUEST_FINISHED',
    LOGIN_FAILURE = 'LOGIN_REQUEST_ERROR';

// function requestLogin(credentials) {
//     console.log('Вызвана loginRequest');
//     return {
//         type: LOGIN_REQUEST,
//         isFetching: true,
//         isAuthenticated: false,
//         credentials
//     }
// }

// function loginSuccess(user) {
//     return {
//         type: LOGIN_SUCCESS,
//         isFetching: false,
//         isAuthenticated: true,
//         id_token: user.id_token
//     }
// }

function loginError(message) {
    return {
        type: LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    }
}

export function requestLogin(credentials, dispatch) {
    return fetch('/loginAPI', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData(credentials)
    })
        .then(res => res.json())
        .then(json => {
            if (!json.errors) {
                return json.account;
            }
            throw new SubmissionError({...json.errors});
        })
        .catch(err => {
            if (err.name === 'SubmissionError') {
                throw err;
            }
            throw new SubmissionError({_error: err.message});
        });
}

export function loginSuccess(user, dispatch) {
    console.log(user);
    console.log(dispatch);
}
