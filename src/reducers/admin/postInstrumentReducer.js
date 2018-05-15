import initialState from 'reducers/initialState';
import {FETCH_POSTINSTRUMENT_DATA, POST_INSTRUMENT_DATA} from 'actions/allActions';

export default function postInstrumentData(state = initialState.postInstrumentData, action) {
    let newState;
    switch (action.type) {
        case FETCH_POSTINSTRUMENT_DATA:
            return action;
        case POST_INSTRUMENT_DATA:
            newState = action.postInstrumentData;
            return newState;
        default:
            return state;
    }
};
