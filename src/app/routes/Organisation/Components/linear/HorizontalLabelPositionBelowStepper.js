import React from "react";
import Stepper, { Step, StepLabel } from "material-ui/Stepper";
import Button from "material-ui/Button";
import Checkbox from "material-ui/Checkbox";
import TextField from "material-ui/TextField";
import Typography from "material-ui/Typography";
import IntlMessages from "util/IntlMessages";
import MenuItem from "material-ui/Menu/MenuItem";
import {ButtonDropdown, ButtonGroup, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';
import {FormControl, FormControlLabel, FormLabel} from 'material-ui/Form';
function getSteps() {
  return [
    "Organisation Information",
    "Registered Address",
    "Postal Address",
    "More Details"
  ];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return getEntityInformation();
    case 1:
      return <GetRegisteredAddress />;
    case 2:
      return <GetPostalAddress />;
    case 3:
      return getMoreDetails();

    default:
      return "Uknown stepIndex";
  }
}

function getEntityInformation() {
  return (
    <div className="bodyHeight">
      <div className="row">
        <div className="col-md-5">
          <div className="form-group">
            <TextField
              id="organisation_name"
              label="Organisation Name*"
              margin="normal"
              fullWidth
            />
          </div>
        </div>

        
        </div>

  <div className="row">
        <div className="col-md-12 my-4">
        <div className="row">
              <div className="col-md-8">
        <ButtonGroup >
                <Button className="jr-btn bg-primary text-white">Fund Manager</Button>
                <Button className="jr-btn bg-primary text-white">Fund Accountant</Button>
                <Button className="jr-btn bg-primary text-white">Trustee</Button>
                <Button className="jr-btn bg-primary text-white">TA</Button>
           </ButtonGroup></div>
        </div>
        
        
           
          {/* <div className="form-group">
            <TextField
              id="password"
              label={<IntlMessages id="appModule.password" />}
              type="password"
              autoComplete="current-password"
              margin="normal"
              fullWidth
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}
const countries = [
  {
    value: "UK",
  },
  {
    value: "France",
  },
  {
    value: "Italy",
  },
  
];
class GetRegisteredAddress extends React.Component {
  state = {
    county: "UK"
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  render() {
    return (
      <div className="bodyHeight">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <TextField
                id="ad1"
                label="Address Line 1*"
                margin="normal"
                fullWidth
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <TextField
                id="ad2"
                label="Address Line 2*"
                margin="normal"
                fullWidth
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <TextField id="city" label="City*" margin="normal" fullWidth />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <TextField
                id="county"
                label="County*"
                margin="normal"
                fullWidth
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <TextField
                id="select-currency"
                select
                label="Select"
                value={this.state.county}
                onChange={this.handleChange("county")}
                SelectProps={{}}
                margin="normal"
                fullWidth
              >
                {countries.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.value}
                  </option>
                ))}
              </TextField>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <TextField
                id="postcode"
                label="Postcode*"
                margin="normal"
                fullWidth
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class GetPostalAddress extends React.Component {
  state = {
    county: "UK"
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  render() {
    return (
      <div className="bodyHeight">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <TextField
                id="ad1"
                label="Address Line 1*"
                margin="normal"
                fullWidth
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <TextField
                id="ad2"
                label="Address Line 2*"
                margin="normal"
                fullWidth
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <TextField id="city" label="City*" margin="normal" fullWidth />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <TextField
                id="county"
                label="County*"
                margin="normal"
                fullWidth
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
            <TextField
                id="select-currency"
                select
                label="Select"
                value={this.state.county}
                onChange={this.handleChange("county")}
                SelectProps={{}}
                margin="normal"
                fullWidth
              >
                {countries.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.value}
                  </option>
                ))}
              </TextField>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <TextField
                id="postcode"
                label="Postcode"
                margin="normal"
                fullWidth
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function getMoreDetails() {
  return (
    <div className="bodyHeight">
      <div className="row">
        <div className="col-md-4">
          <div className="form-group">
            <TextField
              id="telephone"
              label="Telephone*"
              margin="normal"
              fullWidth
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <TextField
              id="email"
              type="email"
              label="Email*"
              margin="normal"
              fullWidth
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <TextField id="fax" label="Fax*" margin="normal" fullWidth />
          </div>
        </div>
      </div>
      <h3 className="title text-primary">Relationship:</h3>
      <div className="row">
        <div className="col-md-4">
          <div className="form-group">
            <TextField id="name" label="Name*" margin="normal" fullWidth />
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <TextField
              id="email"
              label="Email*"
              margin="normal"
              fullWidth
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <TextField
              id="realation"
              label="Relation*"
              margin="normal"
              fullWidth
            />
          </div>
        </div>
     
      </div>
    </div>
  );
}

class HorizontalLabelPositionBelowStepper extends React.Component {
  state = {
    activeStep: 0
  };

  handleNext = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1
    });
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  render() {
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className="w-100">
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          className="horizontal-stepper-linear"
        >
          {steps.map((label, index) => {
            return (
              <Step
                key={label}
                className={`horizontal-stepper ${
                  index === activeStep ? "active" : ""
                }`}
              >
                <StepLabel className="stepperlabel">{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div className="bodyHeight">
          {this.state.activeStep === steps.length ? (
            <div>
              <Typography className="my-2">
                All steps completed - you&quot;re finished
              </Typography>
              {/* <Button onClick={this.handleReset}>Reset</Button> */}
            </div>
          ) : (
            <div>
              {getStepContent(activeStep)}
              <div>
                <Button className="back-btn"
                 variant="raised"
                 color="primary"
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className="mr-2"
                >
                 Back
                </Button>
                <Button className="next-btn"
                  variant="raised"
                  color="primary"
                  onClick={this.handleNext}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}


export default HorizontalLabelPositionBelowStepper;
