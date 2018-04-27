import * as allActions from './allActions'
import { push }               from 'react-router-redux';
import { httpGet, httpPost,httpNodeServerPost }  from '../utils';


const acdAccountActions = {
    getAccountsData: () => {
        return dispatch => {
                httpGet('getAcdAccountData')
                .then((data) => {

                    dispatch({type: allActions.RECEIVE_ACDACCOUNT_DATA, acdAccountData: data});
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


export default acdAccountActions;
