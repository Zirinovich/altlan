import * as React/*, {Component, PropTypes}*/ from 'react';
import {Grid, Nav, Navbar, NavItem}  from 'react-bootstrap';

import './bootstrap.css';

import {Link} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';

const {connect} = require('react-redux');
import {logout} from 'redux/actions/loginActions'
// import ReactPropTypes = React.ReactPropTypes;

/*const propTypes = {
 children: PropTypes.node
 };*/

interface AppProps {
    children: any, // TODO: найти какой тип для PropTypes.node,
    account: any,
    dispatch: any
}

function mapStateToProps(state) {
    const {account} = state;
    return {account};
}

@connect(mapStateToProps)
class App extends React.Component<AppProps,any> {
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
                            { account ?
                                    <NavItem onClick={() => { logout(dispatch) }}>Выйти</NavItem>
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

// App.propTypes = propTypes;


export {App};
