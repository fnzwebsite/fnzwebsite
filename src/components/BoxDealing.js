import {connect} from 'react-redux';
import React from 'react';
import moment from 'moment'
import userActions from '../actions/user.actions';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

class BoxToday extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            selected:'today'
        }
        this.changeView =  this.changeView.bind(this);
    }

    changeView(selected){
        if(this.state.selected != selected){
            this.setState({
                selected:selected
            });
            this.props.loadChart(selected)
        }
    }

    render() {
        if(this.props.dealingData == "logout"){
            this.props.userActions.logout();
        }

        if(this.props.dealingData && this.props.dealingData.status != "401") {
            let self = this
            let ListToday = Object.keys(self.props.dealingData).map(function (keyName, keyIndex) {
                if(moment(self.props.dealingData[keyName].boxDate).isSame(moment(), 'day')) {
                    return <li keys={keyIndex} className={self.props.dealingData[keyName].dealType.toUpperCase() == "BUY" ? "active" : "orange"}>
                        <div className="fun">
                            <div className="fund-name">{self.props.dealingData[keyName].account}</div>
                            <div className="fund-quan">{(self.props.dealingData[keyName].units==null ||self.props.dealingData[keyName].units<=0)?0:self.props.dealingData[keyName].units }</div>
                        </div>
                        <div className="fun">
                            <div className="fund-isin">{self.props.dealingData[keyName].instrumentKey}</div>
                            <div className="fund-price"><i
                                className="fa fa-gbp"></i>{(self.props.dealingData[keyName].amount==null || self.props.dealingData[keyName].amount<=0)?0:self.props.dealingData[keyName].amount}
                            </div>
                        </div>
                    </li>
                }
            });

            let ListPrevious = Object.keys(self.props.dealingData).map(function (keyName, keyIndex) {
                var date =moment(self.props.dealingData[keyName].boxDate).isSameOrBefore(moment(), 'day');
                if(date) {
                    return <li keys={keyIndex}
                        className={self.props.dealingData[keyName].dealType.toUpperCase() == "BUY" ? "active" : "orange"}>
                        <div className="fun">
                            <div className="fund-name">{self.props.dealingData[keyName].account}</div>
                            <div className="fund-quan">{(self.props.dealingData[keyName].units==null ||self.props.dealingData[keyName].units<=0)?0:self.props.dealingData[keyName].units }</div>
                        </div>
                        <div className="fun">
                            <div className="fund-isin">{self.props.dealingData[keyName].instrumentKey}</div>
                            <div className="fund-price"><i
                                className="fa fa-gbp"></i>{(self.props.dealingData[keyName].amount==null || self.props.dealingData[keyName].amount<=0)?0:self.props.dealingData[keyName].amount}
                            </div>
                        </div>
                    </li>
                }
            });

            let ListNext = Object.keys(self.props.dealingData).map(function (keyName, keyIndex) {
                var date =moment(self.props.dealingData[keyName].boxDate).isSameOrAfter(moment(moment.now()));
                if(date) {
                    return <li keys={keyIndex} className={self.props.dealingData[keyName].dealType.toUpperCase() == "BUY" ? "active" : "orange"}>
                        <div className="fun">
                            <div className="fund-name">{self.props.dealingData[keyName].account}</div>
                            <div className="fund-quan">{(self.props.dealingData[keyName].units==null ||self.props.dealingData[keyName].units<=0)?0:self.props.dealingData[keyName].units }</div>
                        </div>
                        <div className="fun">
                            <div className="fund-isin">{self.props.dealingData[keyName].instrumentKey}</div>
                            <div className="fund-price"><i
                                className="fa fa-gbp"></i>{(self.props.dealingData[keyName].amount==null || self.props.dealingData[keyName].amount<=0)?0:self.props.dealingData[keyName].amount}
                            </div>
                        </div>
                    </li>
                }
            });

            return (
               <div className="row">
                   <div className="col-sm-4 previous" onClick={() => this.changeView('previous')}>
                       <div className={this.state.selected == "previous" ? 'work-amount card selected':'work-amount card'}>
                           <div className="card-close">
                               Close
                           </div>
                           <div className="card-body">
                               <div className="card-head">
                                   <h3>Box Positions(Previous day)</h3>
                                   <small>28/02/2018 12:00 AM -  12:00 PM</small>
                                   {/*{moment.now().formate("MM/DD/YYYY")}*/}
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
                   <div className="col-sm-4 today" onClick={() => this.changeView('today')}>
                       <div className={this.state.selected == "today" ? 'work-amount card selected':'work-amount card'}>
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
                   <div className="col-sm-4 next" onClick={() => this.changeView('next')}>
                       <div className={this.state.selected == "next" ? 'work-amount card selected':'work-amount card'}>
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
                <div className="load">Loading ...</div>
            )
        }
    }
}

const
    mapStateToProps = (state, props) => {
        return {
            user: state.user
        }
    };

BoxToday.propTypes = {
    userActions: PropTypes.object,
    user: PropTypes.array
};

const
    mapDispatchToProps = (dispatch) => ({
        userActions:bindActionCreators(userActions, dispatch)
    });


export default connect(mapStateToProps,
    mapDispatchToProps)(BoxToday);
