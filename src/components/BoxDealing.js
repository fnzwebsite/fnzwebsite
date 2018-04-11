import {connect} from 'react-redux';
import React from 'react';
import moment from 'moment'
import * as acdActions from '../actions/acdActions';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import { Redirect} from 'react-router-dom';

class BoxToday extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 'today'
        }
        this.changeView = this.changeView.bind(this);
    }

    changeView(selected) {
        if (this.state.selected != selected) {
            this.setState({
                selected: selected
            });
            this.props.loadChart(selected)
        }
    }
    componentWillMount(){
        this.props.acdActions.getAcd('today','1cb01fd9-a3be-42aa-9bae-93d8f05f6c67')
        this.props.acdActions.getAcd('next','1cb01fd9-a3be-42aa-9bae-93d8f05f6c67')
        this.props.acdActions.getAcd('previous','1cb01fd9-a3be-42aa-9bae-93d8f05f6c67')
    }

    componentWillReceiveProps(nextProps) {
        this.props.acdActions.getAcd('today','1cb01fd9-a3be-42aa-9bae-93d8f05f6c67')
        this.props.acdActions.getAcd('next','1cb01fd9-a3be-42aa-9bae-93d8f05f6c67')
        this.props.acdActions.getAcd('previous','1cb01fd9-a3be-42aa-9bae-93d8f05f6c67')
    }

    render() {
        var today = moment().format("YYYY-MM-DD");
        var tomorrow = moment().add('days', 1).format("YYYY-MM-DD");
        var yesterday = moment().add('days', -1).format("YYYY-MM-DD");

        if (this.props.dealingData == "logout") {
            return <Redirect to={{ pathname: '/login', state: { from: this.props.location } }} />
        }

        if (this.props.price.acdToday && this.props.price.acdToday.length) {
            console.log("hi")
            let subscriptionsPrevious = 0;
            let redemptionsPrevious = 0;
            let netInflowOutflowPrevious = 0;

            let subscriptionsNext = 0;
            let redemptionsNext = 0;
            let netInflowOutflowNext = 0;

            let subscriptionsToday = 0;
            let redemptionsToday = 0;
            let netInflowOutflowToday = 0;

            if(this.props.price.acdToday && this.props.price.acdToday.length) {
                subscriptionsToday = parseFloat(subscriptionsToday) + parseFloat(this.props.price.acdToday[0].unitsPurchased) * parseFloat(this.props.price.acdToday[0].roundedPrice);
                redemptionsToday = parseFloat(redemptionsToday) + parseFloat(this.props.price.acdToday[0].unitsSold) * parseFloat(this.props.price.acdToday[0].roundedPrice);
                netInflowOutflowToday = parseFloat(subscriptionsToday) + parseFloat(redemptionsToday);
                subscriptionsToday = parseFloat(subscriptionsToday).toFixed(4);
                redemptionsToday = parseFloat(redemptionsToday).toFixed(4);
                netInflowOutflowToday = parseFloat(netInflowOutflowToday).toFixed(4);
            }
            if(this.props.price.acdPrevious && this.props.price.acdPrevious.length) {
                subscriptionsPrevious = parseFloat(subscriptionsPrevious) + parseFloat(this.props.price.acdPrevious[0].unitsPurchased) * parseFloat(this.props.price.acdPrevious[0].roundedPrice);
                redemptionsPrevious = parseFloat(redemptionsPrevious) + parseFloat(this.props.price.acdPrevious[0].unitsSold) * parseFloat(this.props.price.acdPrevious[0].roundedPrice);
                netInflowOutflowPrevious = parseFloat(subscriptionsPrevious) + parseFloat(redemptionsPrevious);
                subscriptionsPrevious = parseFloat(subscriptionsPrevious).toFixed(4);
                redemptionsPrevious = parseFloat(redemptionsPrevious).toFixed(4);
                netInflowOutflowPrevious = parseFloat(netInflowOutflowPrevious).toFixed(4);

            }

            if(this.props.price.acdNext && this.props.price.acdNext.length) {
                subscriptionsNext = parseFloat(subscriptionsNext) + parseFloat(this.props.price.acdNext[0].unitsPurchased) * parseFloat(this.props.price.acdNext[0].roundedPrice);
                redemptionsNext = parseFloat(redemptionsNext) + parseFloat(this.props.price.acdNext[0].unitsSold) * parseFloat(this.props.price.acdNext[0].roundedPrice);
                netInflowOutflowNext = parseFloat(subscriptionsNext) + parseFloat(redemptionsNext);
                subscriptionsNext = parseFloat(subscriptionsNext).toFixed(4);
                redemptionsNext = parseFloat(redemptionsNext).toFixed(4);
                netInflowOutflowNext = parseFloat(netInflowOutflowNext).toFixed(4);

            }

            return (
                <div className="row">
                    <div className="col-md-4 previous" onClick={() => this.changeView('previous')}>
                        <div className={this.state.selected == "previous" ? 'card funds selected':'card funds'}>
                            <div className="card-header">
                                <h3>Fund Position</h3> <span className="badge bg-alice pull-right">Previous Day</span>
                            </div>
                            <div className="dashboard_card">
                                <div className="row">
                                    <div className="col-6 open">
                                        <div className="row align-items-center justify-content-center h-100" style={{marginTop:'20px'}}>
                                            <h5>Net Inflows/Outflows</h5>
                                            <h2 className={netInflowOutflowPrevious < 0 ? 'closed':'open'}><span>&#163;</span>{netInflowOutflowPrevious}<span
                                                className="sub-text"></span></h2>
                                        </div>
                                    </div>
                                    <div className="col-6 closed">
                                        <div className="row">
                                            <div className="col-sm-12 sub-sec">
                                                <h5>Subscriptions</h5>
                                                <h2><span>&#163;</span>{subscriptionsPrevious}</h2>
                                            </div>
                                        </div>
                                        <hr style={{marginTop:'-10px'}}/>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <h5>Redemptions</h5>
                                                <h2><span>&#163;</span>{redemptionsPrevious}</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 today" onClick={() => this.changeView('today')}>
                        <div className={this.state.selected == "today" ? 'card funds selected':'card funds'}>
                            <div className="card-header">
                                <h3>Fund Position</h3> <span className="badge bg-alice pull-right">Today</span></div>
                            <div className="dashboard_card">
                                <div className="row">
                                    <div className="col-6 open">
                                        <div className="row align-items-center justify-content-center h-100" style={{marginTop:'20px'}}>

                                            <h5>Net Inflows/Outflows</h5>
                                            <h2 className={netInflowOutflowToday < 0 ? 'fund-orange':'fund-blue'}><span>&#163;</span>{netInflowOutflowToday}<span
                                                className="sub-text"></span></h2>
                                        </div>

                                    </div>
                                    <div className="col-6 closed">
                                        <div className="row">
                                            <div className="col-sm-12 sub-sec">
                                                <h5>Subscriptions</h5>
                                                <h2><span>&#163;</span>{subscriptionsToday}</h2>
                                            </div>
                                        </div>
                                        <hr style={{marginTop:'-10px'}}/>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <h5>Redemptions</h5>
                                                <h2><span>&#163;</span>{redemptionsToday}</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 next" onClick={() => this.changeView('next')}>
                        <div className={this.state.selected == "next" ? 'card funds selected':'card funds'}>
                            <div className="card-header">
                                <h3>Fund Position</h3> <span className="badge bg-alice pull-right">Next Day</span></div>
                            <div className="dashboard_card">
                                <div className="row">
                                    <div className="col-6 open">
                                        <div className="row align-items-center justify-content-center h-100" style={{marginTop:'20px'}}>
                                            <h5>Net Inflows/Outflows</h5>
                                            <h2 className={netInflowOutflowNext < 0 ? 'fund-orange':'fund-blue'}><span>&#163;</span>{netInflowOutflowNext}<span
                                                className="sub-text"></span></h2>
                                        </div>

                                    </div>
                                    <div className="col-6 closed">
                                        <div className="row">
                                            <div className="col-sm-12 sub-sec">
                                                <h5>Subscriptions</h5>
                                                <h2><span>&#163;</span>{subscriptionsNext}</h2>
                                            </div>
                                        </div>
                                        <hr style={{marginTop:'-10px'}}/>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <h5>Redemptions</h5>
                                                <h2><span>&#163;</span>{redemptionsNext}</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            )
        }
        else {
            return (
                <div className="load">Loading ...</div>
            )
        }
    }
}

const
    mapStateToProps = (state, props) => {
        return {
            user: state.user
        }
    };

BoxToday.propTypes = {
    acdActions: PropTypes.object,
    acdToday: PropTypes.array,
    acdNext: PropTypes.array,
    acdPrevious: PropTypes.array,
};

const
    mapDispatchToProps = (dispatch) => ({
        acdActions: bindActionCreators(acdActions, dispatch)
    });


export default connect(mapStateToProps,
    mapDispatchToProps)(BoxToday);
