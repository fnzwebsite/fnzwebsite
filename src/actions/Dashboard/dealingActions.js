import * as allActions from 'actions/allActions'
import { push }               from 'react-router-redux';
import { httpGet, httpPost }  from 'util/Utils';


const dealingActions = {
    getDealings: () => {
        return dispatch => {
            httpGet('dealing')
                .then((data) => {
                    dispatch({
                        type: allActions.RECEIVE_DEALING,
                        dealing: data
                    });
                }).catch(err => {
                if (err.message == "Token Expired or Token not valid.")
                    // localStorage.removeItem('token');
                    // localStorage.removeItem('displayName');
                    // localStorage.removeItem('acdId');
                    dispatch(push('/#/signin'))
            });
        };
    }
};

export default dealingActions;
