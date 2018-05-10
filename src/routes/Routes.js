import React                        from 'react';
import { Route, Redirect, Link }    from 'react-router-dom'
import SignIn                       from '../components/Login/view/SignIn';
import Home                         from '../components/Main/view/Home';
import Dashboard from '../components/Dashboard/view/Dashboard';

export default function configRoutes() {
  return (
    <div>
      {/*<Route exact path="/" component={App} />*/}
        <Route exact path="/#/signin" component={SignIn}/>
        <AuthenticatedRoute path='/' component={Home} />

    </div>
  );
}

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        localStorage.getItem('token')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/#signin'}}/>
    )} />
)
