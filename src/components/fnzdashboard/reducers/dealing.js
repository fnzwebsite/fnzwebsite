import {
    FETCH_ALL_DEALINGS_SUCCESS,
} from 'constants/ActionTypes';

const INIT_STATE = {
    dealingList: null,
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case FETCH_ALL_DEALINGS_SUCCESS: {
            return {
                ...state,
                dealingList: action.payload,
        }
        }

        default:
            return state;
    }
}