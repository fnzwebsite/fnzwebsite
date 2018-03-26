import initialState from './initialState';
import {
  FETCH_PRICE_TODAY, RECEIVE_PRICE_TODAY
} from '../actions/allActions';

export default function priceToday(state = initialState.priceToday, action) {
    let newState;
    switch (action.type) {
        case FETCH_PRICE_TODAY:
            return action;
        case RECEIVE_PRICE_TODAY:
            newState = action.priceToday;
            return newState;
        default:
            return state;
    }
}
