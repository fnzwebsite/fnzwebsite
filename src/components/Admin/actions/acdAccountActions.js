import * as allActions from './allActions'
import { push }               from 'react-router-redux';
import { httpGet, httpServerPost,httpNodeServerPost }  from '../../../util/Utils';


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
    },

    postAccountsData: (body) => {
        return dispatch => {
            httpServerPost('account',body)
                .then((data) => {
                    dispatch({type: allActions.POST_ACDACCOUNT_DATA, postAcdAccountData: data[0]});

                }).catch(err => {
                if (err.message == "Token Expired or Token not valid.")
                    dispatch(push('/sign_in'))
            });
        };
    }
};


export default acdAccountActions;
