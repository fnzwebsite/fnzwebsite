import * as allActions from './allActions';
//import { authHeader } from '../helpers';
import { authHeader,getConfig } from '../helpers';

let loadData = function (response,day) {
    return response.json().then(data => ({
        data: data,
        status: response.status
    }));
};

let processData = function (response, dispatch) {
    if (response.data && response.data.status === 400) {
        dispatch(receivePrice("logout"))
    }
    else if (response.status === 200) {
        dispatch(receivePrice(response.data))
    } else {
        var flash = {
            type: 'error',
            title: 'Error getting task list',
            content: 'There was an error getting the task list. Please try again.'
        }
        dispatch({type: "DISPLAY_FLASH", data: flash})
    }
};

export function receivePrice(data) {

        return {type: allActions.RECEIVE_PRICE_TODAY, price: data};

};

export function getPriceKeyDate() {
    return (dispatch) => {
        const requestOptions = {
            headers: authHeader()
        };
        fetch(getConfig('socketurl')+'price',requestOptions)
            .then(response =>
                loadData(response)
            )
            .then(response => {
                processData(response, dispatch);
            });
    };
}
