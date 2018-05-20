import {
    FETCH_LOGIN_SUCCESS,
} from '../constants/ActionTypes';

const INIT_STATE = {
    signInData: null,
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case FETCH_LOGIN_SUCCESS: {
            return {
                ...state,
                signInData: action.payload,
            }
        }

        default:
            return state;
    }
}