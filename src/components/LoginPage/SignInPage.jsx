import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';

import Button from 'react-bootstrap/lib/Button';

import PageHeader from 'react-bootstrap/lib/PageHeader';

class Form extends Component {
    render() {
        const {handleSubmit, reset} = this.props;

        const submit = (values) => {
            fetch("http://localhost:3002/api/login",{
                method: 'POST',
                mode: 'cors',
                body: `login=${values.login}&password=${values.password}`,
            }).then((data)=>{
                console.log(data.json());
            });

            //browserHistory.push('/');
        };

        return (
            <div>
                <PageHeader>Authenticate please</PageHeader>
                <form onSubmit={handleSubmit(submit)}>
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