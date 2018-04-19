import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider} from 'react-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import { Router} from 'react-router'
import { routerMiddleware} from 'react-router-redux'
import configRoutes from './routes'
import rootReducer from './reducers'


const history = createHistory()
const rMiddleware = routerMiddleware(history)

const store = createStore(
    rootReducer,
    applyMiddleware(thunk, rMiddleware)
)


ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <div>
                {configRoutes()}
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);
