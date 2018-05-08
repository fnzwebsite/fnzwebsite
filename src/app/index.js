import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { toggleCollapsedNav } from "actions/index";

import Header from "components/Header/index";
import Sidebar from "containers/SideNav/index";
import Footer from "components/Footer";
import { isIOS, isMobile } from "react-device-detect";
import Icons from "./routes/icons/index";
import {
  COLLAPSED_DRAWER,
  FIXED_DRAWER,
  MINI_DRAWER
} from "constants/ActionTypes";
import asyncComponent from "../util/AsyncFunc";
import Settings from "./routes/settings/";
import Dashboard from "./routes/Dashboard";
class App extends React.Component {
  onToggleCollapsedNav = e => {
    const val = !this.props.navCollapsed;
    this.props.toggleCollapsedNav(val);
  };

  render() {
    const { match, drawerType } = this.props;
   
    const drawerStyle = drawerType.includes(FIXED_DRAWER) ? 'fixed-drawer' : drawerType.includes(COLLAPSED_DRAWER) ? 'collapsible-drawer' : 'mini-drawer';

    //set default height and overflow for iOS mobile Safari 10+ support.
    if (isIOS && isMobile) {
      $("#body").addClass("ios-mobile-view-height ");
    } else if ($("#body").hasClass("ios-mobile-view-height")) {
      $("#body").removeClass("ios-mobile-view-height");
    }
    return (
      <div className={`app-container ${drawerStyle}`}>
        <Sidebar onToggleCollapsedNav={this.onToggleCollapsedNav.bind(this)} />

        <div className="app-main-container" style={{ marginLeft: 0 }}>
          <div className="app-header cust-header">
            <Header
              drawerType={drawerType}
              onToggleCollapsedNav={this.onToggleCollapsedNav}
            />
          </div>

          <main className="app-main-content-wrapper">
            <div className="app-main-content">
              <Route
                path={`${match.url}/sample-page`}
                component={asyncComponent(() => import("./routes/SamplePage"))}
              />
                <Route
                path={`${match.url}/table-page`}
                component={asyncComponent(() => import("./routes/TablePage"))}
              />
              <Route path={`${match.url}/dashboard`} component={Dashboard} />
              <Route path={`${match.url}/icons`} component={Icons} />
              <Route path={`${match.url}/settings`} component={Settings} />
            
            </div>
            {/* <Footer /> */}
          </main>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { navCollapsed, drawerType } = settings;
  return { navCollapsed, drawerType };
};
export default connect(mapStateToProps, { toggleCollapsedNav })(App);
