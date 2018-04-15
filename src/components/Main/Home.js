import {connect} from 'react-redux';
import React from 'react';
import SideNav from './SideNav'
import Header from './Header'
import Footer from './Footer'
import {Router, Route} from 'react-router';
import Dashboard from '../Dashboard/Dashboard';
import Acd from '../Admin/Acd';
import AcdWizard from "../Admin/AcdWizard";

class Home extends React.Component {
    render() {
        return (
            <div className="page">
                <div className="page-content d-flex align-items-stretch">
                    <SideNav/>
                    <div className="content-inner">
                        <Header/>
                        <div className="container-fluid">
                            <Route exact path="/" component={Dashboard} />
                            <Route exact path="/acd" component={Acd} />
                        </div>
                        <Footer/>
                    </div>
                </div>
                <div className="uk-modal" id="modal_header_footer">
                   <AcdWizard/>
                </div>
            </div>
        )
    }
}

export default Home;
