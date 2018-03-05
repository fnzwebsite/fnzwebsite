import React from 'react';
import openSocket from 'socket.io-client';
import {usersActions} from '../actions/moneyAction';
import {connect} from 'react-redux';
import MoneyList from './MoneyList';
import moment from 'moment';

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceLine,
    ReferenceDot, Tooltip, CartesianGrid, Legend, Brush, ErrorBar, AreaChart, Area,
    Label, LabelList ,Scatter, ScatterChart,} from 'recharts';

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
                var d = new Date();
                if(trade.coin == "BTC") {
                    data03.push({'time':d.getTime(), 'value': trade.msg.price})
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

    // getTicks(data) {
    //     if (!data || !data.length ) {return [];}
    //
    //     const domain = [new Date(data[0].time), new Date(data[data.length - 1].time)];
    //     const scale = d3_scale.scaleTime().domain(domain).range([0, 1]);
    //     const ticks = scale.ticks(d3_time.timeMinute, 5);
    //
    //     return ticks.map(entry => +entry);
    // }



    render() {
        const dateFormat = (time) => {
            return moment(time).format('HH:mm');
        };

        var data = null;
        if(this.state.data03.length>0) {
            data = <div className="line-chart-wrapper">
                <ResponsiveContainer width = '95%' height = {500} >
                    <ScatterChart>
                        <XAxis
                            dataKey = 'time'
                            domain = {['auto', 'auto']}
                            name = 'Time'
                            tickFormatter = {(unixTime) => moment(unixTime).format('HH:mm Do')}
                            type = 'number'
                        />
                        <YAxis dataKey = 'value' domain={['auto', 'auto']} name = 'Value' />

                        <CartesianGrid />
                        <Tooltip cursor={{strokeDasharray: '3 3'}}/>
                        <Legend/>
                        <Scatter  legendType="square" fill='#8884d8' shape="square"
                            data = {this.state.data03}
                            line = {{ stroke: '#8884d8' }}
                            lineJointType = 'monotoneX'
                            lineType = 'joint'
                            name = 'Values'
                        />

                    </ScatterChart>
                </ResponsiveContainer>

            </div>
        }

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
                {data}
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