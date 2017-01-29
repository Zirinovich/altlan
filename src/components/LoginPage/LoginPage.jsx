import React, {PropTypes, Component} from 'react';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Button from 'react-bootstrap/lib/Button';

function FieldGroup({id, label, help, ...props}) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}
/*Не используется, храню как пример*/
class LoginPage extends Component {

    render() {
        return (
            <div>
                <PageHeader>Authenticate please</PageHeader>
                <form>
                    <FieldGroup
                        id="login-page__login"
                        type="text"
                        label="Login"
                        placeholder="enter 'login' here..."
                    />
                    <FieldGroup
                        id="login-page__password"
                        type="password"
                        label="Password"
                    />
                    <Button
                        type="submit"
                    >
                        Sign In
                    </Button>
                </form>
            </div>
        );
    }
}

/*class LoadingButton extends Component{

 }*/

export default LoginPage;
