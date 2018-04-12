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
                        <li className="active"><a href="dashboard.html" id="home-menu"> <i className="fa fa-home-icon"></i>Home</a></li>
                        <li><a href="acd.html"> <i className="fa fa-admin"></i>Admin</a></li>
                    </ul>
                </nav>
                <nav className="side-navbar l2 shrinked">
                    <ul className="list-unstyled">
                        <li className="active"><a href="acd.html"> <i className="fa fa-tachometer"></i>Dashboard</a></li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default SideNav;