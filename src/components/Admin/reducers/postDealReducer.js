import initialState from './initialState';
import {FETCH_POSTACDDEAL_DATA, POST_ACDDEAL_DATA} from '../actions/allActions';

export default function postAcdDealData(state = initialState.postAcdDealData, action) {
    let newState;
    switch (action.type) {
        case FETCH_POSTACDDEAL_DATA:
            return action;
        case POST_ACDDEAL_DATA:
            newState = action.postAcdDealData;
            return newState;
        default:
            return state;
    }
};
