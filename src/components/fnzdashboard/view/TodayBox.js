import {connect} from 'react-redux';
import React from 'react';
import {bindActionCreators} from 'redux';
// import acdActions from '../actions/acdActions';
import {fetchAcdToday} from '../actions/acdToday';

import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import moment from "moment";
import {boxDataCalculation, convertCurrency} from 'components/Common/function/BoxDataCalculation';

class TodayBox extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            boxData: null
        }
    }

    componentWillMount() {
        var date = moment().format("YYYY-MM-DD");
        this.props.fetchAcdToday(date, localStorage.getItem('acdId'))
//        console.log(JSON.stringify(this.props.acdToday));
    }

    render() {
        if (this.props.today) {
            this.state = {
                boxData: boxDataCalculation(this.props.today)
            }
            //  console.log(JSON.stringify(this.props.acdTodayData));
            // subscriptionsToday = parseFloat(subscriptionsToday) + parseFloat(this.props.acdTodayData[0].unitsPurchased) * parseFloat(this.props.acdTodayData[0].roundedPrice);
            // redemptionsToday = parseFloat(redemptionsToday) + parseFloat(this.props.acdTodayData[0].unitsSold) * parseFloat(this.props.acdTodayData[0].roundedPrice);
            // broughtForwardToday = parseFloat(broughtForwardToday) + parseFloat(this.props.acdTodayData[0].totalUnitsBroughtForwardBalance);
            // carryForwardToday = parseFloat(carryForwardToday) + parseFloat(this.props.acdTodayData[0].totalUnitsCarriedForward);
            // netInflowOutflowToday = parseFloat(subscriptionsToday) - parseFloat(redemptionsToday);
            // subscriptionsToday = parseFloat(subscriptionsToday).toFixed(4);
            // redemptionsToday = parseFloat(redemptionsToday).toFixed(4);
            // netInflowOutflowToday = parseFloat(netInflowOutflowToday).toFixed(4);
            // broughtForwardToday = parseFloat(broughtForwardToday).toFixed(4);
            // carryForwardToday = parseFloat(carryForwardToday).toFixed(4);
            //console.log(broughtForwardToday);
            //console.log(carryForwardToday);
        }
        if (this.props.today) {
            return (
                <div>

                    <div className="row con col-with-divider py-3 px-2">
                        <div className="col-md-4">
                            <div className="stack-order">
                                <h4 className="">
                                    {convertCurrency(this.state.boxData[0].subscriptions)}
                                </h4>
                                <span className="">subscriptions</span>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="stack-order">
                                <h4 className="text-warning">
                                    {this.state.boxData[0].redemptions < 0 ? convertCurrency((this.state.boxData[0].redemptions) * (-1)) : convertCurrency(this.state.boxData[0].redemptions)}
                                </h4>
                                <span className="">Redemptions</span>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="stack-order">
                                <h4 className={this.state.boxData[0].netFlow < 0 ? "text-warning" : ""}>{this.state.boxData[0].netFlow < 0 ? convertCurrency((this.state.boxData[0].netFlow) * (-1)) : convertCurrency(this.state.boxData[0].netFlow)}</h4>
                                <span className="">Net In / Out Flow</span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else {

            return (
                <div style={{height: '125px'}}>

                    <div className="preloader">
                        <span className="line line-1"></span>
                        <span className="line line-2"></span>
                        <span className="line line-3"></span>
                        <span className="line line-4"></span>
                        <span className="line line-5"></span>
                        <span className="line line-6"></span>
                        <span className="line line-7"></span>
                        <span className="line line-8"></span>
                        <span className="line line-9"></span>
                        <div>Loading</div>
                    </div>
                </div>
            );

        }


    }


}

const mapStateToProps = ({acdToday}) => {
    const {
        today,
    } = acdToday;
    return {
        today,
    }
};
export default connect(mapStateToProps, {
    fetchAcdToday,
})(TodayBox);
