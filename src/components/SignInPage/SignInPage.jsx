import React, {Component} from 'react';
import {SignInForm} from 'components/Forms'
import {loginUser} from 'redux/actions/loginActions';

let loginSux = (result) => {
    console.log(result);
};

class _SignInPage extends Component {
    render() {
        return (
            <div>
                <SignInForm action="/loginapi" method="POST" onSubmit={loginUser} onSubmitSuccess={loginSux}/>
            </div>
        );
    }
}

export {_SignInPage};