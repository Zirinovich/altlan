import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Button from 'react-bootstrap/lib/Button';

const renderField = ({input, label, type, meta: {touched, error}}) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type}/>
            {touched && error && <span>{error}</span>}
        </div>
    </div>
);

class SignInForm extends Component {
    render() {
        const {handleSubmit, submitting, method, action, error} = this.props;
        return (
            <div>
                <form action={action} method={method} onSubmit={handleSubmit}>
                    <Field
                        name="username"
                        type="text"
                        component={renderField}
                        label="Login"
                    />
                    <Field
                        name="password"
                        type="password"
                        component={renderField}
                        label="Password"
                    />
                    {error && <strong>{error}</strong>}
                    <div>
                        <Button type="submit" disabled={submitting}>Войти</Button>
                    </div>
                </form>
            </div>
        )
    }
}

SignInForm = reduxForm({
    form: 'signIn', // имя формы в state (state.form.post)
})(SignInForm);

export {SignInForm};