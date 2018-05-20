import React from 'react';
import moment from 'moment';
import 'moment-timezone';
import RTChart from 'react-c3js';
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

// Generate random data
function generateData() {
    var firstDate = new Date();
    var dataProvider = [];
    for (var i = 0; i < 100; ++i) {
        var date = new Date(firstDate.getTime());

        date.setDate(i);

        dataProvider.push({
            date: date,
            value: Math.floor(Math.random() * 100)
        });
    }

    return dataProvider;
}


const LineChart = ({data}) =>
    <ResponsiveContainer width="90%" height={200}>
        <BarChart data={data}
                  margin={{top: 10, right: 0, left: -25, bottom: 0}}>
            <XAxis dataKey="dateValue"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend/>
            <Bar dataKey="buy" fill="#3367d6"/>
            <Bar dataKey="sell" fill="#ffc658"/>
        </BarChart>

    </ResponsiveContainer>


class LoadLineChart extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: null,
            timer: null,
            chartValues: []
        }
        //this.props.dealingActions.getDealings();
        this.getChartData = this.getChartData.bind(this);
    }

    getChartData(dealing, loadThisDay) {
        var today = moment().format("YYYY-MM-DD");
        var tomorrow = moment().add('days', 1).format("YYYY-MM-DD");
        var yesterday = moment().add('days', -1).format("YYYY-MM-DD");
        if (dealing && dealing.code != 2) {
            let datetime = [];
            // datetime.push('x');
            //datetime.push(0)
            let buy = [];
            // buy.push('BUY');
            //buy.push(0);
            let sell = [];
            // sell.push('SELL');
            //sell.push(0);
            let self = this;
            let chartVal = [];
            let tdayIndex = 0;
            let ydayIndex = 0;
            let ndayIndex = 0;
            let loadAmount = Object.keys(dealing).sort((a, b) => a.tradeTime - b.tradeTime).map(function (keyName, keyIndex) {
                if (loadThisDay == 'today') {
                    if (moment(dealing[keyName].boxDate).isSame(today, 'day')) {
                        let tdate = moment(dealing[keyName].tradeTime);//.tz('Europe/London');

                        //chartVal.push(tdate._a[3] + ':' + tdate._a[4] + ':' + tdate._a[5])

                        if (dealing[keyName].dealType.toUpperCase() == "BUY") {
                            if (dealing[keyName].units > 0) {

                                data = {
                                    'dateValue': tdate.format('hh:mm'),
                                    'amt': ++tdayIndex,
                                    'buy': +parseFloat(dealing[keyName].units).toFixed(4),
                                    'sell': 0
                                }
                                datetime.push(data);
                                //datetime.push(tdate._a[3] + ':' + tdate._a[4])

                                // chartVal.push(tdate.format('hh:mm'));
                                // buy.push(dealing[keyName].units)
                                // sell.push(0)
                            }
                        } else {
                            if (dealing[keyName].units > 0) {

                                data = {
                                    'x': tdate.format('hh:mm'),
                                    'value': ++tdayIndex,
                                    'buy': 0,
                                    'sell:': dealing[keyName].units
                                }
                                datetime.push(data);
                                //datetime.push(tdate._a[3] + ':' + tdate._a[4] )
                                // buy.push(0)
                                // datetime.push(++tdayIndex);
                                // chartVal.push(tdate.format('hh:mm'));
                                // sell.push(dealing[keyName].units)
                            }
                        }
                        return null
                    }
                }
                if (loadThisDay == 'next') {
                    if (moment(dealing[keyName].boxDate).isSame(tomorrow, 'day')) {
                        let tdate = moment(dealing[keyName].tradeTime);//.tz('Europe/London');

                        //chartVal.push(tdate._a[3] + ':' + tdate._a[4] + ':' + tdate._a[5])

                        if (dealing[keyName].dealType.toUpperCase() == "BUY") {
                            if (dealing[keyName].units > 0) {
                                datetime.push(++ndayIndex)
                                chartVal.push(tdate._a[3] + ':' + tdate._a[4] + ':' + tdate._a[5]);
                                buy.push(dealing[keyName].units)
                                // console.log('buy value: '+dealing[keyName].units)
                                //console.log('buy value time: '+dealing[keyName].tradeTime)
                                sell.push(0)
                            }
                        } else {
                            if (dealing[keyName].units > 0) {
                                //   datetime.push(tdate._a[3] + ':' + tdate._a[4] )
                                buy.push(0)
                                //chartVal.push(++ndayIndex);
                                datetime.push(++ndayIndex)
                                chartVal.push(tdate._a[3] + ':' + tdate._a[4] + ':' + tdate._a[5]);
                                // console.log('sell value: '+dealing[keyName].units)
                                //console.log('sell value time: '+dealing[keyName].tradeTime)
                                sell.push(dealing[keyName].units)
                            }
                        }
                        return null
                    }
                }
                if (loadThisDay == 'previous') {
                    if (moment(dealing[keyName].boxDate).isSame(yesterday, 'day')) {
                        let tdate = moment(dealing[keyName].tradeTime);//.tz('Europe/London');
                        //console.log(parseInt(tdate.format('hh')));
                        //datetime.push(tdate._a[3] + ':' + tdate._a[4] + ':' + tdate._a[5])
                        //chartVal.push(tdate._a[3] + ':' + tdate._a[4] + ':' + tdate._a[5])

                        if (dealing[keyName].dealType.toUpperCase() == "BUY") {
                            if (dealing[keyName].units > 0) {
                                data = {
                                    'dateValue': tdate.format('hh:mm'),
                                    'amt': ++tdayIndex,
                                    'buy': +parseFloat(dealing[keyName].units).toFixed(4),
                                    'sell': 0
                                }
                                datetime.push(data);
                                //datetime.push(tdate._a[3] + ':' + tdate._a[4])
                                // buy.push(dealing[keyName].units)
                                //chartVal.push(++ydayIndex);
                                // datetime.push(data )
                                // chartVal.push(tdate._a[3] + ':' + tdate._a[4]+':'+ tdate._a[5]);
                                // sell.push(0)
                            }
                        } else {
                            if (dealing[keyName].units > 0) {
                                data = {
                                    'x': tdate.format('hh:mm'),
                                    'value': ++tdayIndex,
                                    'buy': 0,
                                    'sell:': dealing[keyName].units
                                }
                                datetime.push(data);
                                // datetime.push(tdate._a[3] + ':' + tdate._a[4] )
                                // chartVal.push(++ydayIndex);
                                // datetime.push(tdate._a[3] + ':' + tdate._a[4]+':'+ tdate._a[5] )
                                // chartVal.push(tdate._a[3] + ':' + tdate._a[4]+':'+ tdate._a[5]);
                                // buy.push(0)
                                // sell.push(dealing[keyName].units)
                            }
                        }
                        return null
                    }
                }
            });
            // this.setState({chartValues: chartVal})
            var data = [
                datetime,
                buy,
                sell
            ];

            return datetime;
        }
        return null;
    }

    componentWillReceiveProps(nextProps) {
        // if (nextProps.dealsByDate) {
        //     let data = nextProps.dealsByDate;
        //     let loadThisDay = nextProps.loadThisDay;
        //     let lineChartData = this.getChartData(data, loadThisDay);
        //     this.setState({data: lineChartData})
        // }
    }

    render() {
        const dataCheck = [
            {name: '2:50', uv: 4000, pv: 0, amt: 2400},
            {name: '2:51', uv: 3000, pv: 1398, amt: 2210},
            {name: '2:53', uv: 2000, pv: 9800, amt: 2290},
            {name: '3:50', uv: 2780, pv: 3908, amt: 2000},
            {name: '4:50', uv: 1890, pv: 4800, amt: 2181},
            {name: '5:50', uv: 2390, pv: 3800, amt: 2500},
            {name: '6:50', uv: 3490, pv: 4300, amt: 2100},
            {amt: 1,name: "08:48",pv: 0,uv: 1900}
        ];
        let lineChartData = this.getChartData(this.props.dealsByDate, this.props.loadThisDay);
        if (lineChartData && lineChartData.length) {
            console.log(lineChartData)
            console.log(dataCheck)
            return (<LineChart data={lineChartData}/>
            )
        }
        else if (!this.state.data) {
            return (
                <div className="preloader">
                    <span className="line line-1"></span>
                    <span className="line line-2"></span>
                    <span className="line line-3"></span>
                    <span className="line line-4"></span>
                    <span className="line line-5"></span>
                    <span className="line line-6"></span>
                    <span className="line line-7"></span>
                    <span className="line line-8"></span>
                    <span className="line line-9"></span>
                    <div>Loading</div>
                </div>
            )


        }
        else {
            return null;
        }

    }
}

export default LoadLineChart;
