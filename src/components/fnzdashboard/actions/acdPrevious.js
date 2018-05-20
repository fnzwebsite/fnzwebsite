import {
    FETCH_ACD_PREVIOUS,
    FETCH_ACD_PREVIOUS_SUCCESS,
} from 'constants/ActionTypes';


export const fetchAcdPrevious = (date,acd) => {
    return {
        type: FETCH_ACD_PREVIOUS,
        date:date,
        acd:acd,
    };
};

export const fetchAcdPreviousSuccess = (data) => {
    return {
        type: FETCH_ACD_PREVIOUS_SUCCESS,
        payload: data
    }
};
