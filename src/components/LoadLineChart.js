import React from 'react';
import {connect} from 'react-redux';
import {Line as LineChart} from 'react-chartjs';
import io from "socket.io-client"
import moment from 'moment'
import * as dealingActions from '../actions/dealingActions';
import {bindActionCreators} from 'redux';
import { authHeader } from '../helpers';
const options = {
    responsive: true,
    maintainAspectRatio: false,
    scaleShowGridLines: true,
    scaleGridLineColor: 'rgba(255,255,255,.05)',
    scaleGridLineWidth: 1,
    scaleShowHorizontalLines: true,
    scaleShowVerticalLines: true,
    bezierCurve: true,
    bezierCurveTension: 0.4,
    pointDot: true,
    pointDotRadius: 4,
    pointDotStrokeWidth: 1,
    pointHitDetectionRadius: 20,
    datasetStroke: true,
    datasetStrokeWidth: 1,
    datasetFill: true,
    legendTemplate: '<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
}

const styles = {
    graphContainer: {
        border: '0px solid white',
        padding: '15px'
        
    }
}


class LoadLineChart extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: null,
            dealing:null
        }
        this.getChartData = this.getChartData.bind(this);
    }

    getChartData(dealing) {

        if(dealing) {
            let self = this

            let loadAmount = Object.keys(dealing).sort((a, b) => a.tradeDate - b.tradeDate).map(function (keyName, keyIndex) {
                if (self.props.loadThisDay == 'today') {
                    if (moment(dealing[keyName].boxDate).isSame(moment(), 'day')) {
                        return dealing[keyName].units;
                    }
                }
                if (self.props.loadThisDay == 'next') {
                    if (moment(dealing[keyName].boxDate).isSameOrAfter(moment(moment.now()))) {
                        return dealing[keyName].units;
                    }
                }
                if (self.props.loadThisDay == 'previous') {
                    if (moment(dealing[keyName].boxDate).isSameOrBefore(moment(), 'day')) {
                        return dealing[keyName].units;
                    }
                }

            });

            let loadDateTime = Object.keys(dealing).sort((a, b) => a.tradeDate - b.tradeDate).map(function (keyName, keyIndex) {
                if (self.props.loadThisDay == 'today') {
                    if (moment(dealing[keyName].boxDate).isSame(moment(), 'day')) {
                        return moment(dealing[keyName].tradeDate).format("hh:mm");
                    }
                }
                if (self.props.loadThisDay == 'next') {
                    if (moment(dealing[keyName].boxDate).isSameOrAfter(moment(moment.now()))) {
                        return moment(dealing[keyName].tradeDate).format("hh:mm");
                    }
                }
                if (self.props.loadThisDay == 'previous') {
                    if (moment(dealing[keyName].boxDate).isSameOrBefore(moment(), 'day')) {
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
                        label: 'My First dataset',
                        fillColor: 'rgba(38, 148, 216, 0.5)',
                        strokeColor: 'rgba(220,220,220,1)',
                        pointColor: 'rgba(220,220,220,1)',
                        pointStrokeColor: '#fff',
                        pointHighlightFill: '#fff',
                        pointHighlightStroke: 'rgba(220,220,220,1)',
                        data: loadAmount,
                    }
                ]
            };
            return lineChartData;
        }
        return null;
    }

    componentWillMount(prevProps, prevState) {
        this.props.dealingActions.getDealings();
    }

    componentWillReceiveProps(prevProps){
        if(prevProps.data.dealing != this.props.data.dealing && this.props.data.dealing) {
                let lineChartData = this.getChartData(this.props.data.dealing);
                this.setState({dealing: this.props.data.dealing, data: lineChartData})
        }
        if(this.props.loadThisDay != prevProps.loadThisDay){
            let lineChartData = this.getChartData(this.props.data.dealing);
            this.setState({dealing: this.props.data.dealing, data: lineChartData})

        }
    }

    componentDidMount(prevProps, prevState) {
        var self = this;
        var socket = io('http://localhost:3700',{ query: "auth="+authHeader()['Authorization']});
        socket.on('dealing', function (dealing) {
            // console.log(JSON.stringify(dealing));
            if(self.state.dealing !== dealing) {
                    let lineChartData = self.getChartData(dealing);
                    self.setState({dealing: dealing, data: lineChartData})
            }
        })
    }

    render() {

        if(this.state.data) {
            return (

                <div style={styles.graphContainer}>
                    <LineChart data={this.state.data}
                               options={options}
                               style={{background:'none',color:'#fff'}}/>
                </div>
            )
        } else{
            return <div className="load">Loading ...</div>
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
    LoadLineChart
)
;
