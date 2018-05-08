import * as allActions from './allActions'
import { push }               from 'react-router-redux';
import { httpDirectGet, httpDirectPost }  from '../../../utils/Utils';


const acdDataActions = {
    getAllAcdData: () => {
        return dispatch => {
            httpDirectGet('company')
                .then((data) => {

                    dispatch({type: allActions.RECEIVE_ACD_DATA, acdData: data});
                }).catch(err => {
                if (err.message == "Token Expired or Token not valid.")
                    // localStorage.removeItem('token');
                    // localStorage.removeItem('displayName');
                    // localStorage.removeItem('acdId');
                    dispatch(push('/sign_in'))
            });
        };
    },

    postCompanyData: (body) => {
        return dispatch => {
            httpDirectPost('company',body)
                .then((data) => {
                    dispatch({type: allActions.POST_ACD_DATA, postAcdData: data[0]});

                }).catch(err => {
                if (err.message == "Token Expired or Token not valid.")
                    dispatch(push('/sign_in'))
            });
        };
    }
};




export default acdDataActions;
