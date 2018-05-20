import React from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import IntlMessages from 'util/IntlMessages';
import {CircularProgress} from 'material-ui/Progress';
import {setDocumentTitle, renderErrorsFor} from 'util/Utils';
// import Actions from 'actions/login/signinActions';
import {fetchLogin} from '../actions/signin';
import SweetAlert from 'react-bootstrap-sweetalert';
import {Redirect} from 'react-router-dom';
import {
    hideMessage,
    showAuthLoader,
    userSignIn
} from 'actions/Auth';

import {push} from 'react-router-redux';

class SignIn extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            submitted: false,
            basic: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSignInClick = this.handleSignInClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.signInData)
        localStorage.setItem('token', JSON.stringify(nextProps.signInData.token));
        localStorage.setItem('displayName', nextProps.signInData.enrollmentId);
        localStorage.setItem('acdId', nextProps.signInData.asset_organisations[0]);
        this.props.history.push('/app/dashboard');
    }

    componentDidMount() {
        setDocumentTitle('Sign In');
    }

    onConfirm = () => {
        this.setState({
            basic: false,
        });
    };

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }


    handleSubmit(e) {
        e.preventDefault();
        // alert("hi");

    }

    handleSignInClick() {
        this.setState({basic: true})
        //  alert(this.state)
        //this.setState({ submitted: true });
        const {email, password} = this.state;
        //alert(this.refs.txtemail.value);
        //alert("email"+email);
        if (email && password) {
            //alert("hello");
            const data = {
                email: email,
                password: password
            };
            this.props.fetchLogin(email, password);
        }
    }

    render() {
        // const { loggingIn } = this.props;
        const {email, password, submitted, basic} = this.state;
        const {showMessage, loader, alertMessage} = this.props;
        return (
            <div
                className="login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
                <div className="login-main-content">

                    <div className="logo-content d-flex align-items-center justify-content-center">

                        <img src="assets/images/login-page-logo1.png" alt="logo" title="logo"/>
                    </div>

                    <div className="login-content">
                        <div className="login-header mb-4">
                            <h1><IntlMessages id="appModule.signin"/></h1>
                        </div>

                        <div className="login-form">
                            <form id="login-form">
                                <fieldset>
                                    <TextField
                                        id="usernameId"
                                        label={<IntlMessages id="appModule.email"/>}
                                        fullWidth
                                        name="email" onChange={this.handleChange}
                                        margin="normal" ref="txtemail"
                                        className="mt-1 my-sm-3"
                                    />
                                    <TextField
                                        type="password"
                                        id="passwordId"
                                        label={<IntlMessages id="appModule.password"/>}
                                        fullWidth
                                        onChange={this.handleChange} name="password"
                                        margin="normal" ref="txtpwd"
                                        className="mt-1 my-sm-3"
                                    />

                                    {/* <div className="mb-3 d-flex align-items-center justify-content-between">
                                        <button id="login" href=""  variant="raised" color="primary">Log in</button>
                                    </div> */}
                                    <div className="mb-3 d-flex align-items-center justify-content-between">
                                        <Button variant="raised" color="primary" onClick={this.handleSignInClick}>
                                            <IntlMessages id="appModule.signIn"/>
                                        </Button>

                                        {/* <Link className="text-primary" to="/signup">
                                            <IntlMessages id="signIn.signUp"/>
                                        </Link> */}
                                    </div>
                                    {/* <SweetAlert show={basic} title={<IntlMessages id="sweetAlerts.hereIsaMessage"/>}
                            onConfirm={this.onConfirm}/> */}
                                </fieldset>
                            </form>
                        </div>
                    </div>

                </div>
                {
                    loader &&
                    <div className="loader-view">
                        <CircularProgress/>
                    </div>
                }

                <NotificationContainer/>
            </div>
        );
    }
}

const mapStateToProps = ({signin}) => {
    const {
        signInData,
    } = signin;
    return {
        signInData,
    }
};
export default connect(mapStateToProps, {
    fetchLogin,
})(SignIn);
