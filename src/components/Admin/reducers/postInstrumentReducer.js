import initialState from './initialState';
import {FETCH_POSTACDINSTRUMENT_DATA, POST_ACDINSTRUMENT_DATA} from '../actions/allActions';

export default function postAcdInstrumentData(state = initialState.postAcdInstrumentData, action) {
    let newState;
    switch (action.type) {
        case FETCH_POSTACDINSTRUMENT_DATA:
            return action;
        case POST_ACDINSTRUMENT_DATA:
            newState = action.postAcdInstrumentData;
            return newState;
        default:
            return state;
    }
};
