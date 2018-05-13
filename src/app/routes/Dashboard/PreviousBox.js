import {connect} from 'react-redux';
import React from 'react';
import {bindActionCreators} from 'redux';
import acdActions from 'actions/Dashboard/acdActions';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import moment from "moment";
import {boxDataCalculation, convertCurrency} from 'components/Common/function/BoxDataCalculation';
class PreviousBox extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            boxData: null
        }
    }

    componentWillMount() {
          var date = moment().add('days', -1).format("YYYY-MM-DD")
          this.props.acdActions.getAcd(date, localStorage.getItem('acdId'))
//          console.log(JSON.stringify(this.props.acdPrevious));
    }

    render() {
      if (this.props.acdPrevious) {
            this.state = {
                boxData: boxDataCalculation(this.props.acdPrevious)
            }
         
        }
        if (this.props.acdPrevious) {
          return (
            <div>
            <div className="row con col-with-divider py-3 px-2">
              <div className="col-md-4">
                <div className="stack-order">
                  <h4 className="">
                    {convertCurrency(this.state.boxData[0].subscriptions)}
                  </h4>
                  <span className="">subscriptions</span>
                </div>
              </div>

              <div className="col-md-4">
                <div className="stack-order">
                  <h4 className="text-warning">
                      {this.state.boxData[0].redemptions < 0 ? convertCurrency((this.state.boxData[0].redemptions) * (-1)) : convertCurrency(this.state.boxData[0].redemptions)}
                  </h4>
                  <span className="">Redemptions</span>
                </div>
              </div>
              <div className="col-md-4">
                <div className="stack-order">
                  <h4 className={this.state.boxData[0].netFlow < 0 ? "text-warning" : ""}>{this.state.boxData[0].netFlow < 0 ? convertCurrency((this.state.boxData[0].netFlow) * (-1)) : convertCurrency(this.state.boxData[0].netFlow)}</h4>
                  <span className="">Net In / Out Flow</span>
                </div>
              </div>
            </div>
            </div>
          );
        }
        else{

          return (
            <div style={{height: '125px'}}>

                    <div className="preloader">
                        <span className="line line-2"></span>
                        <span className="line line-2"></span>
                        <span className="line line-2"></span>
                        <span className="line line-3"></span>
                        <span className="line line-1"></span>
                        <span className="line line-4"></span>
                        <span className="line line-5"></span>
                        <span className="line line-6"></span>
                        <span className="line line-7"></span>
                        <span className="line line-8"></span>
                        <span className="line line-9"></span>
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
            acdPrevious: state.acdPrevious
        }
    };

PreviousBox.propTypes = {
    acdActions: PropTypes.object,
    acdPrevious: PropTypes.array
};

const
    mapDispatchToProps = (dispatch) => ({
        acdActions: bindActionCreators(acdActions, dispatch)
    });

export default connect(mapStateToProps,
    mapDispatchToProps)(PreviousBox);
