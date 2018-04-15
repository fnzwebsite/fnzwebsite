import React from 'react';
import {NavLink} from 'react-router-dom';

class SideNav extends React.Component {
    render() {
        return (
            <div>
                <nav className="side-navbar l1">
                    <div>
                        <a id="toggle-btn" href="#" className="menu-btn">
                            <img src="img/menu-arrow.png" alt="menu-toggle" className=""/>
                        </a>
                    </div>
                    <ul className="list-unstyled">
                        <li className="active">
                            <NavLink to="/" id="home-menu">
                                <i className="fa fa-home-icon"></i>Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/acd">
                                <i className="fa fa-admin"></i>Admin
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <nav className="side-navbar l2 shrinked">
                    <ul className="list-unstyled">
                        <li className="active">
                            <a href="/acd">
                                <i className="fa fa-tachometer"></i>
                                Dashboard
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default SideNav;
