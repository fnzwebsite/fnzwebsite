import React from 'react';
import {connect} from 'react-redux';
import {Line as LineChart} from 'react-chartjs';
import io from "socket.io-client"
import moment from 'moment'
import * as dealingActions from '../actions/dealingActions';
import {bindActionCreators} from 'redux';
import { authHeader } from '../helpers';
import AmCharts from "@amcharts/amcharts3-react";
const options = {
    responsive: true,
    maintainAspectRatio: true,
    scaleShowGridLines: true,
    scaleGridLineColor: 'rgba(255,255,255,.5)',
    scaleGridLineWidth: 1,
    scaleShowHorizontalLines: true,
    scaleShowVerticalLines: true,
    bezierCurve: true,
    bezierCurveTension: 0.8,
    pointDot: true,
    pointDotRadius: 4,
    pointDotStrokeWidth: 1,
    pointHitDetectionRadius: 20,
    datasetStroke: true,
    datasetStrokeWidth: 1,
    datasetFill: true,
    legendTemplate: '<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
}



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
        var today = moment().format("YYYY-MM-DD");
        var tomorrow = moment().add('days', 1).format("YYYY-MM-DD");
        var yesterday = moment().add('days', -1).format("YYYY-MM-DD");


        if(dealing) {
            let self = this

            let loadAmount = Object.keys(dealing).sort((a, b) => a.tradeDate - b.tradeDate).map(function (keyName, keyIndex) {
                if (self.props.loadThisDay == 'today') {
                    if (moment(dealing[keyName].boxDate).isSame(today, 'day')) {
                        return {
                            'value': parseInt(dealing[keyName].units),
                            'date':moment(dealing[keyName].tradeDate).format()
                        }
                    }
                }
                if (self.props.loadThisDay == 'next') {
                    if (moment(dealing[keyName].boxDate).isSame(tomorrow, 'day')) {
                        return {
                            'value': parseInt(dealing[keyName].units),
                            'date':moment(dealing[keyName].tradeDate).format()
                        }
                    }
                }
                if (self.props.loadThisDay == 'previous') {
                    if (moment(dealing[keyName].boxDate).isSame(yesterday, 'day')) {
                        return {
                            'value': parseInt(dealing[keyName].units),
                            'date':moment(dealing[keyName].tradeDate).format()
                        }
                    }
                }

            });

            let loadDateTime = Object.keys(dealing).sort((a, b) => a.tradeDate - b.tradeDate).map(function (keyName, keyIndex) {
                if (self.props.loadThisDay == 'today') {
                    if (moment(dealing[keyName].boxDate).isSame(today, 'day')) {
                        return moment(dealing[keyName].tradeDate).format("hh:mm");
                    }
                }
                if (self.props.loadThisDay == 'next') {
                    if (moment(dealing[keyName].boxDate).isSame(tomorrow,'day')) {
                        return moment(dealing[keyName].tradeDate).format("hh:mm");
                    }
                }
                if (self.props.loadThisDay == 'previous') {
                    if (moment(dealing[keyName].boxDate).isSame(yesterday, 'day')) {
                        return moment(dealing[keyName].tradeDate).format("hh:mm");
                    }
                }

            });

            loadAmount = loadAmount.filter(function (item) {
                return item != null && item != undefined;
            })

            loadDateTime = loadDateTime.filter(function (item) {
                return item != null && item != undefined;
            })

            let lineChartData = {
                labels: loadDateTime,
                datasets: [
                    {
                        label: 'Trade Chart',
                        fillColor: 'rgba(36, 148, 230, 0.5)',
                        strokeColor: 'rgba(220,220,220,1)',
                        pointColor: 'rgba(220,220,220,1)',
                        pointStrokeColor: '#fff',
                        pointHighlightFill: '#fff',
                        pointHighlightStroke: 'rgba(220,220,220,1)',
                        data: loadAmount,
                    }
                ]
            };
            return loadAmount;
        }
        return null;
    }

    componentWillReceiveProps(prevProps){
        if(prevProps.dealingData != this.props.dealingData && this.props.dealingData) {
                let lineChartData = this.getChartData(this.props.dealingData);
                this.setState({data: lineChartData})
        }
        if(this.props.loadThisDay != prevProps.loadThisDay){
            let lineChartData = this.getChartData(this.props.dealingData);
            this.setState({data: lineChartData})

        }
    }

    render() {

        if(this.state.data) {
            var data = this.state.data.sort(function (left, right) {
                return moment.utc(left.date).diff(moment.utc(right.date))
            });
            console.log(this.state.data)
        const config = {
            "type": "serial",
            "theme": "light",
            "marginTop":0,
            "marginRight": 80,
            "dataProvider":data,
            "valueAxes": [{
                "axisAlpha": 0,
                "position": "left"
            }],
            "graphs": [{
                "id":"g1",
                "balloonText": "[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
                "bullet": "round",
                "bulletSize": 8,
                "lineColor": "#d1655d",
                "lineThickness": 2,
                "negativeLineColor": "#637bb6",
                "type": "smoothedLine",
                "valueField": "value"
            }],
            "chartScrollbar": {
                "graph":"g1",
                "gridAlpha":0,
                "color":"#888888",
                "scrollbarHeight":55,
                "backgroundAlpha":0,
                "selectedBackgroundAlpha":0.1,
                "selectedBackgroundColor":"#888888",
                "graphFillAlpha":0,
                "autoGridCount":true,
                "selectedGraphFillAlpha":0,
                "graphLineAlpha":0.2,
                "graphLineColor":"#c2c2c2",
                "selectedGraphLineColor":"#888888",
                "selectedGraphLineAlpha":1

            },
            "chartCursor": {
                "categoryBalloonDateFormat": "JJ:NN, DD MMMM",
                "cursorAlpha": 0,
                "valueLineEnabled":true,
                "valueLineBalloonEnabled":true,
                "valueLineAlpha":0.5,
                "fullWidth":true
            },

            "categoryField": "date",
            "categoryAxis": {
                "minPeriod": "mm",
                "parseDates": true,
                "minorGridAlpha": 0.1,
                "minorGridEnabled": true
            },
            "export": {
                "enabled": true,
                "dateFormat": "YYYY-MM-DD HH:NN:SS"
            }
        };

            return (
                <AmCharts.React style={{ width: "100%", height: "500px" }} options={config} />
            )
        } else{
            return <div className="load">Loading ...</div>
        }
    }
}

export default LoadLineChart;
