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
        this.state={
            dealing:null
        };
    }

    componentWillMount(prevProps, prevState) {
        this.props.dealingActions.getDealings();
    }

    componentDidMount(prevProps, prevState) {
        var self = this;
        var socket = io('http://localhost:3700',{ query: "auth="+authHeader()['Authorization']});
        socket.on('dealing', function (dealing) {
            // console.log(JSON.stringify(dealing));
            if(self.state.dealing !== dealing) {
                self.setState({dealing: dealing});
            }
        })
    }

    render() {
        let LoadRows = null
        if(this.props.data.dealing == "logout"){
            this.props.userActions.logout();
        }
        let dealing = this.state.dealing || this.props.data.dealing;
        if(dealing && dealing.status != "401") {
            let self = this;
            if(self.props.loadThisDay == 'today') {
                LoadRows = Object.keys(dealing).map(function (keyName, keyIndex) {
                    if (moment(dealing[keyName].boxDate).isSame(moment(), 'day')) {
                        return <tr>
                            <td>{dealing[keyName].boxDate}</td>
                            <td>{dealing[keyName].account}</td>
                            <td>{dealing[keyName].instrumentKey}</td>
                            <td>{dealing[keyName].dealType.toUpperCase()}</td>
                            <td>{dealing[keyName].units}</td>
                            <td>{dealing[keyName].amount}</td>
                            <td><span
                                className={dealing[keyName].dealType.toUpperCase() == "BUY" ? "badge bg-green" : "badge bg-orange"}>Accepted</span>
                            </td>
                        </tr>
                    }
                });
            }
            if(self.props.loadThisDay == 'next') {
                LoadRows = Object.keys(dealing).map(function (keyName, keyIndex) {
                    if (moment(dealing[keyName].boxDate).isSameOrAfter(moment(), 'day')) {
                        return <tr>
                            <td>{dealing[keyName].boxDate}</td>
                            <td>{dealing[keyName].account}</td>
                            <td>{dealing[keyName].instrumentKey}</td>
                            <td>{dealing[keyName].dealType.toUpperCase()}</td>
                            <td>{dealing[keyName].units}</td>
                            <td>{dealing[keyName].amount}</td>
                            <td><span
                                className={dealing[keyName].dealType.toUpperCase() == "BUY" ? "badge bg-green" : "badge bg-orange"}>Accepted</span>
                            </td>
                        </tr>
                    }
                });
            }
            if(self.props.loadThisDay == 'previous') {
                LoadRows = Object.keys(dealing).map(function (keyName, keyIndex) {
                    if (moment(dealing[keyName].boxDate).isSameOrBefore(moment(), 'day')) {
                        return <tr>
                            <td>{dealing[keyName].boxDate}</td>
                            <td>{dealing[keyName].account}</td>
                            <td>{dealing[keyName].instrumentKey}</td>
                            <td>{dealing[keyName].dealType.toUpperCase()}</td>
                            <td>{dealing[keyName].units}</td>
                            <td>{dealing[keyName].amount}</td>
                            <td><span
                                className={dealing[keyName].dealType.toUpperCase() == "BUY" ? "badge bg-green" : "badge bg-orange"}>Accepted</span>
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

const
    mapStateToProps = (state, props) => {
        return {
            data: state,
            user: state.user
        }
    };

TransactionsTable.propTypes = {
    userActions: PropTypes.object,
    user: PropTypes.array
};

const
    mapDispatchToProps = (dispatch) => ({
        dealingActions: bindActionCreators(dealingActions, dispatch),
        userActions:bindActionCreators(userActions, dispatch)
    });


export default connect(mapStateToProps,
    mapDispatchToProps)

(
    TransactionsTable
)
;