import React from 'react';
import {Router, Route} from 'react-router';
import {connect} from 'react-redux';
import {history} from '../helpers/History';
import AlertActions from './Common/actions/alert.actions';
import PrivateRoute from './Route/PrivateRoute';
import Home from './Main/view/Home';
import LoginPage from './Login/view/LoginPage';

class App extends React.Component {
    constructor(props) {
        super(props);
        const {dispatch} = this.props;
        history.listen((location, action) => {
            dispatch(AlertActions.clear());
        });
    }

    render() {
        const {alert} = this.props;
        return (
            <Router history={history}>
                <div>
                    <PrivateRoute path='/' component={Home} />
                    <Route path="/login" component={LoginPage}/>
                </div>
            </Router>
        );
    }
}

function mapStateToProps(state) {
    const {alert} = state;
    return {
        alert
    };
}

export default connect(mapStateToProps)(App);
