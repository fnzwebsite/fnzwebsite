import {connect} from 'react-redux';
import React from 'react';
import io from "socket.io-client"
import moment from 'moment'
import * as dealingActions from '../actions/dealingActions';
import userActions from '../actions/user.actions';
import {bindActionCreators} from 'redux';
import { authHeader } from '../helpers';
import PropTypes from 'prop-types';


class TransactionsTable extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var today = moment().format("YYYY-MM-DD");
        var tomorrow = moment().add('days', 1).format("YYYY-MM-DD");
        var yesterday = moment().add('days', -1).format("YYYY-MM-DD");

        let LoadRows = null;
        let self = this;
        if(self.props.dealingData && self.props.dealingData.status != "401") {
            let self = this;
            if(self.props.loadThisDay == 'today') {
                LoadRows = Object.keys(self.props.dealingData).map(function (keyName, keyIndex) {
                    if (moment(self.props.dealingData[keyName].boxDate).isSame(today, 'd')) {
                        return <tr>
                            <td>{self.props.dealingData[keyName].tradeDate}</td>
                            <td>{self.props.dealingData[keyName].account}</td>
                            <td>{self.props.dealingData[keyName].instrumentKey}</td>
                            <td>{self.props.dealingData[keyName].dealType.toUpperCase()}</td>
                            <td>{self.props.dealingData[keyName].units}</td>
                            <td>{self.props.dealingData[keyName].amount}</td>
                            <td><span
                                className={self.props.dealingData[keyName].dealType.toUpperCase() == "BUY" ? "badge bg-green" : "badge bg-orange"}>Accepted</span>
                            </td>
                        </tr>
                    }
                });
            }
            if(self.props.loadThisDay == 'next') {
                LoadRows = Object.keys(self.props.dealingData).map(function (keyName, keyIndex) {
                    if (moment(self.props.dealingData[keyName].boxDate).isSame(tomorrow, 'd')) {
                        return <tr>
                            <td>{self.props.dealingData[keyName].boxDate}</td>
                            <td>{self.props.dealingData[keyName].account}</td>
                            <td>{self.props.dealingData[keyName].instrumentKey}</td>
                            <td>{self.props.dealingData[keyName].dealType.toUpperCase()}</td>
                            <td>{self.props.dealingData[keyName].units}</td>
                            <td>{self.props.dealingData[keyName].amount}</td>
                            <td><span
                                className={self.props.dealingData[keyName].dealType.toUpperCase() == "BUY" ? "badge bg-green" : "badge bg-orange"}>Accepted</span>
                            </td>
                        </tr>
                    }
                });
            }
            if(self.props.loadThisDay == 'previous') {
                LoadRows = Object.keys(self.props.dealingData).map(function (keyName, keyIndex) {
                    if (moment(self.props.dealingData[keyName].boxDate).isSame(yesterday, 'd')) {
                        return <tr>
                            <td>{self.props.dealingData[keyName].boxDate}</td>
                            <td>{self.props.dealingData[keyName].account}</td>
                            <td>{self.props.dealingData[keyName].instrumentKey}</td>
                            <td>{self.props.dealingData[keyName].dealType.toUpperCase()}</td>
                            <td>{self.props.dealingData[keyName].units}</td>
                            <td>{self.props.dealingData[keyName].amount}</td>
                            <td><span
                                className={self.props.dealingData[keyName].dealType.toUpperCase() == "BUY" ? "badge bg-green" : "badge bg-orange"}>Accepted</span>
                            </td>
                        </tr>
                    }
                });
            }
        }
        return (
            <table id="dt_default" className="uk-table" cellSpacing={0} style={{'width':"100%"}} >
                <thead>
                <tr>
                    <th>Trade Date</th>
                    <th>Investment Account</th>
                    <th>ISIN</th>
                    <th>Trade Type</th>
                    <th>Units</th>
                    <th>Amount</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {LoadRows}
                </tbody>
            </table>
        )
    }
}

export default TransactionsTable;
