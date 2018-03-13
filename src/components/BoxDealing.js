import {connect} from 'react-redux';
import React from 'react';
import io from "socket.io-client"
import moment from 'moment'
import * as dealingActions from '../actions/dealingActions';
import {bindActionCreators} from 'redux';

class BoxToday extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            dealing:null
        }
    }

    componentWillMount(prevProps, prevState) {
        this.props.dealingActions.getDealings();
    }

    componentDidMount(prevProps, prevState) {
        var self = this;
        var socket = io('http://localhost:3700');
        socket.on('dealing', function (dealing) {
            self.setState({dealing:dealing})
        })
    }



    render() {
        let dealing = this.state.dealing || this.props.data.dealing;
        if(dealing) {
            let self = this
            let ListToday = Object.keys(dealing).map(function (keyName, keyIndex) {
                if(moment(dealing[keyName].boxDate).isSame(moment(), 'day')) {
                    return <li className={dealing[keyName].dealType.toUpperCase() == "BUY" ? "active" : "orange"}>
                            <div className="fun">
                                <div className="fund-name">{dealing[keyName].account}</div>
                                <div className="fund-quan">{dealing[keyName].units}</div>
                            </div>
                            <div className="fun">
                                <div className="fund-isin">{dealing[keyName].instrumentKey}</div>
                                <div className="fund-price"><i
                                    className="fa fa-gbp"></i>{dealing[keyName].amount}
                                </div>
                            </div>
                        </li>
                }


            });
            let ListPrevious = Object.keys(dealing).map(function (keyName, keyIndex) {
                var date =moment(dealing[keyName].boxDate).isSameOrBefore(moment(), 'day');
                if(date) {
                    return <li
                        className={dealing[keyName].dealType.toUpperCase() == "BUY" ? "active" : "orange"}>
                        <div className="fun">
                            <div className="fund-name">{dealing[keyName].account}</div>
                            <div className="fund-quan">{dealing[keyName].units}</div>
                        </div>
                        <div className="fun">
                            <div className="fund-isin">{dealing[keyName].instrumentKey}</div>
                            <div className="fund-price"><i
                                className="fa fa-gbp"></i>{dealing[keyName].amount}
                            </div>
                        </div>
                    </li>
                }

            });
            let ListNext = Object.keys(dealing).map(function (keyName, keyIndex) {

                var date =moment(dealing[keyName].boxDate).isSameOrAfter(moment(moment.now()));
                if(date) {
                    return <li className={dealing[keyName].dealType.toUpperCase() == "BUY" ? "active" : "orange"}>
                        <div className="fun">
                            <div className="fund-name">{dealing[keyName].account}</div>
                            <div className="fund-quan">{dealing[keyName].units}</div>
                        </div>
                        <div className="fun">
                            <div className="fund-isin">{dealing[keyName].instrumentKey}</div>
                            <div className="fund-price"><i
                                className="fa fa-gbp"></i>{dealing[keyName].amount}
                            </div>
                        </div>
                    </li>
                }
            });
            return (
               <div className="row">
                   <div className="col-sm-4 previous">
                       <div className="work-amount card">
                           <div className="card-close">
                               Close
                           </div>
                           <div className="card-body">
                               <div className="card-head">
                                   <h3>Box Positions(Previous day)</h3>
                                   <small>28/02/2018 12:00 AM - 01/03/2018 12:00 PM</small>
                               </div>
                               <div className="funds-sec">
                                   <div className="fund-list scrollbar" id="style-1">
                                       <ul className="force-overflow">
                                           {ListPrevious}
                                       </ul>
                                   </div>
                                   <div className="fund-status">
                                       <ul>
                                           <li>
                                               <h4>Open</h4>
                                               <p>156264.567</p>
                                           </li>
                                           <li>
                                               <h4>CLOSE</h4>
                                               <p>176777.666</p>
                                           </li>
                                           <li>
                                               <h4>NET</h4>
                                               <p className="blue">+11,543.114</p>
                                           </li>
                                       </ul>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
                   <div className="col-sm-4 today">
                       <div className="work-amount card selected">
                           <div className="card-close">
                               Open
                           </div>
                           <div className="card-body">
                               <div className="card-head">
                                   <h3>Box Positions(Today)</h3>
                                   <small>01/03/2018 12:00 AM - 02/03/2018 12:00 PM</small>
                               </div>
                               <div className="funds-sec">
                                   <div className="fund-list scrollbar" id="style-1">
                                       <ul className="force-overflow">
                                           {ListToday}
                                       </ul>
                                   </div>
                                   <div className="fund-status">
                                       <ul>
                                           <li>
                                               <h4>Open</h4>
                                               <p>156264.567</p>
                                           </li>
                                           <li>
                                               <h4>CLOSE</h4>
                                               <p>176777.666</p>
                                           </li>
                                           <li>
                                               <h4>NET</h4>
                                               <p className="blue">+11,543.114</p>
                                           </li>
                                       </ul>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
                   <div className="col-sm-4 next">
                       <div className="work-amount card">
                           <div className="card-close">
                               Open
                           </div>
                           <div className="card-body">
                               <div className="card-head">
                                   <h3>Box Positions(Next day)</h3>
                                   <small>02/03/2018 12:00 AM - 03/03/2018 12:00 PM</small>
                               </div>
                               <div className="funds-sec">
                                   <div className="fund-list scrollbar" id="style-1">
                                       <ul className="force-overflow">
                                           {ListNext}
                                       </ul>
                                   </div>
                                   <div className="fund-status">
                                       <ul>
                                           <li>
                                               <h4>Open</h4>
                                               <p>156264.567</p>
                                           </li>
                                           <li>
                                               <h4>CLOSE</h4>
                                               <p>176777.666</p>
                                           </li>
                                           <li>
                                               <h4>NET</h4>
                                               <p className="blue">+11,543.114</p>
                                           </li>
                                       </ul>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
            )
        }
        else{
            return (
                <div>Loading ...</div>
            )
        }
    }
}

const
    mapStateToProps = (state, props) => {
        return {
            data: state
        }
    };

const
    mapDispatchToProps = (dispatch) => ({
        dealingActions: bindActionCreators(dealingActions, dispatch)
    });


export default connect(mapStateToProps,
    mapDispatchToProps)

(
    BoxToday
)
;