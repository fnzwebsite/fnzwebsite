import {connect} from 'react-redux';
import React from 'react';

class SideNav extends React.Component {
    render() {
        return (
            <div>
            <nav className="side-navbar l1">
                <div><a id="toggle-btn" href="#" className="menu-btn">
                    <img src="img/menu-arrow.png" alt="menu-toggle" className=""/>
                </a></div>
                <ul className="list-unstyled">
                    <li className="active"><a href=""> <i className="fa fa-home-icon"></i>Home</a></li>
                    <li><a href=""> <i className="fa fa-service-icon"></i>Services</a></li>
                    <li><a href=""> <i className="fa fa-message-icon"></i>Messaging</a></li>
                    <li><a href=""> <i className="fa fa-market-icon"></i>Market & News</a></li>
                    <li><a href=""> <i className="fa fa-fav-icon"></i>Favourites</a></li>
                    <li className="settings"><a href=""> <i className="fa fa-setting-icon"></i>Settings</a></li>
                </ul>
            </nav>
       
        <nav className="side-navbar l2 shrinked">

            <ul className="nav-menu list-unstyled d-flex flex-md-row align-items-md-center">
                <li className="nav-item">
                    <div className="avatar"><img src="img/avatar-1.jpg" alt="..." className="img-fluid rounded-circle"/></div>
                </li>
                <li className="nav-item"><a href="" className="nav-link user">John Smith</a></li>
            </ul>

            <ul className="list-unstyled">
                <li className="active"><a href=""> <i className="fa fa-handshake-o"></i>Dealing</a></li>
                <li><a href=""> <i className="fa fa-tag"></i>Price</a></li>
                <li><a href=""> <i className="fa fa-settle"></i>Settlement</a></li>
                <li><a href=""> <i className="fa fa-cmf"></i>Commissions & Fee</a></li>
                <li><a href=""> <i className="fa fa-ca"></i>Corporate Actions</a></li>

            </ul>
        </nav>
        </div>
        )
    }
}

export default SideNav;