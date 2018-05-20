import * as allActions from './allActions'
import { push }               from 'react-router-redux';
import { httpGet, httpServerPost,httpNodeServerPost }  from '../../../util/Utils';


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
    },

    postDealData: (body) => {
        return dispatch => {
            httpServerPost('addDeal',body)
                .then((data) => {
                    dispatch({type: allActions.POST_ACDDEAL_DATA, postAcdDealData: data[0]});

                }).catch(err => {
                if (err.message == "Token Expired or Token not valid.")
                    dispatch(push('/sign_in'))
            });
        };
    }
};




export default acdDealActions;
