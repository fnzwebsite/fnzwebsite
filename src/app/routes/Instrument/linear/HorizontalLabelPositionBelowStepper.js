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
import InstrumentDetails from "../InstrumentDetails";


function getSteps() {
  return [
    "Instrument Details",
  ];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <InstrumentDetails />;

    default:
      return "Uknown stepIndex";
  }
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
                {/* <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className="mr-2"
                >
                  Back
                </Button> */}
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
