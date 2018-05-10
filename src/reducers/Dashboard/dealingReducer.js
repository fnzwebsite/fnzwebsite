import initialState from 'reducers/initialState';
import {FETCH_DEALING,RECEIVE_DEALING} from 'actions/allActions';

export default function dealing(state = initialState.dealing, action) {
    let newState;
    switch (action.type) {
        case FETCH_DEALING:
            return action;
        case RECEIVE_DEALING:
            newState = action.dealing;
            return newState;
        default:
            return state;
    }
}


