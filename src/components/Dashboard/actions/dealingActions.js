import * as allActions from '../../Admin/actions/allActions'
import { push }               from 'react-router-redux';
import { httpGet, httpPost }  from '../../../utils/Utils';


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
                    dispatch(push('/sign_in'))
            });
        };
    }
};

export default dealingActions;