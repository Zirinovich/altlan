import {LOGIN_SUCCESS, LOGOUT} from 'redux/actions/loginActions';

const initialState = null;

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {...action.account});
        case LOGOUT:
            return null;
        default:
            return state;
    }
}
