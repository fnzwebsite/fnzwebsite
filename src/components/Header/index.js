import React from "react";
import { connect } from "react-redux";
import AppBar from "material-ui/AppBar";
import { Link } from "react-router-dom";
import Menu, { MenuItem } from "material-ui/Menu";
import Toolbar from "material-ui/Toolbar";
import IconButton from "material-ui/IconButton";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import { COLLAPSED_DRAWER, FIXED_DRAWER } from "constants/ActionTypes";
import SearchBox from "components/SearchBox";
import MailNotification from "../MailNotification/index";
import AppNotification from "../AppNotification/index";
import CardHeader from "components/dashboard/Common/CardHeader/index";
import { switchLanguage } from "actions/Setting";
import Avatar from "material-ui/Avatar";
const ITEM_HEIGHT = 34;

class Header extends React.Component {
    onAppNotificationSelect = () => {
        this.setState({
            appNotification: !this.state.appNotification
        });
    };
    onMailNotificationSelect = () => {
        this.setState({
            mailNotification: !this.state.mailNotification
        });
    };
    onLangSwitcherSelect = event => {
        this.setState({
            langSwitcher: !this.state.langSwitcher,
            anchorEl: event.currentTarget
        });
    };
    onSearchBoxSelect = () => {
        this.setState({
            searchBox: !this.state.searchBox
        });
    };
    handleRequestClose = () => {
        this.setState({
            langSwitcher: false,
            mailNotification: false,
            appNotification: false,
            searchBox: false
        });
    };

    constructor() {
        super();
        this.state = {
            anchorEl: undefined,
            searchBox: false,
            searchText: "",
            mailNotification: false,
            langSwitcher: false,
            appNotification: false
        };
    }

    updateSearchText(evt) {
        this.setState({
            searchText: evt.target.value
        });
    }

    render() {
        const { onToggleCollapsedNav, drawerType, locale } = this.props;
        const drawerStyle = drawerType.includes(FIXED_DRAWER)
            ? "d-block d-xl-none"
            : drawerType.includes(COLLAPSED_DRAWER)
                ? "d-block"
                : "d-none";

        return (
            <AppBar className="app-main-header">
                <Toolbar className="app-toolbar" disableGutters={false}>
                    <IconButton
                        className={`jr-menu-icon ${drawerStyle}`}
                        aria-label="Menu"
                        onClick={onToggleCollapsedNav}
                    >
                        <span className="menu-icon" />
                    </IconButton>

                    <Link className="app-logo" to="/">
                        <img src="assets/images/logo.png" alt="fnz" title="fnz" />
                    </Link>

                    <ul className="header-notifications list-inline ml-auto">
                        <li className="list-inline-item">
                            <div className="user-profile d-flex flex-row align-items-center">
                                <Avatar
                                    alt="..."
                                    src="assets/images/profile-img.jpg"
                                    className="user-avatar "
                                />

                                <div className="user-detail">
                                    <h4 className="user-name">
                                        <span className="welcome">Welcome!</span>{localStorage.getItem("displayName")}
                                    </h4>
                                </div>
                            </div>
                        </li>
                        <li className="list-inline-item app-tour">
                            <Dropdown
                                className="quick-menu"
                                isOpen={this.state.appNotification}
                                toggle={this.onAppNotificationSelect.bind(this)}
                            >
                                <DropdownToggle
                                    className="d-inline-block"
                                    tag="span"
                                    data-toggle="dropdown"
                                >
                                    <IconButton className="icon-btn size-30">
                                        <i className="zmdi zmdi-notifications-active icon-alert animated infinite wobble" />
                                    </IconButton>
                                </DropdownToggle>

                                {/* <DropdownMenu right>
                  <CardHeader
                    styleName="align-items-center"
                    heading="Notifications"
                  />
                  <AppNotification />
                </DropdownMenu> */}
                            </Dropdown>
                        </li>
                    </ul>
                </Toolbar>
            </AppBar>
        );
    }
}

const languages = [
    {
        languageId: "english",
        locale: "en",
        name: "English",
        icon: "us"
    },
    {
        languageId: "chinese",
        locale: "zh",
        name: "Chinese",
        icon: "cn"
    },
    {
        languageId: "spanish",
        locale: "es",
        name: "Spanish",
        icon: "es"
    },
    {
        languageId: "french",
        locale: "fr",
        name: "French",
        icon: "fr"
    },
    {
        languageId: "italian",
        locale: "it",
        name: "Italian",
        icon: "it"
    },
    {
        languageId: "saudi-arabia",
        locale: "ar",
        name: "Saudi Arabia",
        icon: "sa"
    }
];

const mapStateToProps = ({ settings }) => {
    const { locale } = settings;
    return { locale };
};

export default connect(mapStateToProps, { switchLanguage })(Header);
