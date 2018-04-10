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
    componentWillReceiveProps(nextProps) {
        console.log(nextProps.user)
    }

    handleSubmit(e) {
        e.preventDefault();
//alert('hi....')
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
                <div className="page-content d-flex align-items-stretch">
                    <div className="content-inner">
                        <div className="container d-flex align-items-center">
                            <div className="form-holder col-sm-12">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="form d-flex align-items-center">
                                            <div className="content login_content">
                                                <h4>Login</h4>
                                                <form id="login-form" method="post" name="form" onSubmit={this.handleSubmit}>
                                                    <div className="form-group">
                                                        <input id="login-username" type="text" name="username" value={username} onChange={this.handleChange}  placeholder="Username" className="form-control"/>
                                                        {submitted && !username &&
                                                        <div className="help-block">Username is required</div>
                                                        }
                                                    </div>
                                                    <div className="form-group">
                                                        <input id="login-password" type="password" value={password} onChange={this.handleChange} name="password" placeholder="Password" className="form-control"/>
                                                        {submitted && !password &&
                                                        <div className="help-block">Password is required</div>
                                                        }
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="d-flex justify-content-center">
                                                                <button id="login" href="" className="btn">Log in</button>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <a href="#" className="pwd_link">Lost your password?</a>
                                                        </div>
                                                    </div>
                                                </form>
                                                <div className="fnz_block">
                                                    <h3>FNZ Chain</h3>
                                                    <p>&copy; 2018 All Right reserved. Privacy and Terms</p>
                                                </div>
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
