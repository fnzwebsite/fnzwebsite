import React                        from 'react';
import { Route, Redirect, Link }    from 'react-router-dom'
import SignIn                       from '../components/Login/SignIn';
import Home                         from '../components/Main/Home';
import Dashboard from '../components/Dashboard/Dashboard';

export default function configRoutes() {
  return (
    <div>
      {/*<Route exact path="/" component={App} />*/}
        <AuthenticatedRoute path='/' component={Home} />
        <Route path="/sign_in" component={SignIn}/>
    </div>
  );
}

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        localStorage.getItem('token')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/sign_in'}}/>
    )} />
)

