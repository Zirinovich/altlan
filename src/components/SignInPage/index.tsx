import * as React/*, {Component}*/ from 'react';
let {SignInForm} = require('components/Forms');
import {requestLogin, loginSuccess} from 'redux/actions/loginActions';
import Button from 'react-bootstrap/lib/Button';

const test = function () {
    fetch('api/test', {
        method: 'GET',
        credentials: 'same-origin'
    })
};

class SignInPage extends React.Component<any,any> {
    render() {
        return (
            <div>
                <SignInForm action="/login" method="POST" onSubmit={requestLogin}
                            onSubmitSuccess={loginSuccess}/>
                <br/>
                <Button onClick={test}>Тест</Button>
            </div>
        );
    }
}

export {SignInPage};

/*
 import LoginPage from './LoginPage';

 export default LoginPage;
 */
