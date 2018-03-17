import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../helpers';
import  AlertActions  from '../actions/alert.actions';
import PrivateRoute  from '../components/PrivateRoute';
import Home from '../components/Home';
import LoginPage  from '../components/LoginPage';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(AlertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
                    <Router history={history}>
                        <div>
                            <PrivateRoute exact path="/" component={Home} />
                            <Route path="/login" component={LoginPage} />
                        </div>
                    </Router>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

export default connect(mapStateToProps)(App);
