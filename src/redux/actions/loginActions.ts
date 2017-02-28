import {default as formData} from 'form-urlencoded';
import {SubmissionError} from 'redux-form';
import {browserHistory} from 'react-router';
require('es6-promise').polyfill();
require('isomorphic-fetch');

export const LOGIN_SUCCESS = 'LOGIN_REQUEST_FINISHED',
    LOGOUT = 'LOGOUT_REQUEST';

export function requestLogin(credentials, dispatch) {
    return fetch('/api/login', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData(credentials)
    })
        .then(res => res.json())
        .then((json: any) => {
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
    dispatch({
        type: LOGIN_SUCCESS,
        account: user
    });
    browserHistory.push('/');
}

export function logout(dispatch) {
    fetch('/api/logout', {
        method: 'POST',
        credentials: 'same-origin'
    })
        .then(res => dispatch({
            type: LOGOUT,
            account: null
        }));
    browserHistory.push('/login');
}

