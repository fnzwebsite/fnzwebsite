import React from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-responsive/js/dataTables.responsive';
import 'datatables.net-responsive-dt/css/responsive.dataTables.css';
import Settings from '../Common/Settings';
import moment from 'moment';
var createReactClass = require('create-react-class');
var tableAsJqeryElement = null;

var Table = createReactClass({
    componentDidMount: function () {
        this.loadDataTable();
    },
    componentDidUpdate: function (prevProps, prevState) {
        this.loadDataTable();
    },
    componentWillReceiveProps: function (prevProps, prevState) {
        if(prevProps.loadThisDay != this.props.loadThisDay || prevProps.dealingData !=  this.props.dealingData) {
            if (tableAsJqeryElement) {
                tableAsJqeryElement.fnDestroy();
                tableAsJqeryElement = null;
            }
        }
        this.loadDataTable();
    },
    loadDataTable: function () {
        setTimeout(function () {
            tableAsJqeryElement = $('#table').dataTable();
            if (tableAsJqeryElement) {
                tableAsJqeryElement.fnDraw();
            }
        }, 0)
    },

    render: function () {
        let LoadRows = null;
        let self = this;
        if (self.props.dealingData && self.props.dealingData.status != "401") {
            var today = moment().format("YYYY-MM-DD");
            var tomorrow = moment().add('days', 1).format("YYYY-MM-DD");
            var yesterday = moment().add('days', -1).format("YYYY-MM-DD");
            let self = this;
            if (self.props.loadThisDay == 'today') {
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
            if (self.props.loadThisDay == 'next') {
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
            if (self.props.loadThisDay == 'previous') {
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

            LoadRows = LoadRows.filter(function (item) {
                return item != undefined
            })

            return (
                <div>
                    <table id="table" className="stripe" cellSpacing="0" width="100%">
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
            );
        } else {
            return <p>no data</p>;
        }
    }
});

class TransactionsTable extends React.Component {

    constructor(props) {
        super(props);
        this.handleTableClick = this.handleTableClick.bind(this);
    }

    handleTableClick(dataAttrs) {
        debugger;
        switch (dataAttrs.actionName) {
            case 'linkCity':
                alert(dataAttrs.cityName)
            default:
                console.error(
                    new Error('No handler for table action: ' + dataAttrs.actionName));
                return undefined;
        }
    }

    render() {
        return (
            <Table dealingData={this.props.dealingData} loadThisDay={this.props.loadThisDay}/>
        )
    }
}

export default TransactionsTable;
