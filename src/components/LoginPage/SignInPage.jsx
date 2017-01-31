import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {browserHistory} from 'react-router';
import 'isomorphic-fetch';
import FormData from 'isomorphic-form-data';
import promise from 'es6-promise';

import Button from 'react-bootstrap/lib/Button';

import PageHeader from 'react-bootstrap/lib/PageHeader';

// promise.polyfill();

class Form extends Component {
    render() {
        const {handleSubmit, reset} = this.props;


        return (
            <div>
                <PageHeader>Authenticate please</PageHeader>
                <form method="POST">
                    <Field name="login" component="input" type="text"/>
                    <Field name="password" component="input" type="text"/>
                    <div>
                        <Button type="button" onClick={reset}>Очистить форму</Button>
                        <Button type="submit">Отправить форму</Button>
                    </div>
                </form>
            </div>
        )
    }
}

Form = reduxForm({
    form: 'signIn', // имя формы в state (state.form.post)
})(Form);

export default Form;