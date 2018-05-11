import initialState from 'reducers/initialState';
import {
    FETCH_ACD_PRICE, RECEIVE_ACD_PRICE
} from 'actions/allActions';

export default function acdPrice(state = initialState.acdPrice, action) {
    let newState;
    switch (action.type) {
        case FETCH_ACD_PRICE:
            return action;
        case RECEIVE_ACD_PRICE:
            newState = action.acdPrice;
            return newState;
        default:
            return state;
    }
}
