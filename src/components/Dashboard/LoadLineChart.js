import React from 'react';
import moment from 'moment';
import 'moment-timezone';
import { Charts, ChartContainer, ChartRow, YAxis, LineChart,BarChart,styler,Resizable } from "react-timeseries-charts";
import { TimeSeries, Index } from "pondjs";
import _ from "underscore";

class LoadLineChart extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: null,
            timer: null
        }
        this.getChartData = this.getChartData.bind(this);
    }

    getChartData(dealing,loadThisDay) {
        var today = moment().format("YYYY-MM-DD");
        var tomorrow = moment().add('days', 1).format("YYYY-MM-DD");
        var yesterday = moment().add('days', -1).format("YYYY-MM-DD");
        if (dealing) {
            let datetime = [];
            // datetime.push('x');
            // datetime.push('00:00:00')
            let buy = [];
            buy.push('BUY');
            buy.push(0);
            let sell = [];
            sell.push('SELL');
            sell.push(0);
            let self = this;
            Object.keys(dealing).sort((a, b) => a.tradeDate - b.tradeDate).map(function (keyName, keyIndex) {
                if (loadThisDay == 'today') {
                    if (moment(dealing[keyName].boxDate).isSame(today, 'day')) {
                        let tdate = moment(dealing[keyName]).format();//.tz('Europe/London');
                        let buy=0;
                        let sell=0;
                        if (dealing[keyName].dealType.toUpperCase() == "BUY") {
                            buy=parseFloat(dealing[keyName].units)
                        } else {
                            sell=parseFloat(dealing[keyName].units)
                        }
                        datetime.push({
                            "day":tdate,
                            "buy":buy,
                            "sell":sell
                        })
                    }
                }
                if (loadThisDay == 'next') {
                    if (moment(dealing[keyName].boxDate).isSame(tomorrow, 'day')) {
                        let tdate = moment(dealing[keyName]).format();//.tz('Europe/London');
                        let buy=0;
                        let sell=0;
                        if (dealing[keyName].dealType.toUpperCase() == "BUY") {
                            buy=parseFloat(dealing[keyName].units)
                        } else {
                            sell=parseFloat(dealing[keyName].units)
                        }
                        datetime.push({
                            "day":tdate,
                            "buy":buy,
                            "sell":sell
                        })
                    }
                }
                if (loadThisDay == 'previous') {
                    if (moment(dealing[keyName].boxDate).isSame(yesterday, 'day')) {
                        let tdate = moment(dealing[keyName]).format();//.tz('Europe/London');
                        let buy=0;
                        let sell=0;
                        if (dealing[keyName].dealType.toUpperCase() == "BUY") {
                            buy=parseFloat(dealing[keyName].units)
                        } else {
                            sell=parseFloat(dealing[keyName].units)
                        }
                        datetime.push({
                            "day":tdate,
                            "buy":buy,
                            "sell":sell
                        })
                    }
                }
            });
            if(!datetime.length){
                datetime.push({
                    "day":Date.now(),
                    "buy":0,
                    "sell":0
                })
            }
            return datetime;
        }
        return null;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.dealingData) {
            let data = nextProps.dealingData;
            let loadThisDay = nextProps.loadThisDay;
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

            const trafficPoints = [];
            let days =  {
                "2017-01-24 00:00": {
                    "sell": 0,
                    "buy": 0
                },
                "2017-01-24 01:00": {
                    "sell": 0,
                    "buy": 0
                },
                "2017-01-24 02:00": {
                    "sell": 1986197127,
                    "buy": 19846971404
                },
                "2017-01-24 03:00": {
                    "sell": 1177950617,
                    "buy": 17541914504
                },
                "2017-01-24 04:00": {
                    "sell": 1281479627,
                    "buy": 20232695119
                },
                "2017-01-24 05:00": {
                    "sell": 2373719987,
                    "buy": 20134120911
                },
                "2017-01-24 06:00": {
                    "sell": 2323214242,
                    "buy": 20516634469
                },
                "2017-01-24 07:00": {
                    "sell": 2674652446,
                    "buy": 10246808258
                },
                "2017-01-24 08:00": {
                    "sell": 2500003470,
                    "buy": 23132909039
                },
                "2017-01-24 09:00": {
                    "sell": 966755611059,
                    "buy": 2078400880486
                },
                "2017-01-24 10:00": {
                    "sell": 1351935971,
                    "buy": 23004217311
                },
                "2017-01-24 11:00": {
                    "sell": 1540156365,
                    "buy": 16061455806
                },
                "2017-01-24 12:00": {
                    "sell": 3013747074,
                    "buy": 17998608884
                },
                "2017-01-24 13:00": {
                    "sell": 2729323220,
                    "buy": 13833523968
                },
                "2017-01-24 14:00": {
                    "sell": 2870854342,
                    "buy": 18102574816
                },
                "2017-01-24 15:00": {
                    "sell": 2727037213,
                    "buy": 18122620285
                },
                "2017-01-24 16:00": {
                    "sell": 2320878527,
                    "buy": 15011753268
                },
                "2017-01-24 17:00": {
                    "sell": 1272914222,
                    "buy": 17681992155
                },
                "2017-01-24 18:00": {
                    "sell": 1165974499,
                    "buy": 13594811406
                },
                "2017-01-24 19:00": {
                    "sell": 2430740398,
                    "buy": 22161431584
                },
                "2017-01-24 20:00": {
                    "sell": 2745955471,
                    "buy": 17968312440
                },
                "2017-01-24 21:00": {
                    "sell": 0,
                    "buy": 21545066936
                },
                "2017-01-24 22:00": {
                    "sell": 3614097683,
                    "buy": 15600467931
                },
                "2017-01-24 23:00": {
                    "sell": 0,
                    "buy": 0
                },
                "2017-01-24 24:00": {
                    "sell": 0,
                    "buy": 0
                }
            };

            let max = 0;
            _.each(this.state.data, (value, day) => {
                max = Math.max(max, value.buy);
                max = Math.max(max, value.sell);
                trafficPoints.push([Index.getIndexString("1h", new Date(value.day)), value.buy, value.sell]);
            });

            const series = new TimeSeries({
                name: "Units",
                utc: false,
                columns: ["index", "buy", "sell"],
                points: trafficPoints
            });

            const style = styler([
                { key: "buy", color: "#A5C8E1", selected: "#2CB1CF" },
                { key: "sell", color: "#FFCC9E", selected: "#2CB1CF" },
            ]);

            let infoValues = [];

            let loadChart = true;
            loadChart = this.state.data.length == 1 && this.state.data[0].buy == 0 && this.state.data[0].sell == 0;

            var buychart = <BarChart
                visible={!loadChart}
                spacing={1}
                axis="chart"
                style={style}
                size={10}
                offset={1}
                columns={["buy"]}
                series={series}
                info={infoValues}
                infoTimeFormat="%m/%d/%y"
            />;
            let sellchart = <BarChart
                visible={!loadChart}
                spacing={1}
                axis="chart"
                style={style}
                size={10}
                offset={-4}
                columns={["sell"]}
                series={series}
                info={infoValues}
            />;

            return (
                <Resizable>
                    <ChartContainer
                        timeRange={series.range()}
                        showGrid={true}
                    >
                        <ChartRow height="150">
                            <YAxis
                                id="chart"
                                label="Units"
                                classed="units-in"
                                min={0}
                                max={max}
                                format=".2f"
                                width="70"
                                type="linear"
                            />
                            <Charts>
                                {buychart}
                                {sellchart}
                            </Charts>
                        </ChartRow>
                    </ChartContainer>
                </Resizable>
            )
        }

        else if(!this.state.data) {
              return (
                <div class="preloader">
                                         <span class="line line-1"></span>
                                         <span class="line line-2"></span>
                                         <span class="line line-3"></span>
                                         <span class="line line-4"></span>
                                         <span class="line line-5"></span>
                                         <span class="line line-6"></span>
                                         <span class="line line-7"></span>
                                         <span class="line line-8"></span>
                                         <span class="line line-9"></span>
                                         <div>Loading</div>
                                     </div>
              )


        }

    }
}

export default LoadLineChart;
