import React from 'react';
import {NavLink} from 'react-router-dom';
import $ from 'jquery';

class SideNav extends React.Component {
  constructor(props) {
      super(props);
      this.handleNavClick = this.handleNavClick.bind(this);
  }

  handleNavClick(objNavVal)
  {
    //alert(objNavVal);
    //this.setState({selected:'home'});
    //console.log(objNavVal);
    switch(objNavVal)
    {
      case "homeMenu":
      $("#homeMenu").addClass('active');
      $("#acdMenu").removeClass('active');
      break;
      case "acdMenu":
      $("#acdMenu").addClass('active');
      $("#homeMenu").removeClass('active');
break;
    }

  }
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
                        <li id="homeMenu" className="active" onClick={() =>{this.handleNavClick('homeMenu')}}>
                            <NavLink to="/" id="home-menu" >
                                <i className="fa fa-home-icon"></i>Home
                            </NavLink>
                        </li>
                        <li id="acdMenu" onClick={() =>{this.handleNavClick('acdMenu')}}>
                            <NavLink to="/acd" >
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
