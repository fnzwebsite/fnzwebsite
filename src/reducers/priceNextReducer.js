import initialState from './initialState';
import {
    FETCH_PRICE_NEXT, RECEIVE_PRICE_NEXT
} from '../actions/allActions';

export default function priceNext(state = initialState.priceNext, action) {
    let newState;
    switch (action.type) {
        case FETCH_PRICE_NEXT:
            return action;
        case RECEIVE_PRICE_NEXT:
            newState = action.priceNext;
            return newState;
        default:
            return state;
    }
}
