import {
    FETCH_ACD_NEXT_SUCCESS,
} from 'constants/ActionTypes';

const INIT_STATE = {
    next: null,
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case FETCH_ACD_NEXT_SUCCESS: {
            return {
                ...state,
                next: action.payload,
            }
        }

        default:
            return state;
    }
}