import React, { Component } from "react";
import { Link, withRouter, NavLink } from "react-router-dom";
import "jquery-slimscroll/jquery.slimscroll.min";
import IntlMessages from "util/IntlMessages";
import Button from "material-ui/Button";
import Drawer from "material-ui/Drawer";
import { withStyles } from "material-ui/styles";

import List from "material-ui/List";

const styles = theme => ({
  root: {
    width: "100%",
    height: 430,
    marginTop: theme.spacing.unit * 3,
    zIndex: 1,
    overflow: "hidden"
  },

  drawerPaper: {
    width: 250,
    // marginTop: 70,
    marginLeft: 80,
    overflowX: "hidden",
    position: "absolute"
  },
  modal: {
    zIndex: 1200
  }
});

class SidenavContent extends Component {
  componentDidMount() {
    const {history} = this.props;
    const $nav = $(this.nav);
    const slideDuration = 250;

    $nav.slimscroll({
        height: '100%'
    });

    const pathname = `#${history.location.pathname}`;// get current path

    $('ul.nav-menu > li.menu').click(function () {
        const menuLi = this;
        $('ul.nav-menu > li.menu').not(menuLi).removeClass('open');
        $('ul.nav-menu > li.menu ul').not($('ul', menuLi)).slideUp(slideDuration);
        $('> ul', menuLi).slideToggle(slideDuration);
        $(menuLi).toggleClass('open');
    });

    $('ul.sub-menu li').click(function (e) {
        let superSubMenu = $(this).parent();
        if (superSubMenu.parent().hasClass('active')) {
            $('li', superSubMenu).not($(this)).removeClass('active');
        }
        else {
            $('ul.sub-menu li').not($(this)).removeClass('active');
        }

        $(this).toggleClass('active');
        e.stopPropagation();
    });

    const activeLi = $('a[href="' + pathname + '"]');// select current a element
    const activeNav = activeLi.closest('ul'); // select closest ul
    if (activeNav.hasClass('sub-menu')) {
        activeNav.slideDown(slideDuration);
        activeNav.parent().addClass('open');
        activeLi.parent().addClass('active');
    } else {
        activeLi.parent().addClass('open');
    }
}

  render() {
    return (
      <ul
        className="nav-menu"
        ref={c => {
          this.nav = c;
        }}
      >
        {/* <li className="nav-header">Main</li> */}
        {/* <li className="menu no-arrow">
          <NavLink  to="/app/dashboard" >
            <i className="zmdi zmdi-view-dashboard  zmdi-hc-fw" />
            <span className="nav-text">Dashboard</span>
          </NavLink>
        </li> */}

        <li className="menu ">
          <Button className="void" href="javascript:void(0)">
          <i className="zmdi zmdi-view-dashboard  zmdi-hc-fw" />
            <span className="nav-text">Dashboard</span>
          </Button>
          <ul className="sub-menu">
            <li>
              <NavLink className="prepend-icon"  to="/app/dashboard" >
                <span className="nav-text">Network</span>
              </NavLink>
            </li>
            <li>
              <NavLink className="prepend-icon"  to="/app/dashboard">
                <span className="nav-text">Fund Flow</span>
              </NavLink>
            </li>
          </ul>
        </li>

        <li className="menu">
          <Button className="void" href="javascript:void(0)">
            <i className="zmdi zmdi-label  zmdi-hc-fw" />
            <span className="nav-text">Deals</span>
          </Button>
          <ul className="sub-menu">
            <li>
              <NavLink
                className="prepend-icon"
                 to="/app/sample-page1" onClick={e => e.preventDefault()}
              >
                <span className="nav-text">Orders</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className="prepend-icon"
                 to="/app/sample-page2" onClick={e => e.preventDefault()}
              >
                <span className="nav-text">Fund View</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className="prepend-icon"
                 to="/app/sample-page3" onClick={e => e.preventDefault()}
              >
                <span className="nav-text">Holdings</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className="prepend-icon"
                 to="/app/sample-page4" onClick={e => e.preventDefault()}
              >
                <span className="nav-text">Price</span>
              </NavLink>
            </li>
          </ul>
        </li>

        <li className="menu no-arrow">
          <Button className="void" href="javascript:void(0)">
            <i className="zmdi zmdi-pin-account  zmdi-hc-fw" />
            <span className="nav-text">Settlement</span>
          </Button>
        </li>

        <li className="menu">
          <Button className="void" href="javascript:void(0)">
            <i className="zmdi zmdi-collection-text  zmdi-hc-fw" />
            <span className="nav-text">Reports</span>
          </Button>
          <ul className="sub-menu">
            <li>
              <NavLink
                className="prepend-icon"
                 to="/app/sample-page5" onClick={e => e.preventDefault()}
              >
                <span className="nav-text">Form B</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className="prepend-icon"
                 to="/app/sample-page6" onClick={e => e.preventDefault()}
              >
                <span className="nav-text">Regulatory</span>
              </NavLink>
            </li>
          </ul>
        </li>

        <li className="menu">
          <Button className="void" href="javascript:void(0)">
            <i className="zmdi zmdi-account-o  zmdi-hc-fw" />
            <span className="nav-text">Admin</span>
          </Button>
          <ul className="sub-menu">
            <li>
              <NavLink
                className="prepend-icon"
                 to="/app/sample-page7" onClick={e => e.preventDefault()}
              >
                <span className="nav-text">Company</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className="prepend-icon"
                 to="/app/sample-page8" onClick={e => e.preventDefault()}
              >
                <span className="nav-text">Calendar</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className="prepend-icon"
                 to="/app/sample-page9" onClick={e => e.preventDefault()}
              >
                <span className="nav-text">Fund Company</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className="prepend-icon"
                 to="/app/sample-page10" onClick={e => e.preventDefault()}
              >
                <span className="nav-text">Sub Fund</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className="prepend-icon"
                 to="/app/sample-page11" onClick={e => e.preventDefault()}
              >
                <span className="nav-text">Fund </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className="prepend-icon"
                 to="/app/sample-page12" onClick={e => e.preventDefault()}
              >
                <span className="nav-text">Account</span>
              </NavLink>
            </li>
          </ul>
        </li>

        <li className="menu no-arrow">
          <Link to="/signin">
            <i className="zmdi zmdi-power-off-setting zmdi-hc-fw" />
            <span className="nav-text">Logout</span>
          </Link>
        </li>
      </ul>
    );
  }
}
export default withRouter(SidenavContent);
