import initialState from './initialState';
import {
    FETCH_ACD_NEXT, RECEIVE_ACD_NEXT
} from '../actions/allActions';

export default function acdNext(state = initialState.acdNext, action) {
    let newState;
    switch (action.type) {
        case FETCH_ACD_NEXT:
            return action;
        case RECEIVE_ACD_NEXT:
            newState = action.acdNext;
            return newState;
        default:
            return state;
    }
}
