import React from "react";
import ContainerHeader from "components/ContainerHeader/index";
import IntlMessages from "util/IntlMessages";
import {
  Card,
  CardBody,
  CardHeader,
  CardSubtitle,
  CardText,
  CardActions
} from "reactstrap";
import CardBox from "components/CardBox/index";
import Typography from "material-ui/Typography";
import TextField from "material-ui/TextField";
import DataTable from "./Components/dataTable/DataTable";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import moment from "moment";
import dealingActions from 'actions/Dashboard/dealingActions';
import "react-datepicker/dist/react-datepicker.css";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "material-ui/styles";
import {bindActionCreators} from 'redux';
import acdActions from 'actions/Dashboard/acdActions';
import PropTypes from 'prop-types';
import {boxDataCalculation, convertCurrency} from 'components/Common/function/BoxDataCalculation';
import {connect} from 'react-redux';

class ExampleCustomInput extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
          boxData: null
      }
  }

 
  render() {
    return (
      <div>
        <i
          className={`zmdi zmdi-hc-lg pull-left ${this.props.icon} text-black`}
        />
        <TextField
          margin="dense"
          className="example-custom-input"
          onClick={this.props.onClick}
          value={this.props.value}
        />

      </div>
    );
  }
}

class TablePage extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      calendarDate: moment(),
      settlementDate:moment(),
      isOpen: false,
      boxValues:boxDataCalculation(this.props.acdPrice)
    };
    this.handleCalendarDateChange = this.handleCalendarDateChange.bind(this);
    this.handleSettlementDateChange = this.handleSettlementDateChange.bind(this);
    console.log('table page constructor event...');
    if(this.props.location && this.props.location.state && this.props.location.state.data)
    this.props.acdActions.getAcdByDay(this.props.location.state.data, localStorage.getItem('acdId'));
    //alert(JSON.stringify(this.props.location.state.data))
  }

  handleCalendarDateChange(selectedDate) {
    const date = selectedDate ? selectedDate.format('YYYY-MM-DD') : undefined;
    
    this.setState({ calendarDate:moment(date)});
    //console.log('calendar event...');  
    this.props.acdActions.getAcdByDay(date, localStorage.getItem('acdId'));
    this.setState({boxValues: boxDataCalculation(this.props.acdPrice) });
  }

  handleSettlementDateChange(selectedDate)
  {
    const date = selectedDate ? selectedDate.format('YYYY-MM-DD') : undefined;
   // alert(date);
    this.setState({ settlementDate:moment(selectedDate)});
  }

  componentWillMount() {
    console.log('comp will mount....')
if(this.props.location.state && this.props.location.state.data)
{
    var dateValue=this.props.location.state.data
    this.setState({
      calendarDate: moment(dateValue),
      settlementDate:moment(dateValue),
      isOpen: false,
      boxValues: boxDataCalculation(this.props.acdPrice)
    });
    this.props.acdActions.getAcdByDay(dateValue, localStorage.getItem('acdId'));
     var self=this;
     var box=boxDataCalculation(this.props.acdPrice)
     self.setState({boxValues: boxDataCalculation(this.props.acdPrice) });
    }
  }
  componentDidMount()
  {
    console.log('comp did mount....')
    this.props.acdActions.getAcdByDay(moment(this.state.calendarDate).format('YYYY-MM-DD'), localStorage.getItem('acdId'));
  this.setState({boxValues: boxDataCalculation(this.props.acdPrice) });
  }
componentWillReceiveProps()
{
  console.log('receive props event...');
  console.log("table page after nav : " + JSON.stringify(this.props.acdPrice));
  
}
componentWillUnmount()
{
  this.state = {
    calendarDate: moment(),
    settlementDate:moment(),
    isOpen: false,
    boxValues:[]
  };
}
  render() {
    
    if (this.props.acdPrice && this.state.boxValues && this.state.boxValues.length) {
    return (
      <div className="app-wrapper">
        <div className="App app_cards">
          <Card className="shadow border-0 md-card" raised="true">
            <CardHeader className="bg-primary text-white">
              <Link to="/app/dashboard">
                <i
                  className={`zmdi zmdi-hc-lg pull-left zmdi-arrow-left text-white`}
                />
              </Link>

              <span className="pull-right ml-3">
                {this.props.name ? this.props.name : "Fund Details"}
              </span>
            </CardHeader>

            <CardBody className="dashboard_card">
              <div className="row">
                <div className="col-md-2 col-sm-12 open">
                  <div className="row justify-content-center">
                    <Typography variant="title" component="h5">
                      Transaction Date
                    </Typography>
                    <DatePicker
                      dateFormat="DD/MM/YYYY"
                      customInput={
                        <ExampleCustomInput icon="zmdi-arrow-right" idValue="txtTransDate" />
                      }
                      selected={this.state.calendarDate && moment(this.state.calendarDate)}
                      onChange={this.handleCalendarDateChange}
                    />
                  </div>

                  <hr />
                  <div className="row justify-content-center">
                    <Typography variant="title" component="h5">
                      Settlement Date
                    </Typography>

                    <DatePicker
                      dateFormat="DD/MM/YYYY"
                      customInput={
                        <ExampleCustomInput idValue="txtSetDate" />
                      }
                      selected={this.state.settlementDate && moment(this.state.settlementDate)}
                      
                      onChange={this.handleSettlementDateChange}
                    />
                  </div>
                  <hr />
                  <div className="row  justify-content-center">
                    <Typography variant="title" component="h5">
                      Subscriptions
                    </Typography>

                    <Typography component="h2">
                      {convertCurrency(this.state.boxValues[0].subscriptions)} mn<span className="sub-text"></span>
                    </Typography>
                  </div>
                  <hr />
                  <div className="row  justify-content-center">
                    <Typography variant="title" component="h5">
                      Redemptions
                    </Typography>

                    <Typography component="h2"  className="text-warning">
                      {convertCurrency(this.state.boxValues[0].redemptions)} mn<span className="sub-text"></span>
                    </Typography>
                  </div>
                  <hr />
                  <div className="row  justify-content-center">
                    <Typography variant="title" component="h5">
                      Net In/Out Flow
                    </Typography>

                    <Typography component="h2">
                      {convertCurrency(this.state.boxValues[0].netFlow)} mn<span className="sub-text"></span>
                    </Typography>
                  </div>
                </div>
                <div className="col-md-10 col-sm-12 closed">
                  <DataTable tableData={this.props.acdPrice.positions} calendarSelectedDate={this.state.calendarDate}/>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
  else{

    return (
          <div>

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
          </div>
      );

  }

  }
}

const
    mapStateToProps = (state, props) => {
        return {
            acdPrice: state.acdPrice
        }
    };

TablePage.propTypes = {
    acdActions: PropTypes.object,
    acdPrice: PropTypes.array
};

const
    mapDispatchToProps = (dispatch) => ({
        acdActions: bindActionCreators(acdActions, dispatch)
    });

export default connect(mapStateToProps,
    mapDispatchToProps)(TablePage);


//export default TablePage;
