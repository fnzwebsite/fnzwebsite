import {connect} from 'react-redux';
import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <header className="header">
                <nav className="navbar fixed-top">

                    <div className="search-box">
                        <button className="dismiss"><i className="icon-close"></i></button>
                        <form id="searchForm" action="#" role="search">
                            <input type="search" placeholder="What are you looking for..." className="form-control"/>
                        </form>
                    </div>
                    <div className="container-fluid">
                        <div className="navbar-holder d-flex align-items-center justify-content-between">

                            <ul className="nav-menu list-unstyled d-flex flex-md-row align-items-md-center">
                                <li className="nav-item">
                                    <div className="avatar"><img src="img/avatar-1.jpg" alt="..." className="img-fluid rounded-circle"/></div>
                                </li>
                                <li className="nav-item"><a href="" className="nav-link">Welcome! John Smith</a></li>
                            </ul>

                            <div className="navbar-header">
                                <ul className="nav-menu list-unstyled d-flex flex-md-row align-items-md-center">

                                    <li className="nav-item d-flex align-items-center"><a id="search" href="#"><i className="icon-search"></i></a></li>

                                    <li className="nav-item dropdown"> <a id="notifications" rel="nofollow" data-target="#" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="nav-link"><i className="fa fa-bell-o"></i><span className="badge bg-yellow badge-corner">4</span></a>
                                    </li>
                                </ul>

                                <a href="" className="navbar-brand">
                                    <div className="brand-text brand-big"><img src="img/logo.png" alt="logo" className=""/></div>
                                    <div className="brand-text brand-small"><img src="img/logo.png" alt="logo" className=""/></div>
                                </a>

                                <a href="" className="dots-nav"><img src="img/dots-nav.png" alt="..." className=""/></a>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        )
    }
}

export default Header;