import React, {Component} from 'react';
import {SignInForm} from 'components/Forms'
import {requestLogin, loginSuccess} from 'redux/actions/loginActions';
import Button from 'react-bootstrap/lib/Button';

const test = function () {
    fetch('api/test', {
        method: 'GET'
    })
};

class _SignInPage extends Component {
    render() {
        return (
            <div>
                <SignInForm action="/loginapi" method="POST" onSubmit={requestLogin}
                            onSubmitSuccess={loginSuccess}/>
                <br/>
                <Button onClick={test}>Тест</Button>
            </div>
        );
    }
}

export {_SignInPage};