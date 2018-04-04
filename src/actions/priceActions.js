import * as allActions from './allActions';
//import { authHeader } from '../helpers';
import { authHeader,getConfig } from '../helpers';

let loadData = function (response,day) {
    return response.json().then(data => ({
        data: data,
        status: response.status
    }));
};

let processData = function (response, dispatch, day) {
    if (response.data && response.data.status === 400) {
        dispatch(receivePrice("logout"))
    }
    else if (response.status === 200) {
        dispatch(receivePrice(response.data,day))
    } else {
        var flash = {
            type: 'error',
            title: 'Error getting task list',
            content: 'There was an error getting the task list. Please try again.'
        }
        dispatch({type: "DISPLAY_FLASH", data: flash})
    }
};

export function receivePrice(data,day) {
    if(day == 'today') {
        return {type: allActions.RECEIVE_PRICE_TODAY, priceToday: data};
    }
    if(day == 'next') {
        return {type: allActions.RECEIVE_PRICE_NEXT, priceNext: data};
    }
    if(day == 'previous') {
        return {type: allActions.RECEIVE_PRICE_PREVIOUS, pricePrevious: data};
    }
};

export function getPriceKeyDate(date, day) {
    return (dispatch) => {
        const requestOptions = {
            headers: authHeader()
        };
        fetch(getConfig('socketurl')+'price/'+date+'/'+day,requestOptions)
            .then(response =>
                loadData(response,day)
            )
            .then(response => {
                processData(response, dispatch,day);
            });
    };
}
