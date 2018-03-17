import * as allActions from './allActions';
import { authHeader } from '../helpers';

let loadData = function (response) {
    return response.json().then(data => ({
        data: data,
        status: response.status
    }));
};

let processData = function (response, dispatch) {
    if (response.data && response.data.status === 400) {
        dispatch(receiveDealings("logout"))
    }
    else if (response.status === 200) {
        dispatch(receiveDealings(response.data))
    } else {
        var flash = {
            type: 'error',
            title: 'Error getting task list',
            content: 'There was an error getting the task list. Please try again.'
        }
        dispatch({type: "DISPLAY_FLASH", data: flash})
    }
};

export function receiveDealings(data) {
    return {type: allActions.RECEIVE_DEALING, dealing: data};
};

export function getDealings() {
    return (dispatch) => {
        fetch('http://localhost:3700/dealing',{
            mode:'cros',
            headers:authHeader()
        })
            .then(response =>
                loadData(response)
            )
            .then(response => {
                processData(response, dispatch);
            });
    };
};

export function getDealingsById(dealingId) {
    return (dispatch) => {
        const requestOptions = {
            headers: authHeader()
        };

        fetch('http://ec2-35-178-56-52.eu-west-2.compute.amazonaws.com:8081/api/dealing/'+dealingId,requestOptions)
            .then(response =>
                loadData(response)
            )
            .then(response => {
                processData(response, dispatch);
            });
    };
};