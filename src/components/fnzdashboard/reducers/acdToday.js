import {
    FETCH_ACD_TODAY_SUCCESS,
} from 'constants/ActionTypes';

const INIT_STATE = {
    today: null,
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case FETCH_ACD_TODAY_SUCCESS: {
            return {
                ...state,
                today: action.payload,
            }
        }

        default:
            return state;
    }
}