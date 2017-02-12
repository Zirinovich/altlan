require('es6-promise').polyfill();
require('isomorphic-fetch');
import {default as formData} from 'form-urlencoded';
import {SubmissionError} from 'redux-form';

export const LOGIN_REQUEST = 'LOGIN_REQUEST_STARTED',
    LOGIN_SUCCESS = 'LOGIN_REQUEST_FINISHED',
    LOGIN_FAILURE = 'LOGIN_REQUEST_ERROR';

function requestLogin(credentials) {
    console.log('Вызвана loginRequest');
    return {
        type: LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        credentials
    }
}

function loginSuccess(user) {
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        id_token: user.id_token
    }
}

function loginError(message) {
    return {
        type: LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    }
}

export function loginUser(credentials) {
    return fetch('/loginAPI', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData(credentials)
    }).then((res) => {
        return res.json().then(apiResponse => ({apiResponse, res}));
    }).then(({apiResponse, response}) => {
        if (apiResponse.errors) {
            console.log({...apiResponse.errors});
            throw new SubmissionError({...apiResponse.errors});
        }
        return apiResponse;
    }).catch(err => {
        throw new SubmissionError({_error: err.message});
    })
}
// export function loginUser(credentials) {
//     return (dispatch) => {
//         dispatch(requestLogin(credentials));
//
//         let form = new FormData();
//         form.append('username', credentials.username);
//         form.append('password', credentials.password);
//         console.log(form);
//         return fetch('/loginAPI', {
//             method: 'POST',
//             body: form
//         }).then((res) => {
//             debugger;
//             res.json();
//         }).then((json) =>{
//
//             console.log(JSON.stringify(json));
//         }).catch(err => console.log("Error: ", err))
//     }
// }