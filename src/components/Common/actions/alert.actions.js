import * as allActions from '../../../actions/allActions';

 const AlertActions = {
    success,
    error,
    clear
};

function success(message) {
    return { type: allActions.ALERT_SUCCESS, message };
}

function error(message) {
    return { type: allActions.ALERT_ERROR, message };
}

function clear() {
    return { type: allActions.ALERT_CLEAR };
}
export default AlertActions;
