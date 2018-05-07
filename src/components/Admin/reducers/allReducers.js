import dealing from '../../Dashboard/reducers/dealingReducer';
import price from '../../Dashboard/reducers/priceTodayReducer';
import acdNext from '../../Dashboard/reducers/priceNextReducer';
import acdToday from '../../Dashboard/reducers/priceTodayReducer';
import acdPrevious from '../../Dashboard/reducers/pricePreviousReducer';
import acdData from './acdDataReducer';
import acdInstrumentData from './acdInstrumentReducer';
import acdInstrumentData from './acdAccountReducer';
import acdDealData from './acdDealReducer';
import acdAccountData from './acdAccountReducer';
import postAcdAccountData from './postAccountReducer';
import postAcdData from './postAcdReducer';
import postAcdInstrumentData from './postInstrumentReducer';
import postAcdDealData from './postDealReducer';

export {
    dealing,
    price,
    acdNext,
    acdToday,
    acdPrevious,
    acdData,
    acdInstrumentData,
    acdAccountData,
    acdDealData,
    postAcdAccountData,
    postAcdData,
    postAcdInstrumentData,
    postAcdDealData
};
