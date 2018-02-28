import * as allActions from './allActions';

export function receiveInstrument(data) {
    return {type: allActions.RECEIVE_INSTRUMENT, instrument: data};
};

export function receiveReadCsv(data) {
    return {type: allActions.RECEIVE_READ_CSV, user: data};
};

export function receiveReadPrice(data) {
    return {type: allActions.RECEIVE_READ_PRICE, user: data};
};

let loadData = function (response) {
    return response.json().then(data => ({
        data: data,
        status: response.status
    }));
};

let processData = function (response, dispatch) {
    if (response.status === 200) {
        dispatch(receiveInstrument(response.data))
    } else {
        var flash = {
            type: 'error',
            title: 'Error getting task list',
            content: 'There was an error getting the task list. Please try again.'
        }
        dispatch({type: "DISPLAY_FLASH", data: flash})
    }
};

let processDataReadCsv = function (response, dispatch) {
    if (response.status === 200) {
        dispatch(receiveReadCsv(response.data))
    } else {
        var flash = {
            type: 'error',
            title: 'Error getting task list',
            content: 'There was an error getting the task list. Please try again.'
        }
        dispatch({type: "DISPLAY_FLASH", data: flash})
    }
};

let processDataReadPrice = function (response, dispatch) {
    if (response.status === 200) {
        dispatch(receiveReadPrice(response.data))
    } else {
        var flash = {
            type: 'error',
            title: 'Error getting task list',
            content: 'There was an error getting the task list. Please try again.'
        }
        dispatch({type: "DISPLAY_FLASH", data: flash})
    }
};

export function getInstrument() {
    return (dispatch) => {
        fetch('http://ec2-35-178-56-52.eu-west-2.compute.amazonaws.com:8081/api/instrument')
            .then(response =>
                loadData(response)
            )
            .then(response => {
                processData(response, dispatch);
            });
    };
};

export function getInstrumentById(instrumentId) {
    return (dispatch) => {
        fetch('http://ec2-35-178-56-52.eu-west-2.compute.amazonaws.com:8081/api/instrument/'+instrumentId)
            .then(response =>
                loadData(response)
            )
            .then(response => {
                processData(response, dispatch);
            });
    };
};

export function postInstrument() {
    return (dispatch) => {
        fetch('/instrument')
            .then(response =>
                loadData(response)
            )
            .then(response => {
                processData(response, dispatch);
            });
    };
};

export function updateInstrument() {
    return (dispatch) => {
        fetch('/instrument')
            .then(response =>
                loadData(response)
            )
            .then(response => {
                processData(response, dispatch);
            });
    };
};

export function postReadCsv(fileLocation) {
    return (dispatch) => {
        fetch('/instrument/${fileLocation}')
            .then(response =>
                loadData(response)
            )
            .then(response => {
                processDataReadCsv(response, dispatch);
            });
    };
};

export function postReadPrice(fileLocation) {
    return (dispatch) => {
        fetch('/instrument/${fileLocation}')
            .then(response =>
                loadData(response)
            )
            .then(response => {
                processDataReadPrice(response, dispatch);
            });
    };
};

