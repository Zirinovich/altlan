import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import timeReducer from './timeReducer';
import loginReducer from './loginReducer'
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    counter: counterReducer,
    time: timeReducer,
    form: formReducer,
    account: loginReducer
});
