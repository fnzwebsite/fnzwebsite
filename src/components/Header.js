import {connect} from 'react-redux';
import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <header className="header">
                <nav className="navbar">
                    <div className="search-box">
                        <button className="dismiss"><i className="icon-close"></i></button>
                        <form id="searchForm" action="#" role="search">
                            <input type="search" placeholder="What are you looking for..." className="form-control"/>
                        </form>
                    </div>
                    <div className="container-fluid">
                        <div className="navbar-holder d-flex align-items-center justify-content-between">
                            <div className="navbar-header">
                                <a id="toggle-btn" href="#" className="menu-btn active">
                                    <img src="img/menu-arrow.png" alt="menu-toggle" className=""/>
                                </a>
                                <a href="" className="navbar-brand">
                                    <div className="brand-text brand-big"><img src="img/logo.png" alt="logo"
                                                                               className=""/></div>
                                    <div className="brand-text brand-small"><img src="img/logo.png" alt="logo"
                                                                                 className=""/></div>
                                </a>
                            </div>
                            <ul className="nav-menu list-unstyled d-flex flex-md-row align-items-md-center">
                                <li className="nav-item d-flex align-items-center"><a id="search" href="#"><i
                                    className="icon-search"></i></a></li>
                                <li className="nav-item dropdown"><a id="notifications" rel="nofollow" data-target="#"
                                                                     href="#" data-toggle="dropdown"
                                                                     aria-haspopup="true" aria-expanded="false"
                                                                     className="nav-link"><i
                                    className="fa fa-bell-o"></i><span
                                    className="badge bg-red badge-corner">12</span></a>
                                </li>
                                <li className="nav-item"><a href="" className="nav-link date-time">01/03/2018 12:45
                                    PM</a></li>
                                |
                                <li className="nav-item"><a href="" className="nav-link">Welcome! John</a></li>
                                <li className="nav-item">
                                    <div className="avatar"><img src="img/avatar-1.jpg" alt="..."
                                                                 className="img-fluid rounded-circle"/></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        )
    }
}

export default Header;