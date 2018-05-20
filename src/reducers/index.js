import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import Settings from './Settings';
import Auth from './Auth';
// import ToDo from 'components/fnzdashboard/reducers/dealingReducer';
// import ToDo from './ToDo';
import Dealing from '../components/fnzdashboard/reducers/dealing';
import AcdToday from '../components/fnzdashboard/reducers/acdToday';
import AcdPrevious from '../components/fnzdashboard/reducers/acdPrevious';
import AcdNext from '../components/fnzdashboard/reducers/acdNext';
import Signin from '../components/Login/reducers/signin';
const reducers = combineReducers({
    routing: routerReducer,
    settings: Settings,
    auth: Auth,
    dealing: Dealing,
    acdToday:AcdToday,
    acdPrevious:AcdPrevious,
    acdNext:AcdNext,
    signin:Signin
});

export default reducers;