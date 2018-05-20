import {
    FETCH_ACD_NEXT,
    FETCH_ACD_NEXT_SUCCESS,
} from 'constants/ActionTypes';

export const fetchAcdNext = (date,acd) => {
    return {
        type: FETCH_ACD_NEXT,
        date:date,
        acd:acd,
    };
};

export const fetchAcdNextSuccess = (data) => {
    return {
        type: FETCH_ACD_NEXT_SUCCESS,
        payload: data
    }
};

