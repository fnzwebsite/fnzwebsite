import React from 'react';
import moment from 'moment';
import 'moment-timezone';
import RTChart from 'react-c3js';

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


const LineChart = ({ size,padding,tooltip,data,bar,axis,grid }) =>
    <RTChart
        size={size}
        padding={padding}
        tooltip={tooltip}
        data={data}
        bar={bar}
        axis={axis}
        grid={grid}
    />


class LoadLineChart extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: null,
            timer: null,
            chartValues:[]
        }
        //this.props.dealingActions.getDealings();
        this.getChartData = this.getChartData.bind(this);
    }

    getChartData(dealing,loadThisDay) {
        var today = moment().format("YYYY-MM-DD");
        var tomorrow = moment().add('days', 1).format("YYYY-MM-DD");
        var yesterday = moment().add('days', -1).format("YYYY-MM-DD");
        if (dealing && dealing.code!=2) {
            let datetime = [];
            datetime.push('x');
            datetime.push('00:00')
            let buy = [];
            buy.push('BUY');
            buy.push(0);
            let sell = [];
            sell.push('SELL');
            sell.push(0);
            let self = this;
            let chartVal=[];
            let tdayIndex=0;
            let ydayIndex=0;
            let ndayIndex=0;
            let loadAmount = Object.keys(dealing).sort((a, b) => a.tradeTime - b.tradeTime).map(function (keyName, keyIndex) {
                if (loadThisDay == 'today') {
                    if (moment(dealing[keyName].boxDate).isSame(today, 'day')) {
                        let tdate = moment(dealing[keyName].tradeTime);//.tz('Europe/London');
                        
                        //chartVal.push(tdate._a[3] + ':' + tdate._a[4] + ':' + tdate._a[5])
            
                        if (dealing[keyName].dealType.toUpperCase() == "BUY") {
                            if(dealing[keyName].units>0)
                            {
                                datetime.push(tdate._a[3] + ':' + tdate._a[4])
                                chartVal.push(++tdayIndex);
                            buy.push(dealing[keyName].units)
                            sell.push(0)
                            }
                        } else {
                            if(dealing[keyName].units>0)
                            {
                                datetime.push(tdate._a[3] + ':' + tdate._a[4] )
                            buy.push(0)
                           chartVal.push(++tdayIndex);
                            sell.push(dealing[keyName].units)
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
                            if(dealing[keyName].units>0)
                            {
                                datetime.push(tdate._a[3] + ':' + tdate._a[4] )
                                chartVal.push(++ndayIndex);
                            buy.push(dealing[keyName].units)
                           // console.log('buy value: '+dealing[keyName].units)
                            //console.log('buy value time: '+dealing[keyName].tradeTime)
                            sell.push(0)
                            }
                        } else {
                            if(dealing[keyName].units>0)
                            {
                                datetime.push(tdate._a[3] + ':' + tdate._a[4] )
                            buy.push(0)
                            chartVal.push(++ndayIndex);
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
                            if(dealing[keyName].units>0)
                            {
                            datetime.push(tdate._a[3] + ':' + tdate._a[4])
                            buy.push(dealing[keyName].units)
                            chartVal.push(++ydayIndex);
                            sell.push(0)
                            }
                        } else {
                            if(dealing[keyName].units>0)
                            {
                                datetime.push(tdate._a[3] + ':' + tdate._a[4] )
                                chartVal.push(++ydayIndex);
                            buy.push(0)
                            sell.push(dealing[keyName].units)
                            }
                        }
                        return null
                    }
                }
            });
            this.setState({chartValues:chartVal})
            var data = [
                datetime,
                buy,
                sell
            ];

            return data;
        }
        return null;
    }

    componentWillReceiveProps(nextProps) {
        console.log("Chart Props: " + JSON.stringify(nextProps.loadThisDay))
        if (nextProps.dealingData) {
            let data = nextProps.dealingData;
            let loadThisDay = nextProps.loadThisDay;
            console.log("Chart Data: "+ JSON.stringify(data))
            let lineChartData = this.getChartData(data,loadThisDay);
            this.setState({data: lineChartData})
        }
        // if (this.props.loadThisDay != nextProps.loadThisDay) {
        //     let data = nextProps.dealingData || this.props.dealingData;
        //     let loadThisDay = nextProps.loadThisDay || this.props.loadThisDay;
        //     let lineChartData = this.getChartData(data,loadThisDay);
        //     this.setState({data: lineChartData})
        //
        // }
    }

    render() {
        //  console.log(JSON.stringify(this.state.data))
        if (this.state.data && this.state.data.length) {
            var options = {
                legend: {position: 'none'},
                pointSize: 10,
                series: {
                    0: {color: '#2051ba', lineWidth: 1, pointShape: 'circle'},
                },
                enableInteractivity: false,
                chartArea: {
                    width: '100%'
                },
                // padding: {
                //     top: 40,
                //     right: 100,
                //     bottom: 40,
                //     left: 200,
                // },

//                 bar: {
//     groupWidth: '100%'
// },
                // hAxis: {
                //     ticks: [[0, 0, 0], [1, 0, 0], [2, 0, 0],[3, 0, 0],[4, 0, 0], [5, 0, 0],[6, 0, 0], [7, 0, 0],[8, 0, 0], [9, 0, 0],[10, 0, 0], [11, 0, 0], [12, 0, 0], [13, 0, 0],
                //         [14, 0, 0], [15, 0, 0], [16, 0, 0], [17, 0, 0], [18, 0, 0],[19, 0, 0],[20, 0, 0],[21, 0, 0],[22, 0, 0],[23, 0, 0],[24, 0, 0]]
                // }

                // hAxis: {
                //     ticks: [[0, 0, 0],  [2, 0, 0],[4, 0, 0], [6, 0, 0], [8, 0, 0], [10, 0, 0], [12, 0, 0],
                //         [14, 0, 0],  [16, 0, 0],  [18, 0, 0],[20, 0, 0],[22, 0, 0],[24, 0, 0]]
                // }
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


            const data = {
                x: 'x',
                xFormat: '%H:%M',
                columns: this.state.data,
                type: 'bar'
            };
            const bar = {
                width: {
                    ratio: 0.02// this makes bar width 50% of length between ticks
                },

                spacing: 20,
                border:{
                  width:'1px',
                  color:'black'
                }
                // or
                //width: 100 // this makes bar width 100px
            };
//console.log("chart values: "+ JSON.stringify(this.state.chartValues));
            const axis = {
                x: {
                    min: '00:30',
                    max: '23:00',
                    type: 'timeseries',
                    width:'100%',
                    tick: {
                        format: '%H:%M',
                        values: this.state.chartValues
                        // values: ['00:00:00', '1:00:00', '2:00:00', '3:00:00', '4:00:00', '5:00:00',
                        // '6:00:00', '7:00:00', '8:00:00', '9:00:00', '10:00:00',
                        // '11:00:00', '12:00:00', '13:00:00', '14:00:00', '15:00:00',
                        // '16:00:00', '17:00:00', '18:00:00', '19:00:00', '20:00:00',
                        // '21:00:00', '22:00:00', '23:00:00']
                    }
                }
            };
            const tooltip= {
                show: true
            }

            const padding= {
                // top: 40,
                // right: 100,
                // bottom: 40,
                // left: 200,
            };

            const grid = {
                x: {
                    show: true
                },
                y: {
                    show: true
                }
            };

            const size = {};

            return (<LineChart size={size}
                           padding={padding}
                           tooltip={tooltip}
                           data={data}
                           bar={bar}
                           axis={axis}
                           grid={grid}
                           />
            )
        }
        else if(!this.state.data) {
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

    }
}

export default LoadLineChart;
