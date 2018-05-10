import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import Settings from "./Settings";
import Auth from "./Auth";
import session              from './session';
import dealingReducer         from './Dashboard/dealingReducer'
import pricePreviousReducer         from './Dashboard/pricePreviousReducer'
import priceTodayReducer         from './Dashboard/priceTodayReducer'
import priceNextReducer         from './Dashboard/priceNextReducer';
import dealsByDateReducer from './Dashboard/dealsByDateReducer';


const reducers = combineReducers({
  routing: routerReducer,
  settings: Settings,
  auth: Auth,
  dealing: dealingReducer,
  session: session,
  acdToday:priceTodayReducer,
  acdPrevious:pricePreviousReducer,
  acdNext:priceNextReducer,
  dealsByDate:dealsByDateReducer
});

export default reducers;
