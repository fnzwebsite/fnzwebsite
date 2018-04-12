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
import {Redirect} from 'react-router-dom';

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
            this.props.dealingActions.getDealings();
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
            if (Object.keys(dealingbydate).length > 0) {
                var data = self.state.dealing;
                if (!self.state.dealing) {
                    data = {};
                    Object.keys(self.props.data.dealing).forEach((itm, i) => {
                        data[itm] = self.props.data.dealing[itm];
                    });
                }
                Object.keys(dealingbydate).forEach((itm, i) => {
                    data[itm] = dealingbydate[itm];
                });
                self.setState({
                    dealing: data
                })
            }
        })
    }

    getPrice() {
        // this.props.priceActions.getPriceKeyDate();
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
                        <nav className="side-navbar l1">
                            <div><a id="toggle-btn" href="#" className="menu-btn">
                                <img src="img/menu-arrow.png" alt="menu-toggle" className=""/>
                            </a></div>
                            <ul className="list-unstyled">
                                <li className="active"><a href="dashboard.html" id="home-menu"> <i className="fa fa-home-icon"></i>Home</a></li>
                                <li><a href="acd.html"> <i className="fa fa-admin"></i>Admin</a></li>
                            </ul>
                        </nav>
                        <nav className="side-navbar l2 shrinked">
                            <ul className="list-unstyled">
                                <li className="active"><a href="acd.html"> <i className="fa fa-tachometer"></i>Dashboard</a></li>
                            </ul>
                        </nav>
                        <div className="content-inner">
                            <header className="header">
                                <nav className="navbar fixed-top">
                                    <div className="search-box">
                                        <button className="dismiss"><i className="icon-close"></i></button>
                                        <form id="searchForm" action="#" role="search">
                                            <input type="search" placeholder="What are you looking for..." className="form-control"/>
                                        </form>
                                    </div>
                                    <div className="container-fluid">
                                        <div className="navbar-holder d-flex align-items-center justify-content-between">
                                            <ul className="nav-menu list-unstyled d-flex flex-md-row align-items-md-center">
                                                <li className="nav-item">
                                                    <div className="avatar"><img src="img/avatar-1.jpg" alt="..." className="img-fluid rounded-circle"/></div>
                                                </li>
                                                <li className="nav-item"><a href="" className="nav-link">Welcome! John Smith</a></li>
                                            </ul>
                                            <div className="navbar-header">
                                                <ul className="nav-menu list-unstyled d-flex flex-md-row align-items-md-center">
                                                    <li className="nav-item d-flex align-items-center"><a id="search" href="#"><i className="icon-search"></i></a></li>
                                                    <li className="nav-item dropdown"> <a id="notifications" rel="nofollow" data-target="#" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="nav-link"><i className="fa fa-bell-o"></i><span className="badge bg-yellow badge-corner">4</span></a>
                                                    </li>
                                                </ul>
                                                <a href="" className="navbar-brand">
                                                    <div className="brand-text brand-big"><img src="img/logo.png" alt="logo" className=""/></div>
                                                    <div className="brand-text brand-small"><img src="img/logo.png" alt="logo" className=""/></div>
                                                </a>
                                                <a href="" className="dots-nav"><img src="img/dots-nav.png" alt="..." className=""/></a>
                                            </div>
                                        </div>
                                    </div>
                                </nav>
                            </header>
                            <div className="container-fluid">
                                <div className="mt-6">
                                    <BoxToday loadChart={this.loadChart} dealingData={dealing} price={this.props.data}/>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="md-card uk-margin-medium-bottom">
                                                <div className="md-card-content">
                                                    <div className="uk-grid" data-uk-grid-margin>
                                                        <div className="uk-width-1-1">
                                                            <ul className="uk-tab chart-tabs" data-uk-tab="{connect:'#tabs_1'}">
                                                                <li><a className="" href="#chart"><i className="fa fa-area-chart"></i>Chart</a></li>
                                                                <li className="uk-active"><a href="#table" className="active"><i className="fa fa-th-list"></i>Transactions</a></li>
                                                            </ul>
                                                            <ul id="tabs_1" className="uk-switcher uk-margin">
                                                                <li>
                                                                    <div className="line-chart-example card">
                                                                        <div className="card-body" style={{"paddingBottom": "30px"}}>
                                                                            <LoadLineChart loadThisDay={this.state.chart}
                                                                                           dealingData={dealing}/>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <TransactionsTable loadThisDay={this.state.chart}
                                                                                       dealingData={dealing}/>
                                                                </li>
                                                            </ul>
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
