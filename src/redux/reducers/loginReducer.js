import {LOGIN_REQUEST_STARTED, LOGIN_REQUEST_FINISHED, LOGIN_REQUEST_ERROR} from 'redux/actions/loginActions';

const initialState = {
    login: '',
    password: '',
    errors: null
};

export default function (state = initialState, action) {
    switch (action.type){
        case LOGIN_REQUEST_STARTED:

    }
}