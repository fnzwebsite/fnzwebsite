import initialState from './initialState';
import {FETCH_POSTACD_DATA, POST_ACD_DATA} from '../actions/allActions';

export default function postAcdData(state = initialState.postAcdData, action) {
    let newState;
    switch (action.type) {
        case FETCH_POSTACD_DATA:
            return action;
        case POST_ACD_DATA:
            newState = action.postAcdData;
            return newState;
        default:
            return state;
    }
};
