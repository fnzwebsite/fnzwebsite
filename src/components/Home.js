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
import { authHeader } from '../helpers';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import moment from 'moment'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            dealing:null,
            chart:'today',
            selected:'chart'
        };
        this.changeView =  this.changeView.bind(this);
        this.loadChart =  this.loadChart.bind(this);
        this.getPrice = this.getPrice.bind(this);
    }
    changeView(selected){
        if(this.state.selected != selected){
            this.setState({
                selected:selected
            });
        }
    }
    loadChart(selected){
        if(this.state.chart != selected) {
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
        var socket = io('http://localhost:3700',{ query: "auth="+authHeader()['Authorization']});
        socket.on('dealing', function (dealing) {
            if(self.state.dealing !== dealing) {
                self.getPrice();
                self.setState({dealing: dealing});
            }
        })
    }

    getPrice() {
        var today = moment().format("YYYY-MM-DD");
        var tomorrow = moment().add('days', 1).format("YYYY-MM-DD");
        var yesterday = moment().add('days', -1).format("YYYY-MM-DD");

        this.props.priceActions.getPriceKeyDate(today, 'today');
        this.props.priceActions.getPriceKeyDate(tomorrow, 'next');
        this.props.priceActions.getPriceKeyDate(yesterday, 'previous');
    }


    data1() {
        return {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "My First dataset",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: "24-11-2017"
                },
                {
                    label: "My Second dataset",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: "25-11-2018"
                }
            ]
        };
    }

    render() {
         if(this.props.data.dealing == "logout" || this.state.dealing == "logout"){
            this.props.userActions.logout();
            this.history.pushState(null, 'login');
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

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="line-chart-example card" style={{minHeight:'300px'}}>
                                                <LoadLineChart loadThisDay={this.state.chart} dealingData={dealing}/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="card">

                                                <div className="card-body"
                                                     style={{"padding-bottom": "30px", "background": "#fff"}}>
                                                    <div className="table-responsive">
                                                        <TransactionsTable loadThisDay={this.state.chart}
                                                                           dealingData={dealing}/>
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
            price:state.priceToday,
            price:state.priceNext,
            price:state.pricePrevious
        }
    };

Home.propTypes = {
    userActions: PropTypes.object,
    user: PropTypes.array,
    priceToday: PropTypes.array,
    priceNext: PropTypes.array,
    pricePrevious: PropTypes.array
};

const
    mapDispatchToProps = (dispatch) => ({
        dealingActions: bindActionCreators(dealingActions, dispatch),
        userActions:bindActionCreators(userActions, dispatch),
        priceActions:bindActionCreators(priceActions, dispatch)
    });


export default connect(mapStateToProps,
    mapDispatchToProps)(Home);
