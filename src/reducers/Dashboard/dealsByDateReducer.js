import initialState from 'reducers/initialState';
import {FETCH_DEALINGBYBOXDATE,RECEIVE_DEALINGBYBOXDATE} from 'actions/allActions';


export default function dealsByDate(state = initialState.dealsByDate, action) {
    let newState;
    switch (action.type) {
        case FETCH_DEALINGBYBOXDATE:
            return action;
        case RECEIVE_DEALINGBYBOXDATE:
            newState = action.dealsByDate;
            return newState;
        default:
            return state;
    }
}