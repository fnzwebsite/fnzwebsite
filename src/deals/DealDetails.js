import {connect} from 'react-redux';
import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom'
class DealDetails extends React.Component {

  constructor(props) {
      super(props)
      // this.state = {
      //   this.props.price.acdToday
      // }
      //  alert(JSON.stringify(this.props.location.state.data[0].boxDate));
      console.log(JSON.stringify(this.props));
    }


    render() {
      let subscriptions = 0;
      let redemptions = 0;
      let netInflowOutflow = 0;
      // let broughtForward = 0;
      // let carryForward = 0;

      if(this.props.location.state.data && this.props.location.state.data) {
        //  console.log(JSON.stringify(this.props.acdTodayData));
          subscriptions = parseFloat(subscriptions) + parseFloat(this.props.location.state.data[0].unitsPurchased) * parseFloat(this.props.location.state.data[0].roundedPrice);
          redemptions = parseFloat(redemptions) + parseFloat(this.props.location.state.data[0].unitsSold) * parseFloat(this.props.location.state.data[0].roundedPrice);
        //  broughtForward = parseFloat(broughtForward) + parseFloat(this.props.location.state.data[0].totalUnitsBroughtForwardBalance);
        //  carryForward = parseFloat(carryForward) + parseFloat(this.props.location.state.data[0].totalUnitsCarriedForward);
          netInflowOutflow = parseFloat(subscriptions) - parseFloat(redemptions);
          subscriptions = parseFloat(subscriptions).toFixed(4);
          redemptions = parseFloat(redemptions).toFixed(4);
          netInflowOutflow = parseFloat(netInflowOutflow).toFixed(4);
          console.log("subscriptions:"+subscriptions+"redemptions:"+redemptions+"netInflowOutflow:"+netInflowOutflow);
          // broughtForward = parseFloat(broughtForward).toFixed(4);
          // carryForward = parseFloat(carryForward).toFixed(4);
          //console.log(broughtForward);
          //console.log(carryForward);
      }

        return (
          <div class="uk-grid uk-grid-divider uk-grid-medium">
                                               <div class="uk-width-large-2-10 lt-details">
                                                   <h2>Calendar</h2>
                                                   <h5>{this.props.location.state.data[0].boxDate}</h5>
                                                   <hr class="uk-grid-divider"/>
                                                   <div class="uk-grid uk-grid-small">
                                                       <h2>Box Status</h2>
                                                       <h5>{this.props.location.state.data[0].boxStatus}</h5>
                                                   </div>

                                                   <hr class="uk-grid-divider"/>
                                                   <div class="uk-grid uk-grid-small">
                                                       <h2>Subscriptions</h2>
                                                       <h5>{convertCurrency(subscriptions)}</h5>
                                                   </div>

                                                   <hr class="uk-grid-divider"/>
                                                   <div class="uk-grid uk-grid-small">
                                                       <h2>Redemptions</h2>
                                                       <h5>{convertCurrency(redemptions)}</h5>
                                                   </div>

                                                   <hr class="uk-grid-divider"/>
                                                   <div class="uk-grid uk-grid-small">
                                                       <h2>Net Flow</h2>
                                                       <h5>{convertCurrency(netInflowOutflow)}</h5>
                                                   </div>

                                                   <hr class="uk-grid-divider"/>
                                                   <div class="uk-grid uk-grid-small">
                                                       <h2>Price Date</h2>
                                                       <h5>{this.props.location.state.data[0].priceDate}</h5>
                                                   </div>

                                                   <hr class="uk-grid-divider"/>
                                                   <div class="uk-grid uk-grid-small">
                                                       <h2>Settlement Date</h2>
                                                       <h5>{this.props.location.state.data[0].settlementDate}</h5>
                                                   </div>

                                               </div>
                                               <div class="uk-width-large-8-10 rt-details">
                                                   <div class="md-card-content">
                                                       <table id="dt_colVis" class="uk-table" cellspacing="0" width="100%">
                                                           <thead>
                                                               <tr>
                                                                   <th class="uk-width-2-10">ISIN</th>
                                                                   <th class="uk-width-2-10">Subscriptions</th>
                                                                   <th class="uk-width-2-10">Redemptions</th>
                                                                   <th class="uk-width-1-10">Netflow</th>
                                                                   <th class="uk-width-1-10">Price</th>
                                                               </tr>
                                                           </thead>
                                                           <tbody>
                                                               <tr>
                                                                   <td>GBX0001</td>
                                                                   <td><span>&#163;</span>360,000</td>
                                                                   <td><span>&#163;</span>160,000</td>
                                                                   <td><span>&#163;</span>200,000</td>
                                                                   <td><span>&#163;</span>1.0</td>
                                                               </tr>
                                                               <tr>
                                                                   <td>GBX0001</td>
                                                                   <td><span>&#163;</span>360,000</td>
                                                                   <td><span>&#163;</span>160,000</td>
                                                                   <td><span>&#163;</span>200,000</td>
                                                                   <td><span>&#163;</span>1.0</td>
                                                               </tr>
                                                               <tr>
                                                                   <td>GBX0001</td>
                                                                   <td><span>&#163;</span>360,000</td>
                                                                   <td><span>&#163;</span>160,000</td>
                                                                   <td><span>&#163;</span>200,000</td>
                                                                   <td><span>&#163;</span>1.0</td>
                                                               </tr>
                                                               <tr>
                                                                   <td>GBX0001</td>
                                                                   <td><span>&#163;</span>360,000</td>
                                                                   <td><span>&#163;</span>160,000</td>
                                                                   <td><span>&#163;</span>200,000</td>
                                                                   <td><span>&#163;</span>1.0</td>
                                                               </tr>
                                                               <tr>
                                                                   <td>GBX0001</td>
                                                                   <td><span>&#163;</span>360,000</td>
                                                                   <td><span>&#163;</span>160,000</td>
                                                                   <td><span>&#163;</span>200,000</td>
                                                                   <td><span>&#163;</span>1.0</td>
                                                               </tr>
                                                               <tr>
                                                                   <td>GBX0001</td>
                                                                   <td><span>&#163;</span>360,000</td>
                                                                   <td><span>&#163;</span>160,000</td>
                                                                   <td><span>&#163;</span>200,000</td>
                                                                   <td><span>&#163;</span>1.0</td>
                                                               </tr>
                                                               <tr>
                                                                   <td>GBX0001</td>
                                                                   <td><span>&#163;</span>360,000</td>
                                                                   <td><span>&#163;</span>160,000</td>
                                                                   <td><span>&#163;</span>200,000</td>
                                                                   <td><span>&#163;</span>1.0</td>
                                                               </tr>
                                                               <tr>
                                                                   <td>GBX0001</td>
                                                                   <td><span>&#163;</span>360,000</td>
                                                                   <td><span>&#163;</span>160,000</td>
                                                                   <td><span>&#163;</span>200,000</td>
                                                                   <td><span>&#163;</span>1.0</td>
                                                               </tr>
                                                               <tr>
                                                                   <td>GBX0001</td>
                                                                   <td><span>&#163;</span>360,000</td>
                                                                   <td><span>&#163;</span>160,000</td>
                                                                   <td><span>&#163;</span>200,000</td>
                                                                   <td><span>&#163;</span>1.0</td>
                                                               </tr>
                                                               <tr>
                                                                   <td>GBX0001</td>
                                                                   <td><span>&#163;</span>360,000</td>
                                                                   <td><span>&#163;</span>160,000</td>
                                                                   <td><span>&#163;</span>200,000</td>
                                                                   <td><span>&#163;</span>1.0</td>
                                                               </tr>
                                                               <tr>
                                                                   <td>GBX0001</td>
                                                                   <td><span>&#163;</span>360,000</td>
                                                                   <td><span>&#163;</span>160,000</td>
                                                                   <td><span>&#163;</span>200,000</td>
                                                                   <td><span>&#163;</span>1.0</td>
                                                               </tr>
                                                               <tr>
                                                                   <td>GBX0001</td>
                                                                   <td><span>&#163;</span>360,000</td>
                                                                   <td><span>&#163;</span>160,000</td>
                                                                   <td><span>&#163;</span>200,000</td>
                                                                   <td><span>&#163;</span>1.0</td>
                                                               </tr>
                                                               <tr>
                                                                   <td>GBX0001</td>
                                                                   <td><span>&#163;</span>360,000</td>
                                                                   <td><span>&#163;</span>160,000</td>
                                                                   <td><span>&#163;</span>200,000</td>
                                                                   <td><span>&#163;</span>1.0</td>
                                                               </tr>
                                                               <tr>
                                                                   <td>GBX0001</td>
                                                                   <td><span>&#163;</span>360,000</td>
                                                                   <td><span>&#163;</span>160,000</td>
                                                                   <td><span>&#163;</span>200,000</td>
                                                                   <td><span>&#163;</span>1.0</td>
                                                               </tr>
                                                           </tbody>
                                                       </table>
                                                   </div>
                                               </div>
                                           </div>

        )
    }
}

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
export default DealDetails;
