import React from 'react';
import SideNav from './SideNav'
import Header from './Header'
import Dashboard from '../Dashboard/Dashboard';
import Acd from '../Admin/Acd';
import AcdInstrument from '../Admin/AcdInstrument';
import DealDetails from "../Deals/DealDetails";
import AcdAccount from '../Admin/AcdAccount';
import AcdDeal from '../Admin/AcdDeal';
import {Route, Redirect}    from 'react-router-dom'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            acdData: null,
        };
        this.loadAcdData = this.loadAcdData.bind(this);
    }
    loadAcdData(){
//        alert('hi');
    }
    render() {
        if(this.props.location && this.props.location.pathname == "/"){
            return <Redirect to={{ pathname: '/dashboard'}}/>
        }
        if(this.props.location && this.props.location.pathname == "/sign_in"){
            return <Redirect to={{ pathname: '/sign_in'}}/>
        }
        return (
            <div className="page">
                <div className="page-content d-flex align-items-stretch">
                    <SideNav/>
                    <div className="content-inner">
                        <Header/>
                        <Route exact path="/dashboard" component={Dashboard} />
                        <Route exact path='/acd' component={Acd} />
                        <Route exact path="/acdinstrument" component={AcdInstrument} />
                        <Route exact path="/dealdetails" component={DealDetails} />
                        <Route exact path="/acdaccount" component={AcdAccount} />
                        <Route exact path="/acddeal" component={AcdDeal} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;
