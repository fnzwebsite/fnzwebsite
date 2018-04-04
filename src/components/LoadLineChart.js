import React from 'react';
import {connect} from 'react-redux';
import {Line as LineChart} from 'react-chartjs';
import io from "socket.io-client"
import moment from 'moment'
import * as dealingActions from '../actions/dealingActions';
import {bindActionCreators} from 'redux';
import {authHeader} from '../helpers';
import {Chart} from 'react-google-charts';


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


class LoadLineChart extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: null,
            dataProvider: generateData(),
            timer: null
        }
        this.getChartData = this.getChartData.bind(this);
    }

    getChartData(dealing) {
        var today = moment().add('days', 2).format("YYYY-MM-DD");
        var tomorrow = moment().add('days', 1).format("YYYY-MM-DD");
        var yesterday = moment().add('days', -1).format("YYYY-MM-DD");
        if (dealing) {
            let self = this
            let loadAmount = Object.keys(dealing).sort((a, b) => a.tradeDate - b.tradeDate).map(function (keyName, keyIndex) {
                if (self.props.loadThisDay == 'today') {
                    if (moment(dealing[keyName].boxDate).isSame(today, 'day')) {
                        return [

                            [parseInt(moment(dealing[keyName].tradeDate).format('HH')),
                                parseInt(moment(dealing[keyName].tradeDate).format('mm')),
                                parseInt(moment(dealing[keyName].tradeDate).format('ss'))],
                            parseFloat(dealing[keyName].units).toFixed(2) / 1
                        ]
                    }
                }
                if (self.props.loadThisDay == 'next') {
                    if (moment(dealing[keyName].boxDate).isSame(tomorrow, 'day')) {
                        return [

                            [parseInt(moment(dealing[keyName].tradeDate).format('HH')),
                                parseInt(moment(dealing[keyName].tradeDate).format('mm')),
                                parseInt(moment(dealing[keyName].tradeDate).format('ss'))],
                            parseFloat(dealing[keyName].units).toFixed(2) / 1
                        ]
                    }
                }
                if (self.props.loadThisDay == 'previous') {
                    if (moment(dealing[keyName].boxDate).isSame(yesterday, 'day')) {
                        return [

                            [parseInt(moment(dealing[keyName].tradeDate).format('HH')),
                                parseInt(moment(dealing[keyName].tradeDate).format('mm')),
                                parseInt(moment(dealing[keyName].tradeDate).format('ss'))],
                            parseFloat(dealing[keyName].units).toFixed(2) / 1
                        ]
                    }
                }
            });
            loadAmount = loadAmount.filter(function (item) {
                return item != null && item != undefined;
            })
            // loadAmount.push(['value','date'],0)
            return loadAmount;
        }
        return null;
    }

    componentWillReceiveProps(prevProps) {
        if (prevProps.dealingData != this.props.dealingData && this.props.dealingData) {
            let lineChartData = this.getChartData(this.props.dealingData);
            this.setState({data: lineChartData})
        }
        if (this.props.loadThisDay != prevProps.loadThisDay) {
            let lineChartData = this.getChartData(this.props.dealingData);
            this.setState({data: lineChartData})

        }
    }

    render() {
        if (this.state.data && this.state.data.length) {
            var options = {
                legend: {position: 'none'},
                pointSize: 2,
                series: {
                    0: { color: '#e7711b',lineWidth: 1,pointShape: 'circle'},
                },
                enableInteractivity: false,
                chartArea: {
                    width: '90%'
                },
                hAxis: {
                    ticks: [[0, 0, 0], [1, 0, 0], [2, 0, 0],[3, 0, 0],[4, 0, 0], [5, 0, 0],[6, 0, 0], [7, 0, 0],[8, 0, 0], [9, 0, 0],[10, 0, 0], [11, 0, 0], [12, 0, 0], [13, 0, 0],
                        [14, 0, 0], [15, 0, 0], [16, 0, 0], [17, 0, 0], [18, 0, 0],[19, 0, 0],[20, 0, 0],[21, 0, 0],[22, 0, 0],[23, 0, 0],[24, 0, 0]]
                }
            };

            // var data = [
            //
            //     [[11, 50, 50], 20.4],
            //     [[11, 51, 50], 21.4],
            //     [[11, 55, 58], 21.4],
            //     [[11, 52, 31], 21.4]
            // ];

            // data = [
            //     [[11, 51, 50], 21.4],
            //     [[11, 55, 58], 21.4],
            //     [[11, 52, 31], 21.4]
            // ]


          //   alert(JSON.stringify(this.state.data))
          //var chartData=;
          // var data = [
          //
          //       [[[0,0,0],0][1, 0, 0], 10],
          //       [[2, 51, 50], 40.4],
          //       [[3, 0, 50], 21.2],
          //       [[3, 55, 58], 21.4],
          //       [[4, 52, 31], 188.4]
          //   ];
            return (
                <Chart
                    chartType="LineChart"
                    rows={this.state.data}
                    columns={[
                        {
                            type: 'timeofday',
                            label: 'Time of Day',
                        },
                        {
                            type: 'number',
                            label: 'Motivation Level',
                        },
                    ]}
                    options={options}
                    graph_id="LineChart"
                    width="100%"
                    height="400px"
                    legend_toggle
                />
            )
        }
        else {
            return null;
        }

    }
}

export default LoadLineChart;
