import initialState from 'reducers/initialState';
import {FETCH_DEALINGBYISIN,RECEIVE_DEALINGBYISIN} from 'actions/allActions';


export default function dealsByDate(state = initialState.dealsByIsin, action) {
    let newState;
    switch (action.type) {
        case FETCH_DEALINGBYISIN:
            return action;
        case RECEIVE_DEALINGBYISIN:
            newState = action.dealsByIsin;
            return newState;
        default:
            return state;
    }
}