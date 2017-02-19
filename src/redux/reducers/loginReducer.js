import {LOGIN_SUCCESS, LOGOUT} from 'redux/actions/loginActions';

export default function (state = null, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {...action.account});
        case LOGOUT:
            return null;
        default:
            return state;
    }
}
