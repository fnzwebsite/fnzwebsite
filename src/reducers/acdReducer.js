import initialState from './initialState';
import {FETCH_ACD,RECEIVE_ACD} from '../actions/allActions';

export default function acd(state = initialState.acd, action) {
    let newState;
    switch (action.type) {
        case FETCH_ACD:
            return action;
        case RECEIVE_ACD:
            newState = action.acd;
            return newState;
        default:
            return state;
    }
}
