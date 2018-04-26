import {connect} from 'react-redux';
import React from 'react';
import moment from 'moment'
import * as acdActions from '../../actions/acdActions';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import { Redirect} from 'react-router-dom';
import {boxDataCalculation,convertCurrency} from '../../helpers/boxDataCalculation';

class PreviousBox extends React.Component {

  constructor(props) {
      super(props)
      this.state = {
        acdPrevData:null
      }
  }

  // componentWillReceiveProps(nextProps) {
  // this.setState({acdPrevData: nextProps.acdPrevData})
  // }

    render() {
      // let subscriptionsPrevious = 0;
      // let redemptionsPrevious = 0;
      // let netInflowOutflowPrevious = 0;
      let broughtForwardPrevious = 0;
      let carryForwardPrevious = 0;

      if(this.props.acdPrevData  && this.props.acdPrevData.length) {
        this.state={
          boxData:boxDataCalculation(this.props.acdPrevData)
        }
          // subscriptionsPrevious = parseFloat(subscriptionsPrevious) + parseFloat(this.props.acdPrevData[0].unitsPurchased) * parseFloat(this.props.acdPrevData[0].roundedPrice);
          // redemptionsPrevious = parseFloat(redemptionsPrevious) + parseFloat(this.props.acdPrevData[0].unitsSold) * parseFloat(this.props.acdPrevData[0].roundedPrice);
          // broughtForwardPrevious = parseFloat(broughtForwardPrevious) + parseFloat(this.props.acdPrevData[0].totalUnitsBroughtForwardBalance);
          // carryForwardPrevious = parseFloat(carryForwardPrevious) + parseFloat(this.props.acdPrevData[0].totalUnitsCarriedForward);
          // netInflowOutflowPrevious = parseFloat(subscriptionsPrevious) - parseFloat(redemptionsPrevious);
          // subscriptionsPrevious = parseFloat(subscriptionsPrevious).toFixed(4);
          // redemptionsPrevious = parseFloat(redemptionsPrevious).toFixed(4);
          // netInflowOutflowPrevious = parseFloat(netInflowOutflowPrevious).toFixed(4);
          broughtForwardPrevious = parseFloat(broughtForwardPrevious).toFixed(4);
          carryForwardPrevious = parseFloat(carryForwardPrevious).toFixed(4);
      }
      if(this.props.acdPrevData)
      {
return (
  <div className="row">
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
                      <h2 className='fund-orange'>{this.state.boxData[0].redemptions<0?convertCurrency((this.state.boxData[0].redemptions)*(-1)):convertCurrency(this.state.boxData[0].redemptions)}</h2>
                  </div>
              </div>
              <hr/>
                  <div className="row">
                      <div className="col-sm-12">
                          <h5>Brought Forward</h5>
                          <h2>{(broughtForwardPrevious)} Units</h2>
                      </div>
                  </div>
                  <hr/>
                      <div className="row">
                          <div className="col-sm-12">
                              <h5>Carry Forward</h5>
                              <h2>{(carryForwardPrevious)} Units</h2>
                          </div>
                      </div>
      </div>
  </div>

);
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

PreviousBox.propTypes = {
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
    mapDispatchToProps)(PreviousBox);
