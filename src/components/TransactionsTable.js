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
        let LoadRows = null;
        let self = this;
        if(self.props.dealingData && self.props.dealingData.status != "401") {
            let self = this;
            if(self.props.loadThisDay == 'today') {
                LoadRows = Object.keys(self.props.dealingData).map(function (keyName, keyIndex) {
                    if (moment(self.props.dealingData[keyName].boxDate).isSame(moment(), 'day')) {
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
            if(self.props.loadThisDay == 'next') {
                LoadRows = Object.keys(self.props.dealingData).map(function (keyName, keyIndex) {
                    if (moment(self.props.dealingData[keyName].boxDate).isSameOrAfter(moment(), 'day')) {
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
                    if (moment(self.props.dealingData[keyName].boxDate).isSameOrBefore(moment(), 'day')) {
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
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table">
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
                </div>
            </div>
        )
    }
}

export default TransactionsTable;