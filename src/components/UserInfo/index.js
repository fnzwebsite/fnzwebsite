import React from "react";
import Avatar from "material-ui/Avatar";
import { connect } from "react-redux";
import Menu, { MenuItem } from "material-ui/Menu";
import { userSignOut } from "actions/Auth";
import IntlMessages from "util/IntlMessages";
import Drawer from "material-ui/Drawer";
import Button from "material-ui/Button";
import List from "material-ui/List";
import Divider from "material-ui/Divider";
import { mailFolderListItems, otherMailFolderListItems } from "./tileData";

import AppBar from "material-ui/AppBar";

class UserInfo extends React.Component {
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false
  };



  state = {
      anchorEl: null,
      open: false,
  };

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    const sideList = (
      <div className="drawer">
        <List>{mailFolderListItems}</List>
        <Divider />
        <List>{otherMailFolderListItems}</List>
      </div>
    );

    const fullList = (
      <div className="full-drawer">
        <List>{mailFolderListItems}</List>
        <Divider />
        <List>{otherMailFolderListItems}</List>
      </div>
    );

    return (
      <div className="user-profile d-flex flex-row align-items-center">
        <Avatar
          alt="..."
          src="http://via.placeholder.com/150x150"
          className="user-avatar "
        />

        <div className="user-detail">
          <h4 className="user-name" onClick={this.handleClick}>
            Robert Johnson{" "}
            <i className="zmdi zmdi-caret-down zmdi-hc-fw align-middle" />
          </h4>
        </div>
      
        <Menu
          className="user-info"
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onClose={this.handleRequestClose}
          PaperProps={{
            style: {
              width: 120,
              paddingTop: 0,
              paddingBottom: 0
            }
          }}
        >
          <MenuItem onClick={this.handleRequestClose}>
            <i className="zmdi zmdi-account zmdi-hc-fw mr-2" />
            <IntlMessages id="popup.profile" />
          </MenuItem>
          <MenuItem onClick={this.handleRequestClose}>
            <i className="zmdi zmdi-settings zmdi-hc-fw mr-2" />
            <IntlMessages id="popup.setting" />
          </MenuItem>
          <MenuItem
            onClick={() => {
              this.handleRequestClose();
              this.props.userSignOut();
            }}
          >
            <i className="zmdi zmdi-sign-in zmdi-hc-fw mr-2" />

            <IntlMessages id="popup.logout" />
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default connect(undefined, { userSignOut })(UserInfo);
