import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Button from 'react-bootstrap/lib/Button';

const renderField = ({touched, id, error, placeholder, size, ...props}) => {
    return (
        <FormGroup controlId={id} bsSize={size}>
            <ControlLabel>{placeholder}</ControlLabel>
            <input {...props}/>
            {/*<FormControl {...props}>
                {touched && error && <HelpBlock>{error}</HelpBlock>}
            </FormControl>*/}
        </FormGroup>
    );
};

class SignInForm extends Component {
    render() {
        const {handleSubmit, submitting, method, action} = this.props;

        return (
            <div>
                {/*<form action={action} method={method} onSubmit={handleSubmit}>*/}
                <form action={action} method={method}>
                    <Field
                        name="login"
                        type="text"
                        component="input"
                        placeholder="Login"
                    />
                    <Field
                        name="password"
                        type="password"
                        component="input"
                        placeholder="Password"
                    />
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