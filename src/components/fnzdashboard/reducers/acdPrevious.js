import {
    FETCH_ACD_PREVIOUS_SUCCESS,
} from 'constants/ActionTypes';

const INIT_STATE = {
    previous: null,
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case FETCH_ACD_PREVIOUS_SUCCESS: {
            return {
                ...state,
                previous: action.payload,
            }
        }

        default:
            return state;
    }
}