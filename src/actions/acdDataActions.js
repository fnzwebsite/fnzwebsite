import * as allActions from './allActions'
import { push }               from 'react-router-redux';
import { httpGet, httpPost }  from '../utils';


const acdDataActions = {
    getAllAcdData: () => {
        return dispatch => {

                httpGet('getacd')
                .then((data) => {
                    dispatch({type: allActions.RECEIVE_ACD_DATA, acdData: data});
                }).catch(err => {
                if (err.message == "Token Expired or Token not valid.")
                    dispatch(push('/sign_in'))
            });
        };
    }
};

export default acdDataActions;
