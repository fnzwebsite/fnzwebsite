import React from 'react';
import io from "socket.io-client"
import * as dealingActions from '../actions/dealingActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment'
import Home from './Home'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceLine,
    ReferenceDot, Tooltip, CartesianGrid, Legend, Brush, ErrorBar, AreaChart, Area,
    Label, LabelList ,Scatter, ScatterChart,} from 'recharts';

let socket
class DealingList extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            dealing:null
        }

    }

    componentWillMount() {
        // this.props.dealingActions.getDealings();
        // var socket = io('http://localhost:3700');
        this.props.dealingActions.getDealings();
    }

    componentDidMount(prevProps, prevState) {
        // var self = this;
        // var socket = io('http://localhost:3700');
        // dispatch(this.props.dealingActions.getDealings(socket));
        // socket.on('dealing', function (dealing) {
        //     self.setState({dealing:dealing})
        // })
    }

    handleData(data) {
        let result = JSON.parse(data);
        this.setState({count: this.state.count + result.movement});
    }

    render() {

        var chart = null,self =this,data03=null,d =null;
        if(false) {
            let ListArrayDealing = Object.keys(this.state.dealing).map(function (keyName, keyIndex) {
                if(moment(self.state.dealing[keyName].boxDate).isSame(moment(), 'day')) {
                    d = new Date(self.state.dealing[keyName].tradeDate);
                    return ({'time': d.getTime(), 'value': self.state.dealing[keyName].amount})
                }
            });

            ListArrayDealing = ListArrayDealing.filter(function( element ) {
                return element !== undefined;
            });
            chart = <div className="line-chart-wrapper">
                <ResponsiveContainer width = '95%' height = {500} >
                <AreaChart width={400} height={400} data={ListArrayDealing} >
          <Area type="monotone" dataKey="value" stroke="#ff7300" fill="#ff7300" className="recharts-area-curve" />

        <XAxis dataKey = 'time' domain = {['auto', 'auto']} name = 'Time' tickFormatter = {(unixTime) => moment(unixTime).format('HH:mm Do')}
                           type = 'number'
                       />
                       <YAxis dataKey = 'value' domain={['auto', 'auto']} name = 'Value' />

      </AreaChart>
                </ResponsiveContainer>
            </div>
        }

        if (true) {
            return (

                   <Home/>

            )
        } else {
            let self = this;
            var ListToday = null,
                ListPrevious = null,
                ListNext = null;
            ListToday = Object.keys(this.state.dealing).map(function (keyName, keyIndex) {
                var date =moment(self.state.dealing[keyName].boxDate).isSame(moment(), 'day');
                if(date) {
                    return <div
                        className={self.state.dealing[keyName].dealType.toUpperCase() == "BUY" ? "card buy" : "card sell"}
                        style={{width: "200px"}}>

                        <div className="card-body row">
                            <div className="col-md-6">
                                <h5 className="card-title">{self.state.dealing[keyName].account}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{self.state.dealing[keyName].instrumentKey}</h6>
                            </div>
                            <div className="col-md-6">
                                <div>{self.state.dealing[keyName].amount}</div>
                            </div>
                        </div>
                    </div>
                }

            });
            ListPrevious = Object.keys(this.state.dealing).map(function (keyName, keyIndex) {
                var date =moment(self.state.dealing[keyName].boxDate).isSameOrBefore(moment(), 'day');
                if(date) {
                    return <div
                        className={self.state.dealing[keyName].dealType.toUpperCase() == "BUY" ? "card buy" : "card sell"}
                        style={{width: "200px"}}>

                        <div className="card-body row">
                            <div className="col-md-6">
                                <h5 className="card-title">{self.state.dealing[keyName].account}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{self.state.dealing[keyName].instrumentKey}</h6>
                                </div>
                            <div className="col-md-6">
                                <div>{self.state.dealing[keyName].amount}</div>
                            </div>
                        </div>
                    </div>
                }

            });
            ListNext = Object.keys(this.state.dealing).map(function (keyName, keyIndex) {

                var date =moment(self.state.dealing[keyName].boxDate).isSameOrAfter(moment(moment.now()));
                if(date) {
                    return <div
                        className={self.state.dealing[keyName].dealType.toUpperCase() == "BUY" ? "card buy" : "card sell"}
                        style={{width: "200px"}}>

                        <div className="card-body row">
                            <div className="col-md-6">
                                <h5 className="card-title">{self.state.dealing[keyName].account}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{self.state.dealing[keyName].instrumentKey}</h6>
                            </div>
                            <div className="col-md-6">
                                <div>{self.state.dealing[keyName].amount}</div>
                            </div>
                        </div>

                    </div>
                }
            });
            return (
                <div className="row" style={{backgroundColor:'Black'}}>
                    <div className="col-md-3 previous-day">
                        <div>Previous Day</div>
                        <div className="box-height">{ListPrevious}</div>
                    </div>
                    <div className="row col-md-6 today">
                        <div className="col-md-6" style={{overflow:'auto'}}>
                            <div className="pull-left">Box Positions (Today)</div>
                            <br/>
                            <div className="box-height">{ListToday}</div>
                        </div>
                    </div>
                    <div className="col-md-3 next-day">
                        <div>Next Day</div>
                        <div className="box-height">{ListNext}</div>
                    </div>
                    <div className="row col-md-12">
                    {chart}
                    </div>
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
