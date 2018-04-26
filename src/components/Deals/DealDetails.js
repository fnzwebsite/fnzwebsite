import {connect} from 'react-redux';
import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import 'datatables.net';
import PropTypes from 'prop-types';
import {boxDataCalculation,convertCurrency} from '../../helpers/boxDataCalculation';


var createReactClass = require('create-react-class');
var tableAsJqeryElement = null;
var Table = createReactClass({
  componentDidUpdate: function (prevProps, prevState) {
        this.loadDataTable();
    },
    componentWillReceiveProps: function (prevProps, prevState) {
        if (prevProps.loadThisDay != this.props.loadThisDay || prevProps.dealingData != this.props.dealingData) {
            if (tableAsJqeryElement) {
                tableAsJqeryElement.fnDestroy();
                tableAsJqeryElement = null;
            }
        }
        this.loadDataTable();
    },
    loadDataTable: function () {
        let self = this;
        setTimeout(function () {
            tableAsJqeryElement = $('#table').dataTable({
               "order": [[0, "desc"]]

            });
            if (tableAsJqeryElement) {
                tableAsJqeryElement.fnDraw();
            }

            $('#table tbody').on('click', 'a.handle-edit-modal', function (e) {
                let key = $(this).data("id")
                let acdEditData = self.props.acdData[key];
                self.props.loadEditAcdData(acdEditData);
            });
        }, 0)
    },

    render: function () {
      let LoadRows = null;
        let self = this;

        //alert("hi"+JSON.stringify(this.props.dealData));
        if (this.props.dealData) {
            LoadRows = Object.keys(self.props.dealData).sort((a, b) => b.name - a.name).map(function (keyName, keyIndex) {
                return <tr>
                    <td>{self.props.dealData[keyIndex].isin}</td>
                    <td>{self.props.dealData[keyIndex].subscriptions}</td>
                    <td>{self.props.dealData[keyIndex].redemptions}</td>
                    <td>{self.props.dealData[keyIndex].netFlow}</td>
                    <td>{self.props.dealData[keyIndex].roundedPrice}</td>
                </tr>
            });

            LoadRows = LoadRows.filter(function (item) {
                return item != undefined
            })

            return (
                <div style={{minHeight: '200px'}}>
                    <table id="table" className="stripe" cellSpacing="0" width="100%">
                        <thead>
                        <tr>
                            <th>ISIN</th>
                            <th>Subscriptions</th>
                            <th>Redemptions</th>
                            <th>Netflow</th>
                            <th>Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {LoadRows}
                        </tbody>
                    </table>

                </div>
            );
        } else {
            return <p>no data</p>;
        }
    },

});

class DealDetails extends React.Component {
  constructor(props) {
      super(props);
      this.state={
        boxData:boxDataCalculation(this.props.location.state.data)
      };

    }

    componentDidMount()
    {
      this.props=null;
    }

    render() {

      let subscriptions = 0;
      let redemptions = 0;
      let netInflowOutflow = 0;
      var isin=[];
      let subscriptionSum=0;
      let redemptionSum=0;
      let netflowSum=0;
      let roundedPrice=0;
      let unitDeals=0;
      let cashBuys=0;
      let cashSells=0;
      let isinkey=0;
      let price=0;
      var tableData=[];
      let cashData =null;
      // let broughtForward = 0;
      // let carryForward = 0;
      console.log('hi'+JSON.stringify(this.state.boxData.subscriptions));
      for (var i = 0; i < this.props.location.state.data.length; i++) {
        if($.inArray(this.props.location.state.data[i].instrumentKey, this.props.location.state.data[i])==-1)
        {
            isin.push(this.props.location.state.data[i].instrumentKey);
            //isin.splice(i,0,this.props.location.state.data[i].instrumentIsin);
            console.log("isin:"+isin);
        }
   }

   for(var i=0;i < isin.length; i++)
   {
      for(var j=0;j < this.props.location.state.data.length; j++)
      {
        if(isin[i]==this.props.location.state.data[j].instrumentKey)
        {
          if(this.props.location.state.data[j].cash && this.props.location.state.data[j].cash.length)
          {
            cashData=0
            for(var k=0;k<this.props.location.state.data[j].cash.length;k++)
            {
              if(this.props.location.state.data[j].cash[k]>0)
              {
                cashBuys=parseFloat(cashBuys)+parseFloat(this.props.location.state.data[j].cash[k]);
              }
              else {
                cashSells=parseFloat(cashSells)+parseFloat(this.props.location.state.data[j].cash[k]);
              }
            }
          }
          //cashSells = cashSells*(-1)
          subscriptionSum=cashBuys+parseFloat(subscriptionSum) + parseFloat(this.props.location.state.data[j].unitsPurchased) * parseFloat(this.props.location.state.data[j].roundedPrice);
          redemptionSum=cashSells+parseFloat(redemptionSum) + parseFloat(this.props.location.state.data[j].unitsSold) * parseFloat(this.props.location.state.data[j].roundedPrice);
          netflowSum = parseFloat(subscriptionSum) + parseFloat(redemptionSum);
          roundedPrice = parseFloat(this.props.location.state.data[j].roundedPrice);
          if(redemptionSum<0)
          {
            redemptionSum=redemptionSum * (-1);
          }
          if(netflowSum<0)
          {
            netflowSum=netflowSum * (-1);
          }
        }
      }
     if(cashData!=null)
     {
      tableData.push({
        "isin":isin[i],
        "subscriptions":subscriptionSum,
        "redemptions":redemptionSum,
        "netFlow":netflowSum,
        "roundedPrice":roundedPrice
      })
     }

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
                                                    <h5>{convertCurrency(this.state.boxData[0].subscriptions)}</h5>
                                                </div>

                                                <hr class="uk-grid-divider"/>
                                                <div class="uk-grid uk-grid-small">
                                                    <h2>Redemptions</h2>
                                                    <h5 className='fund-orange'>{this.state.boxData[0].redemptions<0?convertCurrency((this.state.boxData[0].redemptions)*(-1)):convertCurrency(this.state.boxData[0].redemptions)}</h5>
                                                </div>

                                                <hr class="uk-grid-divider"/>
                                                <div class="uk-grid uk-grid-small">
                                                    <h2>Net Flow</h2>
                                                    <h5>{this.state.boxData[0].redemptions<0?convertCurrency((this.state.boxData[0].netFlow)*(-1)):convertCurrency(this.state.boxData[0].netFlow)}</h5>
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

                                                     <Table id="dt_colVis" class="uk-table" cellspacing="0" width="100%" dealData={tableData}/>

                                                </div>
                                          </div>
                                        </div>

     )
 }
}

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

const
    mapStateToProps = (state, props) => {
        return {
            dealData: this.props.tableData
        }
    };


DealDetails.propTypes = {
    dealData: PropTypes.array
};


export default DealDetails;
