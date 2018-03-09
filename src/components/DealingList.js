import React from 'react';
import io from "socket.io-client"
import * as dealingActions from '../actions/dealingActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment'

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceLine,
    ReferenceDot, Tooltip, CartesianGrid, Legend, Brush, ErrorBar, AreaChart, Area,
    Label, LabelList ,Scatter, ScatterChart,} from 'recharts';

let socket
class DealingList extends React.Component {
    constructor(props) {
        super(props);

        // http://localhost:8081
        // http://ec2-35-178-56-52.eu-west-2.compute.amazonaws.com:8081
        // socket = io("http://ec2-35-178-56-52.eu-west-2.compute.amazonaws.com:8081",{path: "/api"})
        // socket.on('dealing', function (trade) {
        //     console.log('hi')
        // })


    }

    componentWillMount() {
        this.props.dealingActions.getDealings();
    }

    componentDidMount(prevProps, prevState) {
        var self = this;

        var socket = io('https://coincap.io');
        socket.on('trades', function (trade) {
            self.props.dealingActions.getDealings();
        })

        // var socket = io('http://ec2-35-178-56-52.eu-west-2.compute.amazonaws.com:8081',{path:"/api"});
        // socket.on('dealing', function (trade) {
        //     // self.props.dealingActions.getDealings();
        // })
    }

    handleData(data) {
        let result = JSON.parse(data);
        this.setState({count: this.state.count + result.movement});
    }

    render() {

        var chart = null,self =this,data03=null,d =null;
        if(this.props.data.dealing) {
            let ListArrayDealing = Object.keys(this.props.data.dealing).map(function (keyName, keyIndex) {
                if(moment(self.props.data.dealing[keyName].boxDate).isSame(moment(), 'day')) {
                    d = new Date(self.props.data.dealing[keyName].tradeDate);
                    return ({'time': d.getTime(), 'value': self.props.data.dealing[keyName].amount})
                }
            });

            ListArrayDealing = ListArrayDealing.filter(function( element ) {
                return element !== undefined;
            });
            chart = <div className="line-chart-wrapper">
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
                                  data = {ListArrayDealing}
                                  line = {{ stroke: '#8884d8' }}
                                  lineJointType = 'monotoneX'
                                  lineType = 'joint'
                                  name = 'Values'
                        />

                    </ScatterChart>
                </ResponsiveContainer>
            </div>
        }

        if (this.props.data && !this.props.data.dealing) {
            return (
                <div>
                    Loading Dealing List...
                </div>
            )
        } else {
            let self = this;
            var ListToday = null,
                ListPrevious = null,
                ListNext = null;
            ListToday = Object.keys(this.props.data.dealing).map(function (keyName, keyIndex) {
                var date =moment(self.props.data.dealing[keyName].boxDate).isSame(moment(), 'day');
                if(date) {
                    return <div
                        className={self.props.data.dealing[keyName].dealType.toUpperCase() == "BUY" ? "card buy" : "card sell"}
                        style={{width: "200px"}}>

                        <div className="card-body row">
                            <div className="col-md-6">
                                <h5 className="card-title">{self.props.data.dealing[keyName].account}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{self.props.data.dealing[keyName].instrumentKey}</h6>
                            </div>
                            <div className="col-md-6">
                                <div>{self.props.data.dealing[keyName].amount}</div>
                            </div>
                        </div>
                    </div>
                }

            });
            ListPrevious = Object.keys(this.props.data.dealing).map(function (keyName, keyIndex) {
                var date =moment(self.props.data.dealing[keyName].boxDate).isSameOrBefore(moment(), 'day');
                if(date) {
                    return <div
                        className={self.props.data.dealing[keyName].dealType.toUpperCase() == "BUY" ? "card buy" : "card sell"}
                        style={{width: "200px"}}>

                        <div className="card-body row">
                            <div className="col-md-6">
                                <h5 className="card-title">{self.props.data.dealing[keyName].account}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{self.props.data.dealing[keyName].instrumentKey}</h6>
                            </div>
                            <div className="col-md-6">
                                <div>{self.props.data.dealing[keyName].amount}</div>
                            </div>
                        </div>
                    </div>
                }

            });
            ListNext = Object.keys(this.props.data.dealing).map(function (keyName, keyIndex) {

                var date =moment(self.props.data.dealing[keyName].boxDate).isSameOrAfter(moment(moment.now()));
                if(date) {
                    return <div
                        className={self.props.data.dealing[keyName].dealType.toUpperCase() == "BUY" ? "card buy" : "card sell"}
                        style={{width: "200px"}}>

                        <div className="card-body row">
                            <div className="col-md-6">
                                <h5 className="card-title">{self.props.data.dealing[keyName].account}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{self.props.data.dealing[keyName].instrumentKey}</h6>
                            </div>
                            <div className="col-md-6">
                                <div>{self.props.data.dealing[keyName].amount}</div>
                            </div>
                        </div>

                    </div>
                }
            });
            return (
                <div className="row">
                    <div className="col-md-3 previous-day">
                        <div>Previous Day</div>
                        <div className="box-height">{ListPrevious}</div>
                    </div>
                    <div className="row col-md-6 today">
                        <div className="col-md-6">
                            <div className="pull-left">Box Positions (Today)</div>
                            <br/>
                            <div className="box-height">{ListToday}</div>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-12 inner-box">Open 45345</div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 inner-box">Close 5435</div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 inner-box">Net 4354325</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 next-day">
                        <div>Next Day</div>
                        <div className="box-height">{ListNext}</div>
                    </div>
                    {chart}
                </div>
            )
        }
    }
}

const
    mapStateToProps = (state, props) => {
        return {
            data: state
        }
    };

const
    mapDispatchToProps = (dispatch) => ({
        dealingActions: bindActionCreators(dealingActions, dispatch)
    });


export default connect(mapStateToProps,
    mapDispatchToProps)

(
    DealingList
)
;
