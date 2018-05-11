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
      //alert(JSON.stringify(this.props));
      //this.handletextChange=this.handletextChange.bind(this)
  }

  handletextChange(e){
    alert('text');
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
    onChange={this.handletextChange}

        />

      </div>
    );
  }
}

class TablePage extends React.Component {
  constructor(props) {
    super(props);
    var date=this.props.location.state.data;
    this.state = {
      startDate: moment(date),
      isOpen: false,
      boxValues: []
    };
    this.handleChange = this.handleChange.bind(this);
    //alert(JSON.stringify(this.props.location.state.data))
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
    var date=moment(this.state.startDate).format("YYYY-MM-DD");
    this.props.acdActions.getAcdByDay(date, localStorage.getItem('acdId'));
    //alert(JSON.stringify(this.props.acdPrice));
    //console.log(JSON.stringify(this.props.acdPrice));
  }

  componentWillMount(prevProps, prevState) {
    // this.props.acdActions.getAcdByDay('2018-05-09', localStorage.getItem('acdId'));
    // alert(JSON.stringify(this.props.acdPrice))
  }
  componentDidMount(prevProps, prevState) {
        var dateValue=this.props.location.state.data
        this.props.acdActions.getAcdByDay(dateValue, localStorage.getItem('acdId'));
        var self=this;
        //var box=boxDataCalculation(this.props.acdPrice)
        self.setState({boxValues: boxDataCalculation(this.props.acdPrice) });
        //alert(JSON.stringify(this.state.boxValues))
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
                        <ExampleCustomInput icon="zmdi-arrow-right" />
                      }
                      selected={this.state.startDate}
                      onChange={this.handleChange}
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
                        <ExampleCustomInput />
                      }
                      selected={this.state.startDate}
                      onChange={this.handleChange}
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
                  <DataTable tableData={this.props.acdPrice.positions}/>
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
