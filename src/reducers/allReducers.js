import {combineReducers} from 'redux';
import instrument from './instrumentReducer';
import dealing from './dealingReducer';

const rootReducer = combineReducers({
    instrument,
    dealing
});

export default rootReducer;