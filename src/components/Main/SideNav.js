import React from 'react';
import {Link} from 'react-router-dom';
import { push } from 'react-router-redux';

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
        localStorage.removeItem('token');
        localStorage.removeItem('displayName');
        localStorage.removeItem('acdId');
        push('/sign_in')
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
                            <Link to="/dashboard" id="home-menu" onClick={() => this.handleChangeMenu('home')}>
                                <i className="fa fa-home-icon"></i>Home
                            </Link>
                        </li>
                        <li className={this.state.showMenu=='admin' ? 'active':''}>
                            <Link to="/acd" onClick={() => this.handleChangeMenu('admin')}>
                                <i className="fa fa-admin" ></i>Admin
                            </Link>
                        </li>
                        <li>
                            <Link to="/sign_in" onClick={() => this.logout()}>
                                <i className="fa fa-power-off" ></i>Logout
                            </Link>
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
                        <li class="active"><a href="Acd"> <i class="fa fa-handshake-o"></i>Entity</a></li>
                        <li><a href="AcdAccount"> <i class="fa fa-tag"></i>Account</a></li>
                        <li><a href="AcdInstrument"> <i class="fa fa-tag"></i>Instrument</a></li>
                        <li><a href="create-deal.html"> <i class="fa fa-tag"></i>Deal</a></li>
                    </ul>
                    }
                </nav>
            </div>
        )
    }
}

export default SideNav;
