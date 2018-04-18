import {connect} from 'react-redux';
import React from 'react';
import moment from 'moment'
import * as acdActions from '../../actions/acdActions';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import { Redirect} from 'react-router-dom';

class NextBox extends React.Component {

  constructor(props) {
      super(props)
      this.state = {
        acdNextData:null
      }
  }
  componentWillReceiveProps(nextProps) {
  this.setState({acdNextData: nextProps.acdNextData})
  }
    render() {
      let subscriptionsNext = 0;
      let redemptionsNext = 0;
      let netInflowOutflowNext = 0;
      let broughtForwardNext = 0;
      let carryForwardNext = 0;

      if(this.state.acdNextData && this.state.acdNextData.length) {
        subscriptionsNext = parseFloat(subscriptionsNext) + parseFloat(this.state.acdNextData[0].unitsPurchased) * parseFloat(this.state.acdNextData[0].roundedPrice);
        redemptionsNext = parseFloat(redemptionsNext) + parseFloat(this.state.acdNextData[0].unitsSold) * parseFloat(this.state.acdNextData[0].roundedPrice);
        broughtForwardNext = parseFloat(broughtForwardNext) + parseFloat(this.state.acdNextData[0].totalUnitsBroughtForwardBalance);
        carryForwardNext = parseFloat(carryForwardNext) + parseFloat(this.state.acdNextData[0].totalUnitsCarriedForward);
        netInflowOutflowNext = parseFloat(subscriptionsNext) - parseFloat(redemptionsNext);
        subscriptionsNext = parseFloat(subscriptionsNext).toFixed(4);
        redemptionsNext = parseFloat(redemptionsNext).toFixed(4);
        netInflowOutflowNext = parseFloat(netInflowOutflowNext).toFixed(4);
        broughtForwardNext = parseFloat(broughtForwardNext).toFixed(4);
        carryForwardNext = parseFloat(carryForwardNext).toFixed(4);
      }
      if(this.state.acdNextData)
      {
return (
  <div className="row">
      <div className="col-6 open">
          <div className="row align-items-center justify-content-center h-100">
              <h5>Net In/Out Flow</h5>
              <h2 className={netInflowOutflowNext < 0 ? 'fund-orange':'fund-blue'}>{netInflowOutflowNext<0?convertCurrency(netInflowOutflowNext*(-1)):convertCurrency(netInflowOutflowNext)}<span className="sub-text" style={{display:'none'}}>mn</span></h2>
          </div>
      </div>
      <div className="col-6 closed">
          <div className="row">
              <div className="col-sm-12 sub-sec">
                  <h5>Subscriptions</h5>
                  <h2 className='fund-blue'>{convertCurrency(subscriptionsNext)}</h2>
              </div>
          </div>
          <hr/>
              <div className="row">
                  <div className="col-sm-12">
                      <h5>Redemptions</h5>
                      <h2 className='fund-orange'>{redemptionsNext<0?convertCurrency(redemptionsNext*(-1)):convertCurrency(redemptionsNext)}</h2>
                  </div>
              </div>
              <hr/>
                  <div className="row">
                      <div className="col-sm-12">
                          <h5>Brought Forward</h5>
                          <h2>{(broughtForwardNext)} Units</h2>
                      </div>
                  </div>
                  <hr/>
                      <div className="row">
                          <div className="col-sm-12">
                              <h5>Carry Forward</h5>
                              <h2>{(carryForwardNext)} Units</h2>
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

NextBox.propTypes = {
  acdNextData:PropTypes.array
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
    mapDispatchToProps)(NextBox);
