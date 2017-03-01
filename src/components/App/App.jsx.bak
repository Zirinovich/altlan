import React, {Component, PropTypes} from 'react';
import Grid  from 'react-bootstrap/lib/Grid';
import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem  from 'react-bootstrap/lib/NavItem';

import './bootstrap.css';

import {Link} from 'react-router';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';

import {connect} from 'react-redux';
import {logout} from 'redux/actions/loginActions'

const propTypes = {
    children: PropTypes.node
};

class App extends Component {
    render() {
        const {account, dispatch} = this.props;

        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to='/'>Hello World</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav navbar>
                            <LinkContainer to='/time'>
                                <NavItem>Время</NavItem>
                            </LinkContainer>
                            <LinkContainer to='/counters'>
                                <NavItem>Счетчики</NavItem>
                            </LinkContainer>

                        </Nav>
                        <Nav pullRight>
                            {
                                account ?
                                    <NavItem onClick={() => {
                                        logout(dispatch)
                                    }}>Выйти</NavItem>
                                    :
                                    <LinkContainer to='/login'>
                                        <NavItem>Вход</NavItem>
                                    </LinkContainer>
                            }
                        </Nav>
                        {account && <Navbar.Text pullRight>{account.fullName}</Navbar.Text>}
                    </Navbar.Collapse>
                </Navbar>
                <Grid>
                    {this.props.children}
                </Grid>
            </div>
        );
    }
}

App.propTypes = propTypes;

function mapStateToProps(state) {
    const {account} = state;
    return {account};
}

export default connect(mapStateToProps)(App);
