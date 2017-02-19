import {LOGIN_SUCCESS, LOGOUT, restoreLogin} from 'redux/actions/loginActions';

const initialState = (() => {
    var account = restoreLogin();
    console.log(account);
    return null
})();

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
