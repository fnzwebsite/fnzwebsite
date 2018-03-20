import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as instrumentActions from '../actions/instrumentActions';
import userActions  from '../actions/user.actions';
import PropTypes from 'prop-types';
import React from 'react';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.userActions.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            this.props.userActions.login(username, password);
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (

            <div className="page login-page">
               
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
                                        <div className="avatar"><img src="img/profile-img.jpg" alt="..." className="img-fluid rounded-circle"/></div>
                                    </li>
                                    <li className="nav-item"><a href="" className="nav-link">Sign In</a></li>
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
                <div className="page-content d-flex align-items-stretch">

            

                    <div className="content-inner">
                        
                        <div className="container d-flex align-items-center">
                            <div className="form-holder has-shadow col-sm-12">
                                <div className="row">
                                 
                                    <div className="col-sm-12 bg-white">
                                        <div className="form d-flex align-items-center">
                                            <div className="content">
                                                <form id="login-form" method="post" name="form" onSubmit={this.handleSubmit}>
                                                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>

                                                        <input type="text" className="input-material" name="username" value={username} onChange={this.handleChange} />
                                                        <label className="label-material" htmlFor="username">User name</label>
                                                        {submitted && !username &&
                                                        <div className="help-block">Username is required</div>
                                                        }
                                                    </div>
                                                    <div className="form-group">
                                                        <input id="login-password" type="password" className="input-material" name="password" value={password} onChange={this.handleChange} />
                                                        <label className="input-material" htmlFor="password">Password</label>
                                                        {submitted && !password &&
                                                        <div className="help-block">Password is required</div>
                                                        }
                                                    </div>
                                                    <div className="d-flex justify-content-center">
                                                        <button id="login" href="" className="btn btn-primary">Login</button>
                                                    </div>
                                                </form>




                                                <a href="#" className="forgot-pass">Forgot Password?</a><small>Do not have an account? </small><a href=" " className="signup">Signup</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <footer className="main-footer">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-sm-12 text-center">
                                        <p>&copy; Copyright FNZ UK Ltd 2018.</p>
                                    </div>
                                </div>
                            </div>
                        </footer>
                    </div>
                    
                </div>
            </div>
            
           
        );
    }
}

LoginPage.propTypes = {
    userActions: PropTypes.object,
    user: PropTypes.array
};

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);