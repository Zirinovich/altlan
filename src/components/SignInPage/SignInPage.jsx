import React, {Component} from 'react';
import {SignInForm} from 'components/Forms'

class _SignInPage extends Component {
    render() {
        return (
            <div>
                <SignInForm action="/loginapi" method="POST"/>
            </div>
        );
    }
}

export {_SignInPage};