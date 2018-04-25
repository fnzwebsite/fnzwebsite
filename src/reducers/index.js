import { combineReducers }  from 'redux';
import session              from './session';
import dealingReducer         from './dealingReducer'
import pricePreviousReducer         from './pricePreviousReducer'
import priceTodayReducer         from './priceTodayReducer'
import priceNextReducer         from './priceNextReducer'
import acdDataReducer         from './acdDataReducer'
// import challenges           from '../../reducers/challenges'
// import currentChallenge     from '../../reducers/currentChallenge'
import acdInstrumentReducer from './acdInstrumentReducer'
export default combineReducers({
    dealing: dealingReducer,
    session: session,
    acdToday:priceTodayReducer,
    acdPrevious:pricePreviousReducer,
    acdNext:priceNextReducer,
    acdData:acdDataReducer,
    acdInstrumentData:acdInstrumentReducer
});
