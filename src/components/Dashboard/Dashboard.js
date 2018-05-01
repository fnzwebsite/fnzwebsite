import {connect} from 'react-redux';
import React from 'react';
import BoxToday from './BoxDealing'
import LoadLineChart from './LoadLineChart'
import LoadChart from './LoadChart'
import TransactionsTable from './TransactionsTable'
import io from "socket.io-client"
import dealingActions from '../../actions/dealingActions';
import userActions from '../../actions/user.actions';
import {authHeader, getConfig} from '../../helpers/index';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router';


class Dashboard extends React.Component {

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
        console.log('selected : ' + this.state.chart);
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
    }

    render() {
        if (this.props.data.dealing == "logout" || this.state.dealing == "logout") {
            return <Redirect to={{pathname: '/login', state: {from: this.props.location}}}/>
        }
        else {
            var dealing = this.state.dealing || this.props.data.dealing;
            //        console.log(dealing);
            return (
                <div className="container-fluid">
                    <div className="mt-6">
                    <BoxToday loadChart={this.loadChart} dealingData={dealing} price={this.props.data}/>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="md-card uk-margin-medium-bottom">
                                <div className="md-card-content">
                                    <div className="uk-grid" data-uk-grid-margin>
                                        <div className="uk-width-1-1">
                                            <ul className="uk-tab chart-tabs"
                                                data-uk-tab="{connect:'#tabs_1'}">
                                                <li>
                                                    <a onClick={() => this.changeView('chart')}
                                                       href="#chart"><i
                                                        className="fa fa-area-chart"></i>Chart</a></li>
                                                <li className={this.state.selected == "table" ? 'active' : ''}>
                                                    <a href="#table"
                                                       onClick={() => this.changeView('table')}><i
                                                        className="fa fa-th-list"></i>Transactions</a>
                                                </li>
                                            </ul>
                                            <ul id="tabs_1" className="uk-switcher uk-margin" >
                                                <li className={this.state.selected == "chart" ? 'uk-active' : ''}>
                                                    <div className="line-chart-example card"  style={{minHeight:'200px'}}>
                                                        <div className="card-body"
                                                             style={{paddingBottom: '30px'}}>
                                                            {/*<LoadChart/>*/}
                                                          
                                                           <LoadLineChart
                                                                loadThisDay={this.state.chart}
                                                                dealingData={dealing}/>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className={this.state.selected == "table" ? 'uk-active' : ''}>
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

Dashboard.propTypes = {
    userActions: PropTypes.object,
    user: PropTypes.array,
};

const
    mapDispatchToProps = (dispatch) => ({
        dealingActions: bindActionCreators(dealingActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch)
    });


export default connect(mapStateToProps,
    mapDispatchToProps)(Dashboard);
