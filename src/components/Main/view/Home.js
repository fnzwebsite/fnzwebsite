import React from 'react';
import SideNav from './SideNav'
import Header from './Header'
import Dashboard from '../../Dashboard/view/Dashboard';
import Acd from '../../Admin/view/Acd';
import AcdInstrument from '../../Admin/view/AcdInstrument';
import DealDetails from "../../Deals/view/DealDetails";
import AcdAccount from '../../Admin/view/AcdAccount';
import AcdDeal from '../../Admin/view/AcdDeal';
import {Route, Redirect} from 'react-router-dom'
import Footer from "./Footer";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            acdData: null,
        };
        this.loadAcdData = this.loadAcdData.bind(this);
    }

    loadAcdData() {
//        alert('hi');
    }

    render() {
        if (this.props.location && this.props.location.pathname == "/") {
            return <Redirect to={{pathname: '/dashboard'}}/>
        }
        if (this.props.location && this.props.location.pathname == "/sign_in") {
            return <Redirect to={{pathname: '/sign_in'}}/>
        }
        return (
            <div className="page">
                <div className="page-content d-flex align-items-stretch">
                    <SideNav/>
                    <div className="content-inner">
                        <Header/>

                            <Route exact path="/dashboard" component={Dashboard}/>
                            <Route exact path='/acd' component={Acd}/>
                            <Route exact path="/acdinstrument" component={AcdInstrument}/>
                            <Route exact path="/dealdetails" component={DealDetails}/>
                            <Route exact path="/acdaccount" component={AcdAccount}/>
                            <Route exact path="/acddeal" component={AcdDeal}/>

                        <Footer/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;
