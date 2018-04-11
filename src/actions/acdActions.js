import * as allActions from './allActions';
import { authHeader,getConfig } from '../helpers';

let loadData = function (response) {
    return response.json().then(data => ({
        data: data,
        status: response.status
    }));
};

let processData = function (response, dispatch, day) {
    if (response.data && response.data.status === 400) {
        dispatch(receiveAcd("logout"), day)
    }
    else if (response.status === 200) {
        dispatch(receiveAcd(response.data, day))
    } else {
        var flash = {
            type: 'error',
            title: 'Error getting task list',
            content: 'There was an error getting the task list. Please try again.'
        }
        dispatch({type: "DISPLAY_FLASH", data: flash})
    }
};

export function receiveAcd(data,day) {
    if(day=="today") {
        return {type: allActions.RECEIVE_ACD_TODAY, acdToday: data};
    }
    if(day=="next") {
        return {type: allActions.RECEIVE_ACD_NEXT, acdNext: data};
    }
    if(day=="previous") {
        return {type: allActions.RECEIVE_ACD_PREVIOUS, acdPrevious: data};
    }
};

export function getAcd(day,acdId) {
    return (dispatch) => {
        fetch(getConfig('socketurl')+'box/'+day+'/acd/'+acdId,{
            mode:'cors',
            headers:authHeader()
        })
            .then(response =>
                loadData(response)
            )
            .then(response => {
                processData(response, dispatch, day);
            });
    };
};