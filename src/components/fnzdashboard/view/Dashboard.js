import {connect} from 'react-redux';
import React from 'react';
import {fetchDealings} from '../actions/dealing';
import DataTable from "./dataTable/DataTable.js";
import CardBox from "components/Common/view/CardBox/index";
import Chart from "./Chart/Chart.js";
import BiaxialBarChart from './Chart/BiaxialBarChart';
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import Tabs, {Tab} from "material-ui/Tabs";
import AppBar from "material-ui/AppBar";
import {Card, CardBody, CardFooter, CardSubtitle, CardText} from "reactstrap";
import {Link} from "react-router-dom";
import {InsertChart, List} from 'material-ui-icons'
import TodayBox from './TodayBox'
import PreviousBox from './PreviousBox'
import NextBox from './NextBox'
// import io from "socket.io-client"
import {authHeader, getConfig} from 'helpers/index';
import moment from "moment";

function TabContainer(props) {
    return <div style={{padding: 20}}>{props.children}</div>;
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
};

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dealing: null,
            chart: 'today',
            selected: 'chart',
            selectedBox: 'today',
            value:0,
        };
        this.changeView = this.changeView.bind(this);
        this.loadChart = this.loadChart.bind(this);
    }

    changeView(selectedBox) {
        if (this.state.selectedBox != selectedBox) {
            this.loadData(selectedBox);
            this.setState({
                selectedBox: selectedBox
            });
        }
    }

    loadChart(selected) {
        if (this.state.chart != selected) {
            this.setState({
                chart: selected
            })
        }
    }

    handleChange = (event, value) => {
        this.setState({value});
    };

    handleChangeIndex = index => {
        this.setState({value: index});
    };

    componentWillMount(prevProps, prevState) {
        this.loadData('today');
    }

    componentDidUpdate() {

    }

    loadData(selected) {
        let date = moment().format('YYYY-MM-DD');
        if (selected == 'today') {
            date = moment().format('YYYY-MM-DD')
        } else if (selected == 'previous') {
            date = moment().add('days', -1).format("YYYY-MM-DD")
        } else if (selected == 'next') {
            date = moment().add('days', 1).format("YYYY-MM-DD")
        }
        this.props.fetchDealings(date);
    }

// componentDidMount(prevProps, prevState) {
    //     var self = this;
    //     //var socket = io('http://localhost:3700', {query: "auth=" + authHeader()['Authorization']});
    //     var socket = io(getConfig('socketurl'), {query: "auth=" + authHeader()['Authorization']});
    //     socket.on('dealingbydate', function (dealingbydate) {
    //         if (Object.keys(dealingbydate).length > 0) {
    //             var data = self.state.dealing;
    //             if (!self.state.dealing) {
    //                 data = {};
    //                 Object.keys(self.props.data.dealing).forEach((itm, i) => {
    //                     data[itm] = self.props.data.dealing[itm];
    //                 });
    //             }
    //             Object.keys(dealingbydate).forEach((itm, i) => {
    //                 data[itm] = dealingbydate[itm];
    //             });
    //             self.setState({
    //                 dealing: data
    //             })
    //         }
    //     })
    // }


    render() {
        const {theme} = this.props;
        const {value} = this.state;
        var dealing = this.props.dealingList | this.state.dealing;
        if(this.props.dealingList) {
            return (
                <div className="app-wrapper">
                    <div className="animated slideInUpTiny animation-duration-3">
                        <div className="row">
                            <div className="col-lg-4 col-sm-12 col-md-4" onClick={() => this.changeView('previous')}>
                                <div className="card fund-card shadow text-center">
                                    <div className="card-header d-flex justify-content-between bg-primary">
                                  <span className="text-white">
                                      <i className="zmdi   zmdi-case px-1"/>Previous Day
                                  </span>

                                        <Link to={{
                                            pathname: "/app/table-page",
                                            state: {data: moment().add('days', -1).format("YYYY-MM-DD")}
                                        }}>
                                            <i
                                                className={`zmdi zmdi-hc-lg pull-right zmdi-arrow-right`}
                                            />
                                        </Link>
                                    </div>

                                    <PreviousBox/>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-12 col-md-4" onClick={() => this.changeView('today')}>
                                <div className="card fund-card shadow text-center">
                                    <div className="card-header d-flex justify-content-between bg-primary">
              <span className="text-white">

              <i className="zmdi   zmdi-case px-1"/>
              Today</span>

                                        <Link to={{
                                            pathname: "/app/table-page",
                                            state: {data: moment().format("YYYY-MM-DD")}
                                        }}>
                                            <i
                                                className={`zmdi zmdi-hc-lg pull-right zmdi-arrow-right`}
                                            />
                                        </Link>
                                    </div>
                                    <TodayBox/>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-12 col-md-4" onClick={() => this.changeView('next')}>
                                <div className="card fund-card shadow text-center">
                                    <div className="card-header d-flex justify-content-between bg-primary">
              <span className="text-white">

              <i className="zmdi   zmdi-case px-1"/>
              Next Day</span>

                                        <Link to={{
                                            pathname: "/app/table-page",
                                            state: {data: moment().add('days', 1).format("YYYY-MM-DD")}
                                        }}>
                                            <i
                                                className={`zmdi zmdi-hc-lg pull-right zmdi-arrow-right`}
                                            />
                                        </Link>
                                    </div>
                                    <NextBox/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="animated slideInUpTiny animation-duration-3">
                        <div className="chart-tab">
                            <Card className="shadow border-0">
                                <AppBar className="bg-primary" position="static">
                                    <Tabs
                                        value={this.state.value}
                                        onChange={this.handleChange}
                                        fullWidth
                                    >
                                        <Tab className="tab tab-icon text-white" label="CHARTS" icon={<InsertChart/>}/>
                                        <Tab className="tab tab-icon text-white" label="TRANSACTIONS" icon={<List/>}/>
                                    </Tabs>
                                </AppBar>

                                <SwipeableViews
                                    index={this.state.value}
                                    onChangeIndex={this.handleChangeIndex}
                                >
                                    <TabContainer>
                                        <div className="row chart-tab">
                                            <CardBox heading="" styleName="col-12">
                                                {/*<BiaxialBarChart/>*/}
                                                <Chart loadThisDay={this.state.selectedBox}  dealsByDate={this.props.dealingList} />
                                            </CardBox>
                                        </div>
                                    </TabContainer>
                                    <TabContainer>
                                        <div className="tran-tab">
                                            <CardBox
                                                styleName="col-12"
                                                cardStyle="mb-0 p-0"
                                            >
                                                <DataTable dealsByDate={this.props.dealingList}/>
                                            </CardBox>
                                        </div>
                                    </TabContainer>
                                </SwipeableViews>
                            </Card>
                        </div>
                    </div>
                </div>
            );
        }else {
            return null;
        }
    }

}


const mapStateToProps = ({dealing}) => {
    const {
        dealingList,
    } = dealing;
    return {
        dealingList,
    }
};
export default connect(mapStateToProps, {
    fetchDealings,
})(Dashboard);
