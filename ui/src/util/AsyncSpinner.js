import React from 'react';
import { connect } from 'react-redux';
import { ASYNC_STATUS_WAITING } from '../redux/asyncStatus';
import Spinner from '../components/Spinner';

function AsyncSpinner(props) {
    return (
        <Spinner
            open={props.asyncStatus === ASYNC_STATUS_WAITING}
            dialogText={'Please wait a moment'}
        />
    );
}

const mapStateToProps = state => ({
    asyncStatus: state.asyncStatus.status
});

export default connect(
    mapStateToProps,
    null
)(AsyncSpinner);
