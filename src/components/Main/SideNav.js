import React from 'react';
import {NavLink} from 'react-router-dom';
import userActions from '../../actions/user.actions';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class SideNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSlideMenu: false,
            showMenu:'home'
        };
        this.handleChangeSlideMenu = this.handleChangeSlideMenu.bind(this);
        this.handleChangeMenu = this.handleChangeMenu.bind(this);
        this.logout = this.logout.bind(this);
    }
    handleChangeMenu(value){
        this.setState({showMenu:value})
    }

    handleChangeSlideMenu(){
        this.setState({showSlideMenu:!this.state.showSlideMenu})
    }
    logout(){
        this.props.userActions.logout()
    }
    render() {
        return (
            <div>
                <nav className="side-navbar l1">
                    <div>
                        <a id="toggle-btn" onClick={this.handleChangeSlideMenu} className={this.state.showSlideMenu ? 'menu-btn active':'menu-btn'}>
                            <img src="img/menu-arrow.png" alt="menu-toggle" className=""/>
                        </a>
                    </div>
                    <ul className="list-unstyled">
                        <li className={this.state.showMenu=='home' ? 'active':''}>
                            <NavLink to="/" id="home-menu" onClick={() => this.handleChangeMenu('home')}>
                                <i className="fa fa-home-icon"></i>Home
                            </NavLink>
                        </li>
                        <li className={this.state.showMenu=='admin' ? 'active':''}>
                            <NavLink to="/acd" onClick={() => this.handleChangeMenu('admin')}>
                                <i className="fa fa-admin" ></i>Admin
                            </NavLink>
                        </li>
                        <li className={this.state.showMenu=='logout' ? 'active':''}>
                            <NavLink to="/login" onClick={() => this.handleChangeMenu('logout')}>
                                <i className="fa fa-logout" ></i>logout
                            </NavLink>
                        </li>

                    </ul>
                </nav>
                <nav className={this.state.showSlideMenu ? 'side-navbar l2':'side-navbar l2 shrinked'}>
                    {this.state.showMenu=='home' &&
                        <ul className="list-unstyled">
                            <li className="active">
                                <a href="/acd">
                                    <i className="fa fa-tachometer"></i>
                                    Dashboard
                                </a>
                            </li>
                        </ul>
                    }
                    {this.state.showMenu=='admin' &&
                        <ul class="list-unstyled">
                            <li class="active"><a href="create-acd.html"> <i class="fa fa-handshake-o"></i>ACD</a></li>
                            <li><a href="create-acd-fund-company.html"> <i class="fa fa-tag"></i>Fund</a></li>
                            <li><a href="create-acd-sub-fund.html"> <i class="fa fa-tag"></i>Sub Fund</a></li>
                            <li><a href="create-share-class.html"> <i class="fa fa-tag"></i>Share Class</a></li>
                        </ul>
                    }
                </nav>
            </div>
        )
    }
}

SideNav.propTypes = {
    userActions: PropTypes.object,
//    user: PropTypes.array
};

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    };
}

export default connect( mapDispatchToProps)(SideNav);
//SideNav
