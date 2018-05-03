import initialState from '../../Admin/reducers/initialState';
import {
    FETCH_ACD_TODAY, RECEIVE_ACD_TODAY
} from '../../Admin/actions/allActions';

export default function acdToday(state = initialState.acdToday, action) {
    let newState;
    switch (action.type) {
        case FETCH_ACD_TODAY:
            return action;
        case RECEIVE_ACD_TODAY:
            newState = action.acdToday;
            return newState;
        default:
            return state;
    }
}
