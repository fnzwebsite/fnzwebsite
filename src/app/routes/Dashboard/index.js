import React, { Component } from "react";
import DataTable from "./Components/dataTable/DataTable.js";
import CardBox from "components/CardBox/index";
import IntlMessages from "util/IntlMessages";
import SimpleLineChart from "./Components/simpleLineChart/SimpleLineChart.js";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import SwipeableViews from "react-swipeable-views";
import Tabs, { Tab } from "material-ui/Tabs";
import AppBar from "material-ui/AppBar";
import { Card, CardBody, CardFooter, CardSubtitle, CardText } from "reactstrap";
import { Link } from "react-router-dom";
import {InsertChart , List} from 'material-ui-icons'
import acdActions from 'actions/Dashboard/acdActions';
import TodayBox from './TodayBox'
import PreviousBox from './PreviousBox'
import NextBox from './NextBox'

function TabContainer(props) {
  return <div style={{ padding: 20 }}>{props.children}</div>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

class Dashboard extends Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };


  render() {
    const { theme } = this.props;
    const { value } = this.state;

    return (
      <div className="app-wrapper">
        <div className="animated slideInUpTiny animation-duration-3">
          <div className="row">
            <div className="col-lg-4 col-sm-12 col-md-4">
              <div className="card fund-card shadow text-center">
                <PreviousBox/>
              </div>
            </div>
            <div className="col-lg-4 col-sm-12 col-md-4">
              <div className="card fund-card shadow text-center">
                <TodayBox/>
              </div>
            </div>
            <div className="col-lg-4 col-sm-12 col-md-4">
              <div className="card fund-card shadow text-center">
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
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={this.state.value}
                onChangeIndex={this.handleChangeIndex}
              >
                <TabContainer dir={theme.direction}>
                  <div className="row chart-tab">
                    <CardBox heading="Simple Line Chart" styleName="col-12">
                      <SimpleLineChart />
                    </CardBox>
                  </div>
                </TabContainer>
                <TabContainer dir={theme.direction}>
                  <div className="tran-tab">
                    <CardBox
                      styleName="col-12"
                      cardStyle="mb-0 p-0"
                      // heading={"charan"}
                      // headerOutside
                    >
                      <DataTable />
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

export default withStyles(null, { withTheme: true })(Dashboard);
