import React from 'react';
import openSocket from 'socket.io-client';
import {usersActions} from '../actions/moneyAction';
import {connect} from 'react-redux';
import MoneyList from './MoneyList';

class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.money = ["BTC","LTC","ETH","XRP","BCH"];
        this.state = {stocks: {}, last: {}};
        this.props.fetchMoney();
    }

    componentDidMount(prevProps, prevState) {
        var self = this;
        var stocks = {};
        var last = {};
        var socket = openSocket('https://coincap.io');
        socket.on('trades', function (trade) {
            if (self.money.indexOf(trade.coin) !== -1) {
                last[trade.coin] = self.state.stocks[trade.coin];
                stocks[trade.coin] = trade.msg.price
                self.setState({
                    stocks: stocks,
                    last: last
                });
            }
        })
    }

    handleData(data) {
        let result = JSON.parse(data);
        this.setState({count: this.state.count + result.movement});
    }

    render() {
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