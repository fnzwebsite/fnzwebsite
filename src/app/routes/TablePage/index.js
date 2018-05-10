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
      alert(JSON.stringify(this.props));
  }
  // componentWillMount(){
  //   alert(JSON.stringify(this.props));
  // }
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
        <i
          className="zmdi zmdi-calendar zmdi-hc-2x"
          onClick={this.props.onClick}
        />
      </div>
    );
  }
}

class TablePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      isOpen: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  render() {
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
                      <span>£</span>23.4678 mn<span className="sub-text"></span>
                    </Typography>
                  </div>
                  <hr />
                  <div className="row  justify-content-center">
                    <Typography variant="title" component="h5">
                      Redemptions
                    </Typography>

                    <Typography component="h2"  className="text-warning">
                      <span>£</span>9.3256 mn<span className="sub-text"></span>
                    </Typography>
                  </div>
                  <hr />
                  <div className="row  justify-content-center">
                    <Typography variant="title" component="h5">
                      Net In/Out Flow
                    </Typography>

                    <Typography component="h2">
                      <span>£</span>23.46 mn<span className="sub-text"></span>
                    </Typography>
                  </div>
                </div>
                <div className="col-md-10 col-sm-12 closed">
                  <DataTable />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

export default TablePage;
