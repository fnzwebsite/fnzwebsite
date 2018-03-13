import {connect} from 'react-redux';
import React from 'react';

class SideNav extends React.Component {
    render() {
        return (
            <nav className="side-navbar">
                <ul className="list-unstyled">
                    <li><a href=""> <i className="fa fa-home"></i>Home </a></li>
                    <li className="active"><a href=""> <i className="fa fa-user"></i>Admin</a></li>
                    <li><a href=""> <i className="fa fa-power-off"></i>Logout</a></li>
                </ul>
            </nav>
        )
    }
}

export default SideNav;