import {connect} from 'react-redux';
import React from 'react';
import moment from 'moment'
import * as acdActions from '../../actions/acdActions';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import { Redirect} from 'react-router-dom';
import {boxDataCalculation,convertCurrency} from '../../helpers/boxDataCalculation';

class TodayBox extends React.Component {

  constructor(props) {
      super(props)
      this.state = {
        acdTodayData:null
      }
  }

  // componentWillReceiveProps(nextProps) {
  // this.setState({acdTodayData: nextProps.acdTodayData})
  // }


    render() {
      // let subscriptionsToday = 0;
      // let redemptionsToday = 0;
      // let netInflowOutflowToday = 0;
      let broughtForwardToday = 0;
      let carryForwardToday = 0;

      if(this.props.acdTodayData && this.props.acdTodayData.length) {
        this.state={
          boxData:boxDataCalculation(this.props.acdTodayData)
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
          broughtForwardToday = parseFloat(broughtForwardToday).toFixed(4);
          carryForwardToday = parseFloat(carryForwardToday).toFixed(4);
          //console.log(broughtForwardToday);
          //console.log(carryForwardToday);
      }
      if(this.props.acdTodayData)
      {
return (<div className="row">
    <div className="col-6 open">
        <div className="row align-items-center justify-content-center h-100">
            <h5>Net In/Out Flow</h5>
            <h2 className={this.state.boxData[0].netFlow < 0 ? 'fund-orange wrap-space':'fund-blue wrap-space'}>{this.state.boxData[0].netFlow<0?convertCurrency((this.state.boxData[0].netFlow)*(-1)):convertCurrency(this.state.boxData[0].netFlow)}</h2>
        </div>
    </div>
    <div className="col-6 closed">
        <div className="row">
            <div className="col-sm-12 sub-sec">
                <h5>Subscriptions</h5>
                <h2 className='fund-blue'>{convertCurrency(this.state.boxData[0].subscriptions)}</h2>
            </div>
        </div>
        <hr/>
            <div className="row">
                <div className="col-sm-12">
                    <h5>Redemptions</h5>
                    <h2 className='fund-orange'>{this.state.boxData[0].redemptions<0?convertCurrency((this.state.boxData[0].redemptions)*(-1)):convertCurrency(this.state.boxData.redemptions)}</h2>
                </div>
            </div>
            <hr/>
                <div className="row">
                    <div className="col-sm-12">
                        <h5>Brought Forward</h5>
                        <h2>{(broughtForwardToday)} Units</h2>
                    </div>
                </div>
                <hr/>
                    <div className="row">
                        <div className="col-sm-12">
                            <h5>Carry Forward</h5>
                            <h2>{(carryForwardToday)} Units</h2>
                        </div>
                    </div>
    </div>
</div>);
}
else {
  return(
    <div style={{height:'200px'}}>

    <div class="preloader">
                             <span class="line line-1"></span>
                             <span class="line line-2"></span>
                             <span class="line line-3"></span>
                             <span class="line line-4"></span>
                             <span class="line line-5"></span>
                             <span class="line line-6"></span>
                             <span class="line line-7"></span>
                             <span class="line line-8"></span>
                             <span class="line line-9"></span>
                             <div>Loading</div>
                         </div>
                         </div>
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

TodayBox.propTypes = {
};

const
    mapDispatchToProps = (dispatch) => ({
        acdActions: bindActionCreators(acdActions, dispatch)
    });

    // function convertCurrency(currency)
    // {
    //   return (
    //     <span>
    //     {new Intl.NumberFormat('en-GB', {
    //     style: 'currency',
    //     currency: 'GBP'
    //     }).format(currency)}
    //     </span>
    //     )
    // }

export default connect(mapStateToProps,
    mapDispatchToProps)(TodayBox);
