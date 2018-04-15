import * as allActions from './allActions';
import { authHeader,getConfig } from '../helpers';

let loadData = function (response,day) {
    return response.json().then(data => ({
        data: data,
        status: response.status
    }));
};

let processData = function (response, dispatch) {
    if (response.data && response.data.status === 400) {
        dispatch(receiveData("logout"))
    }
    else if (response.status === 200) {
        dispatch(receiveData(response.data))
    } else {
        var flash = {
            type: 'error',
            title: 'Error getting task list',
            content: 'There was an error getting the task list. Please try again.'
        }
        dispatch({type: "DISPLAY_FLASH", data: flash})
    }
};

export function getAllAcdData() {
    return (dispatch) => {
        // const requestOptions = {
        //
        //     headers: {authHeader(),mode:'cors'}
        // };
        //console.log(JSON.stringify(requestOptions));
        //console.log('http:/35.178.56.52api/v1/acd');
        fetch('http://35.178.56.52:8081/api/v1/acd',
        {
          mode:'cors',
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

export function receiveData(data) {
  //alert(JSON.stringify(data));
        return {type: allActions.FETCH_ACD_DATA, acdData: data};

};
