import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import React, { Component } from "react";
import DataTable from "./Components/dataTable/DataTable.js";
import CardBox from "components/CardBox/index";
import IntlMessages from "util/IntlMessages";
import SimpleLineChart from "./Components/simpleLineChart/SimpleLineChart.js";
import Chart from "./Components/Chart/Chart.js";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import SwipeableViews from "react-swipeable-views";
import Tabs, { Tab } from "material-ui/Tabs";
import AppBar from "material-ui/AppBar";
import { Card, CardBody, CardFooter, CardSubtitle, CardText } from "reactstrap";
import { Link } from "react-router-dom";
import {InsertChart , List} from 'material-ui-icons'
import dealingActions from 'actions/Dashboard/dealingActions';
import TodayBox from './TodayBox'
import PreviousBox from './PreviousBox'
import NextBox from './NextBox'
import io from "socket.io-client"
import {authHeader, getConfig} from 'helpers/index';
import moment from "moment";


function TabContainer(props) {
  return <div style={{ padding: 20 }}>{props.children}</div>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

class Dashboard extends Component {

  constructor(props) {
      super(props);
      this.state = {
          dealing: null,
          chart: 'today',
          selected: 'chart',
          transData:null
      };
      //this.changeView = this.changeView.bind(this);
      //this.loadChart = this.loadChart.bind(this);
      //this.getPrice = this.getPrice.bind(this);
  }

  changeView(selected) {
    // alert(selected);
    //   if (this.state.selected != selected) {
    //       this.setState({
    //         selected: selected
    //       });
         
    //   }
    this.loadChart(selected)
  }
  loadChart(selected) {
    console.log('calling load chart in dashboard....' + selected +':'+this.state.chart);
    
        this.props.dealingActions.getDealings();
      
        this.setState({
            chart: selected
        });

        //console.log(this.props.loadThisDay);
        let boxDate;//=moment().format("YYYY-MM-DD");
        if (selected == 'today') {
          boxDate=moment().format("YYYY-MM-DD");
          //console.log('datatable today')
        }
        else   if (selected == 'next') {
           boxDate=moment().add('days',1).format("YYYY-MM-DD");
          //console.log('datatable next')
        }
        
        else   if (selected == 'previous') {
          boxDate=moment().add('days',-1).format("YYYY-MM-DD");
          //console.log('datatable prev')
        }
      
        console.log('change view' + boxDate);
        if(boxDate)
        this.props.dealingActions.getDealingsByBoxDate(boxDate); 
        this.setState({
          transData: this.props.dealsByDate
      })
    
}

  // state = {
  //   value: 0
  // };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  componentWillMount(prevProps, prevState) {
//    console.log('selected : ' + this.state.chart);
    this.props.dealingActions.getDealings();
    this.props.dealingActions.getDealingsByBoxDate('2018-05-14');
  //  this.getPrice();
}
componentDidMount()
{
  var self = this;
  //var socket = io('http://localhost:3700', {query: "auth=" + authHeader()['Authorization']});
  var socket = io(getConfig('socketurl'), {query: "auth=" + authHeader()['Authorization']});
  socket.on('dealingbydate', function (dealingbydate) {
      if (Object.keys(dealingbydate).length > 0) {
          var data = self.state.dealing;
          if (!self.state.dealing) {
              data = {};
              Object.keys(self.props.data.dealing).forEach((itm, i) => {
                  data[itm] = self.props.data.dealing[itm];
              });
          }
          Object.keys(dealingbydate).forEach((itm, i) => {
              data[itm] = dealingbydate[itm];
          });
          self.setState({
              dealing: data
          })
      }
  })
}

  render() {
    console.log("Data for chart & dt: " + JSON.stringify(this.props));
    const { theme } = this.props;
    const { value } = this.state;
    var dealing = this.state.dealing || this.props.data.dealing;
    var dataTableData=this.props.data.dealsByDate;
    //console.log('datatable data in render: ' + JSON.stringify(dataTableData));
        return (
          <div className="app-wrapper">
            <div className="animated slideInUpTiny animation-duration-3">
              <div className="row">
                <div className="col-lg-4 col-sm-12 col-md-4" >
                  <div className="card fund-card shadow text-center">
                  <div className="card-header d-flex justify-content-between bg-primary" onClick={() => this.changeView('previous')}>
              <span className="text-white">

              <i className="zmdi   zmdi-case px-1" />
              Previous Day</span>

              <Link to={{pathname: "/app/table-page",state: { data: moment().add('days', -1).format("YYYY-MM-DD")}}}>
                <i
                  className={`zmdi zmdi-hc-lg pull-right zmdi-arrow-right`}
                />
              </Link>
            </div>

                    <PreviousBox/>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-12 col-md-4">
                  <div className="card fund-card shadow text-center" onClick={() => this.changeView('today')}>
                  <div className="card-header d-flex justify-content-between bg-primary" >
              <span className="text-white">

              <i className="zmdi   zmdi-case px-1" />
              Today</span>

              <Link to={{pathname: "/app/table-page",state: { data: moment().format("YYYY-MM-DD")}}}>
                <i
                  className={`zmdi zmdi-hc-lg pull-right zmdi-arrow-right`}
                />
              </Link>
            </div>
                    <TodayBox/>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-12 col-md-4" onClick={() => this.changeView('next')}>
                  <div className="card fund-card shadow text-center1">
                  <div className="card-header d-flex justify-content-between bg-primary">
              <span className="text-white">

              <i className="zmdi   zmdi-case px-1" />
              Next Day</span>

              <Link to={{pathname: "/app/table-page",state: { data: moment().add('days', 1).format("YYYY-MM-DD")}}}>
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

                      // indicatorColor="primary"
                    >
                      <Tab className="tab tab-icon text-white" label="CHARTS" icon={<InsertChart/>} />
                      <Tab className="tab tab-icon text-white" label="TRANSACTIONS" icon={<List/>}/>
                      {/* <Tab className="tab" label="TAB 2" /> */}
                    </Tabs>
                  </AppBar>

                  <SwipeableViews
                    //axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                  >
                    <TabContainer>
                      <div className="row chart-tab">
                        <CardBox heading="" styleName="col-12">
                          <Chart loadThisDay={this.state.chart}  dealingData={dealing} />
                        </CardBox>
                      </div>
                    </TabContainer>
                    <TabContainer>
                      <div className="tran-tab">
                        <CardBox
                          styleName="col-12"
                          cardStyle="mb-0 p-0"
                          // heading={"charan"}
                          // headerOutside
                        >
                          <DataTable dealsByDate={dataTableData}/>
                        </CardBox>
                      </div>
                    </TabContainer>
                    {/* <TabContainer dir={theme.direction}>
                    <div>
                      <CardBody>
                        <h3 className="card-title">Card Title</h3>
                        <CardSubtitle>Sub-heading text</CardSubtitle>
                        <CardText>
                          Small plates, salads & sandwiches in an intimate setting
                          with 12 indoor seats plus patio seating
                        </CardText>
                        <CardText>
                          Donec imperdiet enim et dignissim interdum. Pellentesque
                          in ortti tor elit. Curabitur consectetur.
                        </CardText>
                      </CardBody>
                      {/* <CardFooter>2 days ago</CardFooter> */}
                    {/* </div> */}
                    {/* </TabContainer> */} */}
                  </SwipeableViews>
                </Card>
              </div>
            </div>
          </div>
        );
  }
}

const
    mapStateToProps = (state, props) => {
        return {
            data: state,
            user: state.user,
            price: state.price,
        }
    };

const
    mapDispatchToProps = (dispatch) => ({
        dealingActions: bindActionCreators(dealingActions, dispatch)
  //      userActions: bindActionCreators(userActions, dispatch)
    });


export default connect(mapStateToProps,
    mapDispatchToProps)(Dashboard);


//export default withStyles(null, { withTheme: true })(Dashboard);
