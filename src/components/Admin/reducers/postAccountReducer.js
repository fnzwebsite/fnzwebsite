import initialState from './initialState';
import {FETCH_POSTACDACCOUNT_DATA, POST_ACDACCOUNT_DATA} from '../actions/allActions';

export default function postAcdAccountData(state = initialState.postAcdAccountData, action) {
    let newState;
    switch (action.type) {
        case FETCH_POSTACDACCOUNT_DATA:
            return action;
        case POST_ACDACCOUNT_DATA:
            newState = action.postAcdAccountData;
            return newState;
        default:
            return state;
    }
};