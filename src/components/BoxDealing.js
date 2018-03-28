import {connect} from 'react-redux';
import React from 'react';
import moment from 'moment'
import userActions from '../actions/user.actions';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

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

    render() {
        var today = moment().format("YYYY-MM-DD");
        var tomorrow = moment().add('days', 1).format("YYYY-MM-DD");
        var yesterday = moment().add('days', -1).format("YYYY-MM-DD");

        if (this.props.dealingData == "logout") {
            this.props.userActions.logout();
        }

        if (this.props.dealingData && this.props.dealingData.status != "400") {
            let self = this
            let ListToday = Object.keys(self.props.dealingData).map(function (keyName, keyIndex) {
                if (moment(self.props.dealingData[keyName].boxDate).isSame(today, 'day')) {
                    return <li keys={keyIndex}
                               className={self.props.dealingData[keyName].dealType.toUpperCase() == "BUY" ? "active" : "orange"}>
                        <div className="fun">
                            <div className="fund-name">{self.props.dealingData[keyName].account}</div>
                            <div
                                className="fund-quan">{(self.props.dealingData[keyName].units == null || self.props.dealingData[keyName].units <= 0) ? 0 : self.props.dealingData[keyName].units}</div>
                        </div>
                        <div className="fun">
                            <div className="fund-isin">{self.props.dealingData[keyName].instrumentKey}</div>
                            <div className="fund-price"><i
                                className="fa fa-gbp"></i>{(self.props.dealingData[keyName].amount == null || self.props.dealingData[keyName].amount <= 0) ? 0 : self.props.dealingData[keyName].amount}
                            </div>
                        </div>
                    </li>
                }
            });

            let ListPrevious = Object.keys(self.props.dealingData).map(function (keyName, keyIndex) {
                var date = moment(self.props.dealingData[keyName].boxDate).isSame(yesterday, 'day');
                if (date) {
                    return <li keys={keyIndex}
                               className={self.props.dealingData[keyName].dealType.toUpperCase() == "BUY" ? "active" : "orange"}>
                        <div className="fun">
                            <div className="fund-name">{self.props.dealingData[keyName].account}</div>
                            <div
                                className="fund-quan">{(self.props.dealingData[keyName].units == null || self.props.dealingData[keyName].units <= 0) ? 0 : self.props.dealingData[keyName].units}</div>
                        </div>
                        <div className="fun">
                            <div className="fund-isin">{self.props.dealingData[keyName].instrumentKey}</div>
                            <div className="fund-price"><i
                                className="fa fa-gbp"></i>{(self.props.dealingData[keyName].amount == null || self.props.dealingData[keyName].amount <= 0) ? 0 : self.props.dealingData[keyName].amount}
                            </div>
                        </div>
                    </li>
                }
            });

            let ListNext = Object.keys(self.props.dealingData).map(function (keyName, keyIndex) {
                var date = moment(self.props.dealingData[keyName].boxDate).isSame(tomorrow, 'day');
                if (date) {
                    return <li keys={keyIndex}
                               className={self.props.dealingData[keyName].dealType.toUpperCase() == "BUY" ? "active" : "orange"}>
                        <div className="fun">
                            <div className="fund-name">{self.props.dealingData[keyName].account}</div>
                            <div
                                className="fund-quan">{(self.props.dealingData[keyName].units == null || self.props.dealingData[keyName].units <= 0) ? 0 : self.props.dealingData[keyName].units}</div>
                        </div>
                        <div className="fun">
                            <div className="fund-isin">{self.props.dealingData[keyName].instrumentKey}</div>
                            <div className="fund-price"><i
                                className="fa fa-gbp"></i>{(self.props.dealingData[keyName].amount == null || self.props.dealingData[keyName].amount <= 0) ? 0 : self.props.dealingData[keyName].amount}
                            </div>
                        </div>
                    </li>
                }
            });
            var subscriptionsNext = 0;
            var redemptionsNext = 0;
            if (this.props.price.priceNext && this.props.price.priceNext.length) {
                this.props.price.priceNext.map(function (item, index) {
                    if (item.amount > 0 && item.dealType == "BUY") {
                        subscriptionsNext =parseInt(subscriptionsNext)+parseInt(item.amount);
                    }
                    else if (item.units > 0 && item.dealType == "BUY" && item.price) {
                        subscriptionsNext =parseInt(subscriptionsNext)+ parseInt(item.units) * parseInt(item.price);
                    }

                    if (item.amount > 0 && item.dealType == "SELL") {
                        redemptionsNext =parseInt(redemptionsNext) + parseInt(item.amount);
                    }

                    else if (item.units > 0 && item.dealType == "SELL" && item.price) {
                        redemptionsNext =parseInt(redemptionsNext)+parseInt( item.units) * parseInt(item.price);
                    }
                })
            }

            var subscriptionsPrevious = 0;
            var redemptionsPrevious = 0;
            if (this.props.price.pricePrevious && this.props.price.pricePrevious.length) {
                this.props.price.pricePrevious.map(function (item, index) {
                    if (item.amount > 0 && item.dealType == "BUY") {
                        subscriptionsPrevious =parseInt(subscriptionsPrevious)+parseInt(item.amount);
                    }
                    else if (item.units > 0 && item.dealType == "BUY" && item.price) {
                        subscriptionsPrevious +=parseInt(subscriptionsPrevious)+ parseInt(item.units) * parseInt(item.price);
                    }
                    if (item.amount > 0 && item.dealType == "SELL") {
                        redemptionsPrevious =parseInt(redemptionsPrevious)+ parseInt(redemptionsPrevious)+parseInt(item.amount);
                    }
                    else if (item.units > 0 && item.dealType == "SELL" && item.price) {
                        redemptionsPrevious =parseInt(redemptionsPrevious)+ parseInt(item.units) * parseInt(item.price);
                    }
                })
            }

            var subscriptionsToday = 0;
            var redemptionsToday = 0;
            if (this.props.price.priceToday && this.props.price.priceToday.length) {
                this.props.price.priceToday.map(function (item, index) {
                    if (item.amount > 0 && item.dealType == "BUY") {
                        subscriptionsToday = parseInt(subscriptionsToday) + parseInt(item.amount);
                    }
                    else if (item.units > 0 && item.dealType == "BUY" && item.price) {
                        subscriptionsToday = parseInt(subscriptionsToday)+ parseInt(item.units) * parseInt(item.price);
                    }
                    if (item.amount > 0 && item.dealType == "SELL") {
                        redemptionsToday = parseInt(redemptionsToday)+parseInt(item.amount);
                    }
                    else if (item.units > 0 && item.dealType == "SELL" && item.price) {
                        redemptionsToday =parseInt(redemptionsToday)+ parseInt(item.units) * parseInt(item.price);
                    }
                })
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
                                        <div className="row align-items-center justify-content-center h-50">
                                            <h5>Net Inflows/Outflows</h5>
                                            <h2><span>&#163;</span>{parseInt(subscriptionsPrevious) + parseInt(redemptionsPrevious)}<span
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
                                        <div className="row align-items-center justify-content-center h-50">

                                            <h5>Net Inflows/Outflows</h5>
                                            <h2><span>&#163;</span>{parseInt(subscriptionsToday) + parseInt(redemptionsToday)}<span
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
                                        <div className="row align-items-center justify-content-center h-50">
                                            <h5>Net Inflows/Outflows</h5>
                                            <h2><span>&#163;</span>{parseInt(subscriptionsNext) + parseInt(redemptionsNext)}<span
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
    userActions: PropTypes.object,
    user: PropTypes.array
};

const
    mapDispatchToProps = (dispatch) => ({
        userActions: bindActionCreators(userActions, dispatch)
    });


export default connect(mapStateToProps,
    mapDispatchToProps)(BoxToday);
