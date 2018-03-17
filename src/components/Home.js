import {connect} from 'react-redux';
import React from 'react';
import SideNav from './SideNav'
import Header from './Header'
import BoxToday from './BoxDealing'
import LoadLineChart from './LoadLineChart'



class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            chart:'today'
        };

        this.loadChart =  this.loadChart.bind(this);
    }

    loadChart(selected){
        if(this.state.chart != selected) {
            this.setState({
                chart: selected
            })
        }
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
        return (
            <div>
                <Header/>
                <div className="page-content d-flex align-items-stretch">
                    <SideNav/>
                    <div className="content-inner">
                        <div className="container-fluid">
                            <ul className="nav nav-tabs">
                                <li className="active show"><a className="active" href="#home">Dealing</a></li>
                                <li><a href="">Price</a></li>
                                <li><a href="">Settlement</a></li>
                                <li><a href="">Statements</a></li>
                                <li><a href="">Commissions & Fee</a></li>
                                <li><a href="">Corporate Actions</a></li>
                            </ul>
                            <div className="tab-content">
                                <div id="home" className="tab-pane in active">
                                    <div className="col-sm-12">
                                           <BoxToday loadChart={this.loadChart}/>
                                    </div>
                                    <div className="col-sm-12 chart-sec">
                                        <div className="row">
                                            <h5>Trades (Today) <span>01/03/2018</span> <span>12:00 AM</span></h5>
                                            <ul className="nav nav-tabs chart-tabs">
                                                <li className="active"><a className="active" href="#chart"><i
                                                    className="fa fa-area-chart"></i>Chart</a></li>
                                                <li><a href="#table"><i className="fa fa-th-list"></i>Transactions</a></li>
                                            </ul>
                                            <div className="tab-content">
                                                <div id="chart" className="tab-pane in active">
                                                    <div className="line-chart-example card">

                                                        <div className="card-body">
                                                            {/*<canvas id="lineChartExample"></canvas>*/}
                                                            <LoadLineChart loadThisDay={this.state.chart}/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div id="table" className="tab-pane fade">
                                                    <div className="card">

                                                        <div className="card-body">
                                                            <div className="table-responsive">
                                                                <table className="table">
                                                                    <thead>
                                                                    <tr>
                                                                        <th>Trade Date</th>
                                                                        <th>Investment Account</th>
                                                                        <th>ISIN</th>
                                                                        <th>Trade Type</th>
                                                                        <th>Units</th>
                                                                        <th>Amount</th>
                                                                        <th>Status</th>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    <tr>
                                                                        <td>01/02/2018</td>
                                                                        <td>ACC001</td>
                                                                        <td>GBX00241</td>
                                                                        <td>Buy</td>
                                                                        <td>1000</td>
                                                                        <td>-</td>
                                                                        <td><span className="badge bg-green">Accepted</span>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>01/02/2018</td>
                                                                        <td>ACC001</td>
                                                                        <td>GBX00241</td>
                                                                        <td>Buy</td>
                                                                        <td>1000</td>
                                                                        <td>-</td>
                                                                        <td><span className="badge bg-green">Accepted</span>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>01/02/2018</td>
                                                                        <td>ACC001</td>
                                                                        <td>GBX00241</td>
                                                                        <td>Buy</td>
                                                                        <td>1000</td>
                                                                        <td>-</td>
                                                                        <td><span className="badge bg-green">Accepted</span>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>01/02/2018</td>
                                                                        <td>ACC001</td>
                                                                        <td>GBX00241</td>
                                                                        <td>Buy</td>
                                                                        <td>1000</td>
                                                                        <td>-</td>
                                                                        <td><span className="badge bg-orange">On hold</span>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>01/02/2018</td>
                                                                        <td>ACC001</td>
                                                                        <td>GBX00241</td>
                                                                        <td>Buy</td>
                                                                        <td>1000</td>
                                                                        <td>-</td>
                                                                        <td><span className="badge bg-red">Rejected</span>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>01/02/2018</td>
                                                                        <td>ACC001</td>
                                                                        <td>GBX00241</td>
                                                                        <td>Buy</td>
                                                                        <td>1000</td>
                                                                        <td>-</td>
                                                                        <td><span className="badge bg-green">Accepted</span>
                                                                        </td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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

export default Home;
