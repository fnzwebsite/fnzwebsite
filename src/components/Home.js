import {connect} from 'react-redux';
import React from 'react';
import SideNav from './SideNav'
import Header from './Header'
import BoxToday from './BoxDealing'
import LoadLineChart from './LoadLineChart'
import TransactionsTable from './TransactionsTable'



class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            chart:'today',
            selected:'chart'
        };
        this.changeView =  this.changeView.bind(this);
        this.loadChart =  this.loadChart.bind(this);
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
            <div className="page">
                <div className="page-content d-flex align-items-stretch">
                    <SideNav/>
                    <div className="content-inner">
                        <Header/>
                        <div className="container-fluid">
                            <div className="col-sm-12 mt-70">

                                    <BoxToday loadChart={this.loadChart}/>

                            </div>
                            <div className="tab-content">
                                <div id="home" className="tab-pane in active">

                                    <div className="col-sm-12 chart-sec">
                                        <div className="row">
                                            <h5>Trades (Today) <span>01/03/2018 &nbsp 12:00 AM</span></h5>

                                            <ul className="nav nav-tabs chart-tabs has-shadow">
                                                <li className={this.state.selected == "chart" ? 'active':''}><a className={this.state.selected == "chart" ? 'active':''} onClick={() => this.changeView('chart')} ><i className="fa fa-area-chart"></i>Chart</a></li>
                                                <li className={this.state.selected == "table" ? 'active':''}><a className={this.state.selected == "chart" ? 'active':''} onClick={() => this.changeView('table')}><i className="fa fa-th-list"></i>Transactions</a></li>
                                            </ul>
                                            <div className="tab-content">
                                                <div id="chart" className={this.state.selected == "chart" ? 'tab-pane in active':'tab-pane fade'}>
                                                    <div className="line-chart-example card">
                                                        <div className="card-body">
                                                            <LoadLineChart loadThisDay={this.state.chart}/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div id="table" className={this.state.selected == "table" ? 'tab-pane in active':'tab-pane fade'}>
                                                    <div className="card">
                                                        <TransactionsTable loadThisDay={this.state.chart}/>
                                                    </div>
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

export default Home;
