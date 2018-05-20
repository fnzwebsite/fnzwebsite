import {connect} from 'react-redux';
import React from 'react';
import moment from 'moment'
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import TodayBox from './TodayBox'
import PreviousBox from './PreviousBox'
import NextBox from './NextBox'
import {Link} from 'react-router-dom';

class BoxToday extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 'today'
        }
        this.changeView = this.changeView.bind(this);
    }

    changeView(selected) {
        if (this.state.selected != selected) {
            this.setState({
                selected: selected
            });
            this.props.loadChart(selected)
        }
    }

    componentWillMount() {
        // this.props.acdActions.getAcd('today',localStorage.getItem('acdId'))
        // this.props.acdActions.getAcd('next',localStorage.getItem('acdId'))

    }

    componentWillReceiveProps(nextProps) {
        // this.props.acdActions.getAcd('today',localStorage.getItem('acdId'))
        // this.props.acdActions.getAcd('next',localStorage.getItem('acdId'))
        // this.props.acdActions.getAcd('previous',localStorage.getItem('acdId'))
    }

    render() {
        var today = moment().format("YYYY-MM-DD");
        var tomorrow = moment().add('days', 1).format("YYYY-MM-DD");
        var yesterday = moment().add('days', -1).format("YYYY-MM-DD");
        //console.log(this.props.dealingData);
        if (this.props.dealingData == "logout") {
            return <Redirect to={{pathname: '/login', state: {from: this.props.location}}}/>
        }
        return (
            <div className="row">
                <div className="col-md-4 previous" onClick={() => this.changeView('previous')}>
                    <div className={this.state.selected == "previous" ? 'card funds selected' : 'card funds'}>
                        <PreviousBox/>
                    </div>
                </div>
                <div className="col-md-4 today" onClick={() => this.changeView('today')}>
                    <div className={this.state.selected == "today" ? 'card funds selected' : 'card funds'}>
                        <TodayBox/>
                    </div>
                </div>
                <div className="col-md-4 next" onClick={() => this.changeView('next')}>
                    <div className={this.state.selected == "next" ? 'card funds selected' : 'card funds'}>
                        <NextBox/>
                    </div>
                </div>
            </div>
        )
        // }
        // else {
        //     return (
        //       <div className="preloader">
        //                                <span className="line line-1"></span>
        //                                <span className="line line-2"></span>
        //                                <span className="line line-3"></span>
        //                                <span className="line line-4"></span>
        //                                <span className="line line-5"></span>
        //                                <span className="line line-6"></span>
        //                                <span className="line line-7"></span>
        //                                <span className="line line-8"></span>
        //                                <span className="line line-9"></span>
        //                                <div>Loading</div>
        //                            </div>
        //     )
        // }
    }
}

function convertCurrency(currency) {
    return (
        <span>
        {new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP'
        }).format(currency)}
        </span>
    )
}

export default BoxToday;
