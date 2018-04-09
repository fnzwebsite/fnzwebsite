import {connect} from 'react-redux';
import React from 'react';
import SideNav from './SideNav'
import Header from './Header'
import BoxToday from './BoxDealing'
import LoadLineChart from './LoadLineChart'
import TransactionsTable from './TransactionsTable'
import io from "socket.io-client"
import * as dealingActions from '../actions/dealingActions';
import userActions from '../actions/user.actions';
import * as priceActions from '../actions/priceActions';
//import {authHeader} from '../helpers';
import {authHeader, getConfig} from '../helpers';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import moment from 'moment'
import { Redirect} from 'react-router-dom';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dealing: null,
            chart: 'today',
            selected: 'chart'
        };
        this.changeView = this.changeView.bind(this);
        this.loadChart = this.loadChart.bind(this);
        this.getPrice = this.getPrice.bind(this);
    }

    changeView(selected) {
        if (this.state.selected != selected) {
            this.setState({
                selected: selected
            });
        }
    }

    loadChart(selected) {
        if (this.state.chart != selected) {
            this.setState({
                chart: selected
            })
        }
    }

    componentWillMount(prevProps, prevState) {
        this.props.dealingActions.getDealings();
        this.getPrice();
    }


    componentDidMount(prevProps, prevState) {
        var self = this;
        //var socket = io('http://localhost:3700', {query: "auth=" + authHeader()['Authorization']});
        var socket = io(getConfig('socketurl'), {query: "auth=" + authHeader()['Authorization']});
        socket.on('dealingbydate', function (dealingbydate) {
           if(Object.keys(dealingbydate).length > 0){
               var data = self.state.dealing;
               if(self.state.dealing &&  Object.keys(self.state.dealing).length > 0){
                   Object.keys(self.props.data.dealing).forEach((itm, i) => {
                       data[itm] = self.props.data.dealing[itm];
                   });
               }else {
                   data = {};
               }
               Object.keys(dealingbydate).forEach((itm, i) => {
                   data[itm] = dealingbydate[itm];
               });
               self.setState({
                   dealing:data
               })
           }
        })
    }

    getPrice() {
        this.props.priceActions.getPriceKeyDate();
    }

    render() {
        if (this.props.data.dealing == "logout" || this.state.dealing == "logout") {
            return <Redirect to={{pathname: '/login', state: {from: this.props.location}}}/>
        }
        else {
            var dealing = this.state.dealing || this.props.data.dealing;
            return (
                <div className="page">
                    <div className="page-content d-flex align-items-stretch">
                        <SideNav/>
                        <div className="content-inner">
                            <Header/>
                            <div className="container-fluid">
                                <div className="mt-70">

                                    <BoxToday loadChart={this.loadChart} dealingData={dealing} price={this.props.data}/>

                                    <div className="tab-content">
                                        <div id="home" className="tab-pane in active">

                                            <div className="col-sm-12 chart-sec">
                                                <div className="row">
                                                    <h5>Trades <span></span></h5>

                                                    <ul className="nav nav-tabs chart-tabs has-shadow">
                                                        <li className={this.state.selected == "chart" ? 'active' : ''}>
                                                            <a className={this.state.selected == "chart" ? 'active' : ''}
                                                               onClick={() => this.changeView('chart')}><i
                                                                className="fa fa-area-chart"></i>Chart</a></li>
                                                        <li className={this.state.selected == "table" ? 'active' : ''}>
                                                            <a className={this.state.selected == "table" ? 'active' : ''}
                                                               onClick={() => this.changeView('table')}><i
                                                                className="fa fa-th-list"></i>Transactions</a></li>
                                                    </ul>
                                                    <div className="tab-content">
                                                        <div id="chart"
                                                             className={this.state.selected == "chart" ? 'tab-pane in active' : 'tab-pane in fade'}>
                                                            <div className="line-chart-example card">
                                                                <div className="line-chart-example card">
                                                                    <LoadLineChart loadThisDay={this.state.chart}
                                                                                   dealingData={dealing}/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div id="table"
                                                             className={this.state.selected == "table" ? 'tab-pane in active' : 'tab-pane in  fade'}>
                                                            <div className="card table-responsive">
                                                                <div className="card-body">
                                                                    <TransactionsTable loadThisDay={this.state.chart}
                                                                                       dealingData={dealing}/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <footer className="main-footer">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-sm-12 text-center">
                                            <p>&copy; Copyright FNZ UK Ltd 2018.</p>
                                        </div>
                                    </div>
                                </div>
                            </footer>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

const
    mapStateToProps = (state, props) => {
        return {
            data: state,
            user: state.user,
            price: state.price,
        }
    };

Home.propTypes = {
    userActions: PropTypes.object,
    user: PropTypes.array,
    price: PropTypes.array,
};

const
    mapDispatchToProps = (dispatch) => ({
        dealingActions: bindActionCreators(dealingActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch),
        priceActions: bindActionCreators(priceActions, dispatch)
    });


export default connect(mapStateToProps,
    mapDispatchToProps)(Home);
