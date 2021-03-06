import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Button from 'react-bootstrap-button-loader';
import {timeRequest} from 'redux/actions/timeActions';

const propTypes = {
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    time: PropTypes.any
};

class TimePage extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.dispatch(timeRequest()); // передача сюда функции возможна благодаря использованию модуля 'redux-thunk'
    } // https://github.com/rajdee/redux-in-russian/blob/master/docs/advanced/AsyncFlow.md

    render() {
        const {loading, time} = this.props;

        return (
            <div>
                <PageHeader>Timestamp</PageHeader>
                <Button loading={loading} onClick={this.handleClick}>Запросить!</Button>
                {time && <div>Time: {time}</div>}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {loading, time} = state.time;

    return {loading, time};
}

TimePage.propTypes = propTypes;

export default connect(mapStateToProps)(TimePage);