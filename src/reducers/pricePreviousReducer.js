import initialState from './initialState';
import {
    FETCH_PRICE_PREVIOUS,RECEIVE_PRICE_PREVIOUS
} from '../actions/allActions';

export default function pricePrevious(state = initialState.pricePrevious, action) {
    let newState;
    switch (action.type) {

        case FETCH_PRICE_PREVIOUS:
            return action;
        case RECEIVE_PRICE_PREVIOUS:
            newState = action.pricePrevious;
            return newState;
        default:
            return state;
    }
}
