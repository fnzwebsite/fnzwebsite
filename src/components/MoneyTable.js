import React from 'react';
import openSocket from 'socket.io-client';
import {usersActions} from '../actions/moneyAction';
import {connect} from 'react-redux';
import MoneyList from './MoneyList';

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceLine,
    ReferenceDot, Tooltip, CartesianGrid, Legend, Brush, ErrorBar, AreaChart, Area,
    Label, LabelList } from 'recharts';

class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.money = ["BTC","LTC","ETH","XRP","BCH"];
        this.state = {stocks: {}, last: {},data03:[]};
        this.props.fetchMoney();
    }

    componentDidMount(prevProps, prevState) {
        var self = this;
        var stocks = {};
        var last = {};
        var data03 = [];
        var socket = openSocket('https://coincap.io');
        socket.on('trades', function (trade) {
            if (self.money.indexOf(trade.coin) !== -1) {
                last[trade.coin] = self.state.stocks[trade.coin];
                stocks[trade.coin] = trade.msg.price
                if(trade.coin == "BTC") {
                    data03.push({'date': Date(), 'price': trade.msg.price})
                }
                self.setState({
                    stocks: stocks,
                    last: last,
                    data03:data03
                });
            }
        })
    }

    handleData(data) {
        let result = JSON.parse(data);
        this.setState({count: this.state.count + result.movement});
    }

    render() {
        const data03 = [
            { date: 'Jan 04 2016', price: 105.35 },
            { date: 'Jan 05 2016', price: 102.71 },
            { date: 'Jan 06 2016', price: 100.7 },
            { date: 'Jan 07 2016', price: 96.45 },
            { date: 'Jan 08 2016', price: 96.96 },
            { date: 'Jan 11 2016', price: 98.53 },
        ];
        return (
            <div className="row">
                <table className="table-hover">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Volume</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.data.money.map((item,index) => (
                        index<5 &&
                        <MoneyList item={item} data={this.state} key={item.short}/>
                    ))}
                    </tbody>
                </table>
                {this.state.data03.length > 10 &&
                <div className="line-chart-wrapper">
                    <LineChart
                        width={600} height={400} data={this.state.data03}
                        margin={{top: 40, right: 40, bottom: 20, left: 20}}
                    >
                        <CartesianGrid vertical={false}/>
                        <XAxis dataKey="date" label="Date"/>
                        <YAxis domain={['auto', 'auto']} label="Stock Price"/>
                        <Tooltip/>
                        <Line dataKey="price" stroke="#ff7300" dot={false}/>
                        <Brush dataKey="date" startIndex={this.state.data03.length - 10}>
                            <AreaChart>
                                <CartesianGrid/>
                                <YAxis hide domain={['auto', 'auto']}/>
                                <Area dataKey="price" stroke="#ff7300" fill="#ff7300" dot={false}/>
                            </AreaChart>
                        </Brush>
                    </LineChart>
                </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        data: state
    }
};

const mapDispatchToProps = (dispatch) => ({
    fetchMoney: () => dispatch(usersActions.fetchMoney())
});

export default connect(mapStateToProps, mapDispatchToProps)(MyComponent);