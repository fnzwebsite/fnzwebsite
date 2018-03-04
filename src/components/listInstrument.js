import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as instrumentActions from '../actions/instrumentActions';
import PropTypes from 'prop-types';
import React from 'react';

class ListInstrument extends React.Component {
    componentWillMount() {
        // this.props.instrumentActions.getInstrument();
        this.props.instrumentActions.getInstrumentById('GB00BD6FFQ03');
    }

    renderData(item) {
        return <div key={item.acdId}>{item.name}</div>;
    }

    render() {
        if(!this.props.instrument){
            return (
                <div>
                    Loading Instrument...
                </div>
            )
        }else{
            return (
                <div className="">
                    { this.renderData(this.props.instrument)}
                </div>
            )
        }
    }
}

ListInstrument.propTypes = {
    instrumentActions: PropTypes.object,
    instrument: PropTypes.array
};

function mapStateToProps(state) {
    return {
        instrument: state.instrument
    };
}

function mapDispatchToProps(dispatch) {
    return {
        instrumentActions: bindActionCreators(instrumentActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListInstrument);