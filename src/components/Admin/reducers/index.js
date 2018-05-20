import { combineReducers }  from 'redux';
import session              from '../../Login/reducers/session';
import dealingReducer         from '../../Dashboard/reducers/dealingReducer'
import pricePreviousReducer         from '../../Dashboard/reducers/pricePreviousReducer'
import priceTodayReducer         from '../../Dashboard/reducers/priceTodayReducer'
import priceNextReducer         from '../../Dashboard/reducers/priceNextReducer'
import acdDataReducer         from './acdDataReducer'
// import challenges           from '../../reducers/challenges'
// import currentChallenge     from '../../reducers/currentChallenge'
import acdInstrumentReducer from './acdInstrumentReducer'
import acdAccountReducer from './acdAccountReducer'
import postAcdAccountReducer from './postAccountReducer'
import acdDealReducer from './acdDealReducer'
import postAcdReducer from './postAcdReducer'
import postInstrumentReducer from './postInstrumentReducer'
import postDealReducer from './postDealReducer'


export default combineReducers({
    dealing: dealingReducer,
    session: session,
    acdToday:priceTodayReducer,
    acdPrevious:pricePreviousReducer,
    acdNext:priceNextReducer,
    acdData:acdDataReducer,
    acdInstrumentData:acdInstrumentReducer,
    acdAccountData:acdAccountReducer,
    acdDealData: acdDealReducer,
    postAcdAccountData:postAcdAccountReducer,
    postAcdData: postAcdReducer,
    postAcdInstrumentData: postInstrumentReducer,
    postAcdDealData:postDealReducer
});
