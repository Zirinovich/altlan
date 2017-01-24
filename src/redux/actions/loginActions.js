export const LOGIN_REQUEST_STARTED = 'LOGIN_REQUEST_STARTED';
export const LOGIN_REQUEST_FINISHED = 'LOGIN_REQUEST_FINISHED';
export const LOGIN_REQUEST_ERROR = 'LOGIN_REQUEST_ERROR';

function loginRequestStarted() {
    return {type: LOGIN_REQUEST_STARTED};
}

function loginRequestFinished() {
    return {type: LOGIN_REQUEST_FINISHED}
}

function loginRequestError(errors) {
    return {type: LOGIN_REQUEST_ERROR, errors}
}

export function loginRequest() {
    return (dispatch) => {
        dispatch(loginRequestStarted());
    }
}