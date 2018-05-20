import {
    FETCH_ACD_TODAY,
    FETCH_ACD_TODAY_SUCCESS,
} from 'constants/ActionTypes';


export const fetchAcdToday = (date,acd) => {
    return {
        type: FETCH_ACD_TODAY,
        date:date,
        acd:acd,
    };
};

export const fetchAcdTodaySuccess = (data) => {
    return {
        type: FETCH_ACD_TODAY_SUCCESS,
        payload: data
    }
};

