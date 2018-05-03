import * as allActions from './allActions'
import { push }               from 'react-router-redux';
import { httpGet, httpPost,httpNodeServerPost }  from '../../../utils/Utils';


const acdDealActions = {
    getDealData: () => {
        return dispatch => {
                httpGet('getAcdDealData')
                .then((data) => {

                    dispatch({type: allActions.RECEIVE_ACDDEAL_DATA, acdDealData: data});
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




export default acdDealActions;
