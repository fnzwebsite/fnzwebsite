import initialState from 'reducers/initialState';
import {
    FETCH_ACD_PREVIOUS, RECEIVE_ACD_PREVIOUS
} from 'actions/allActions';

export default function acdPrevious(state = initialState.acdPrevious, action) {
    let newState;
    switch (action.type) {
        case FETCH_ACD_PREVIOUS:
            return action;
        case RECEIVE_ACD_PREVIOUS:
            newState = action.acdPrevious;
            return newState;
        default:
            return state;
    }
}
