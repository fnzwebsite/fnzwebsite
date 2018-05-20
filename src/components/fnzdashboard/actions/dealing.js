import {
    FETCH_ALL_DEALINGS,
    FETCH_ALL_DEALINGS_SUCCESS,
} from 'constants/ActionTypes';


export const fetchDealings = (date) => {
    return {
        type: FETCH_ALL_DEALINGS,
        date:date
    };
};

export const fetchDealingsSuccess = (data) => {
    return {
        type: FETCH_ALL_DEALINGS_SUCCESS,
        payload: data
    }
};
