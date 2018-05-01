import {connect} from 'react-redux';
import React from 'react';
import moment from 'moment'
import acdActions from '../../actions/acdActions';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import { Redirect} from 'react-router-dom';
import TodayBox from './TodayBox'
import PreviousBox from './PreviousBox'
import NextBox from './NextBox'
import {Link} from 'react-router-dom';

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
        this.props.acdActions.getAcd('today',localStorage.getItem('acdId'))
        this.props.acdActions.getAcd('next',localStorage.getItem('acdId'))
        this.props.acdActions.getAcd('previous',localStorage.getItem('acdId'))
    }

    componentWillReceiveProps(nextProps) {
        // this.props.acdActions.getAcd('today',localStorage.getItem('acdId'))
        // this.props.acdActions.getAcd('next',localStorage.getItem('acdId'))
        // this.props.acdActions.getAcd('previous',localStorage.getItem('acdId'))
    }

    render() {
        var today = moment().format("YYYY-MM-DD");
        var tomorrow = moment().add('days', 1).format("YYYY-MM-DD");
        var yesterday = moment().add('days', -1).format("YYYY-MM-DD");
        var todayData =[];
        var previousData =[];
        var nextData=[];
        //console.log(this.props.dealingData);
        if (this.props.dealingData == "logout") {
            return <Redirect to={{ pathname: '/login', state: { from: this.props.location } }} />
        }
        if(this.props.price.acdToday && this.props.price.acdToday.length){
          for(var i=0;i<this.props.price.acdToday.length;i++){
            todayData[i]=this.props.price.acdToday[i];
          }
        }
        else{
          todayData=[{ "cash": null,
          "units": null,
          "boxDate": today,
          "boxStatus": "Open",
          "totalUnitsBroughtForwardBalance": "0",
          "unitsPurchased": "0",
          "unitsSold": "0",
          "unitsFromAdjustments": "0",
          "unitsFromCancellations": "0",
          "unitsFromConversionIn": "0",
          "unitsFromConversionOut": "0",
          "unitsCreatedCancelledNet": "0",
          "totalUnitsCarriedForward": "0",
          "roundedPrice": "0",
          "incomePrice": "0",
          "capitalPrice": "0",
          "dilutionLevy": "0",
          "amountDueCapital": "0",
          "amountDueIncome": "0",
          "amountDueTotal": "0",
          "settlementDate": "0",
          "instrumentKey": "",
          "instrumentName": "",
          "instrumentIsin": "",
          "priceDate": "",
          "docType": "BOX",
          "status": 10
      }]
        }

        if(this.props.price.acdPrevious && this.props.price.acdPrevious.length){
          for(var i=0;i<this.props.price.acdPrevious.length;i++){
            previousData[i]=this.props.price.acdPrevious[i];
          }
        }
        else{
          previousData=[{ "cash": null,
          "units": null,
          "boxDate": yesterday,
          "boxStatus": "Open",
          "totalUnitsBroughtForwardBalance": "0",
          "unitsPurchased": "0",
          "unitsSold": "0",
          "unitsFromAdjustments": "0",
          "unitsFromCancellations": "0",
          "unitsFromConversionIn": "0",
          "unitsFromConversionOut": "0",
          "unitsCreatedCancelledNet": "0",
          "totalUnitsCarriedForward": "0",
          "roundedPrice": "0",
          "incomePrice": "0",
          "capitalPrice": "0",
          "dilutionLevy": "0",
          "amountDueCapital": "0",
          "amountDueIncome": "0",
          "amountDueTotal": "0",
          "settlementDate": "0",
          "instrumentKey": "",
          "instrumentName": "",
          "instrumentIsin": "",
          "priceDate": "",
          "docType": "BOX",
          "status": 10
      }]
        }
        if(this.props.price.acdNext && this.props.price.acdNext.length){
          for(var i=0;i<this.props.price.acdNext.length;i++){
            nextData[i]=this.props.price.acdNext[i];
          }
        }
        else{
          nextData=[{ "cash": null,
          "units": null,
          "boxDate": tomorrow,
          "boxStatus": "Open",
          "totalUnitsBroughtForwardBalance": "0",
          "unitsPurchased": "0",
          "unitsSold": "0",
          "unitsFromAdjustments": "0",
          "unitsFromCancellations": "0",
          "unitsFromConversionIn": "0",
          "unitsFromConversionOut": "0",
          "unitsCreatedCancelledNet": "0",
          "totalUnitsCarriedForward": "0",
          "roundedPrice": "0",
          "incomePrice": "0",
          "capitalPrice": "0",
          "dilutionLevy": "0",
          "amountDueCapital": "0",
          "amountDueIncome": "0",
          "amountDueTotal": "0",
          "settlementDate": "0",
          "instrumentKey": "",
          "instrumentName": "",
          "instrumentIsin": "",
          "priceDate": "",
          "docType": "BOX",
          "status": 10
      }]
        }
        //if (this.props.price.acdToday && this.props.price.acdToday.length) {
            //console.log("hi")
            // let subscriptionsPrevious = 0;
            // let redemptionsPrevious = 0;
            // let netInflowOutflowPrevious = 0;
            // let broughtForwardPrevious = 0;
            // let carryForwardPrevious = 0;
            //


            // let subscriptionsToday = 0;
            // let redemptionsToday = 0;
            // let netInflowOutflowToday = 0;
            // let broughtForwardToday = 0;
            // let carryForwardToday = 0;

            // if(this.props.price.acdToday && this.props.price.acdToday.length) {
            //   //  console.log(JSON.stringify(this.props.price.acdToday));
            //     subscriptionsToday = parseFloat(subscriptionsToday) + parseFloat(this.props.price.acdToday[0].unitsPurchased) * parseFloat(this.props.price.acdToday[0].roundedPrice);
            //     redemptionsToday = parseFloat(redemptionsToday) + parseFloat(this.props.price.acdToday[0].unitsSold) * parseFloat(this.props.price.acdToday[0].roundedPrice);
            //     broughtForwardToday = parseFloat(broughtForwardToday) + parseFloat(this.props.price.acdToday[0].totalUnitsBroughtForwardBalance);
            //     carryForwardToday = parseFloat(carryForwardToday) + parseFloat(this.props.price.acdToday[0].totalUnitsCarriedForward);
            //     netInflowOutflowToday = parseFloat(subscriptionsToday) - parseFloat(redemptionsToday);
            //     subscriptionsToday = parseFloat(subscriptionsToday).toFixed(4);
            //     redemptionsToday = parseFloat(redemptionsToday).toFixed(4);
            //     netInflowOutflowToday = parseFloat(netInflowOutflowToday).toFixed(4);
            //     broughtForwardToday = parseFloat(broughtForwardToday).toFixed(4);
            //     carryForwardToday = parseFloat(carryForwardToday).toFixed(4);
            //     //console.log(broughtForwardToday);
            //     //console.log(carryForwardToday);
            // }
            // if(this.props.price.acdPrevious && this.props.price.acdPrevious.length) {
            //     subscriptionsPrevious = parseFloat(subscriptionsPrevious) + parseFloat(this.props.price.acdPrevious[0].unitsPurchased) * parseFloat(this.props.price.acdPrevious[0].roundedPrice);
            //     redemptionsPrevious = parseFloat(redemptionsPrevious) + parseFloat(this.props.price.acdPrevious[0].unitsSold) * parseFloat(this.props.price.acdPrevious[0].roundedPrice);
            //     broughtForwardPrevious = parseFloat(broughtForwardPrevious) + parseFloat(this.props.price.acdPrevious[0].totalUnitsBroughtForwardBalance);
            //     carryForwardPrevious = parseFloat(carryForwardPrevious) + parseFloat(this.props.price.acdPrevious[0].totalUnitsCarriedForward);
            //     netInflowOutflowPrevious = parseFloat(subscriptionsPrevious) - parseFloat(redemptionsPrevious);
            //     subscriptionsPrevious = parseFloat(subscriptionsPrevious).toFixed(4);
            //     redemptionsPrevious = parseFloat(redemptionsPrevious).toFixed(4);
            //     netInflowOutflowPrevious = parseFloat(netInflowOutflowPrevious).toFixed(4);
            //     broughtForwardPrevious = parseFloat(broughtForwardPrevious).toFixed(4);
            //     carryForwardPrevious = parseFloat(carryForwardPrevious).toFixed(4);
            // }

            // if(this.props.price.acdNext && this.props.price.acdNext.length) {
            //     subscriptionsNext = parseFloat(subscriptionsNext) + parseFloat(this.props.price.acdNext[0].unitsPurchased) * parseFloat(this.props.price.acdNext[0].roundedPrice);
            //     redemptionsNext = parseFloat(redemptionsNext) + parseFloat(this.props.price.acdNext[0].unitsSold) * parseFloat(this.props.price.acdNext[0].roundedPrice);
            //     broughtForwardNext = parseFloat(broughtForwardNext) + parseFloat(this.props.price.acdNext[0].totalUnitsBroughtForwardBalance);
            //     carryForwardNext = parseFloat(carryForwardNext) + parseFloat(this.props.price.acdNext[0].totalUnitsCarriedForward);
            //     netInflowOutflowNext = parseFloat(subscriptionsNext) - parseFloat(redemptionsNext);
            //     subscriptionsNext = parseFloat(subscriptionsNext).toFixed(4);
            //     redemptionsNext = parseFloat(redemptionsNext).toFixed(4);
            //     netInflowOutflowNext = parseFloat(netInflowOutflowNext).toFixed(4);
            //     broughtForwardNext = parseFloat(broughtForwardNext).toFixed(4);
            //     carryForwardNext = parseFloat(carryForwardNext).toFixed(4);
            // }

            return (
                <div className="row">
                    <div className="col-md-4 previous" onClick={() => this.changeView('previous')}>
                        <div className={this.state.selected == "previous" ? 'card funds selected':'card funds'}>
                            <div className="card-header">
                                <Link to={{ pathname: '/dealdetails', state: { data: previousData} }}><span className="badge bg-alice pull-right">Previous Day</span></Link></div>
                            <div className="dashboard_card">
                            <PreviousBox acdPrevData={previousData}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 today" onClick={() => this.changeView('today')}>
                        <div className={this.state.selected == "today" ? 'card funds selected':'card funds'}>
                            <div className="card-header">
                                <Link to={{ pathname: '/dealdetails', state: { data: todayData} }}><span className="badge bg-alice pull-right">Today</span></Link></div>
                            <div className="dashboard_card">
                              <TodayBox acdTodayData={todayData}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 next" onClick={() => this.changeView('next')}>
                        <div className={this.state.selected == "next" ? 'card funds selected':'card funds'}>
                            <div className="card-header">
                              <Link to={{ pathname: '/dealdetails', state: { data: nextData} }}><span className="badge bg-alice pull-right">Next Day</span></Link></div>
                            <div className="dashboard_card">
                            <NextBox acdNextData={nextData}/>
                            </div>
                        </div>
                    </div>
                </div>
            )
        // }
        // else {
        //     return (
        //       <div class="preloader">
        //                                <span class="line line-1"></span>
        //                                <span class="line line-2"></span>
        //                                <span class="line line-3"></span>
        //                                <span class="line line-4"></span>
        //                                <span class="line line-5"></span>
        //                                <span class="line line-6"></span>
        //                                <span class="line line-7"></span>
        //                                <span class="line line-8"></span>
        //                                <span class="line line-9"></span>
        //                                <div>Loading</div>
        //                            </div>
        //     )
        // }
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
    acdPrevious: PropTypes.array
};

const
    mapDispatchToProps = (dispatch) => ({
        acdActions: bindActionCreators(acdActions, dispatch)
    });

    function convertCurrency(currency)
    {
      return (
        <span>
        {new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP'
        }).format(currency)}
        </span>
        )
    }

export default connect(mapStateToProps,
    mapDispatchToProps)(BoxToday);
