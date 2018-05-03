import React   from 'react';
import { connect }          from 'react-redux';
import { Link }             from 'react-router-dom';

import { setDocumentTitle, renderErrorsFor } from '../../../utils/Utils';
import signinActions              from '../actions/signinActions';

class SessionsNew extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            submitted: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
  componentDidMount() {
    setDocumentTitle('Sign In');
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
            const data = {
                email: username,
                password: password
            };
            this.props.dispatch(signinActions.signIn(data));
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
                            <h3 style={{display:'none'}}>FNZ Chain</h3>
                            <div className="brand-text brand-big"><img src="img/logo.png" alt="logo" className=""/></div>
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

function mapStateToProps(state) {
  debugger;
  return {errors: state.session.error}
}

export default connect(mapStateToProps)(SessionsNew)






