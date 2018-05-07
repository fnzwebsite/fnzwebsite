import * as allActions from './allActions'
import { push }               from 'react-router-redux';
import { httpGet, httpServerPost,httpNodeServerPost }  from '../../../utils/Utils';


const acdInstrumentActions = {
    getInstrumentData: () => {
        return dispatch => {
                httpGet('getInstrument')
                .then((data) => {

                    dispatch({type: allActions.RECEIVE_ACDINSTRUMENT_DATA, acdInstrumentData: data});
                }).catch(err => {
                if (err.message == "Token Expired or Token not valid.")
                    // localStorage.removeItem('token');
                    // localStorage.removeItem('displayName');
                    // localStorage.removeItem('acdId');
                    dispatch(push('/sign_in'))
            });
        };
    },

    postInstrumentData: (body) => {
        return dispatch => {
            httpServerPost('addInstrument',body)
                .then((data) => {
                    dispatch({type: allActions.POST_ACDINSTRUMENT_DATA, postAcdInstrumentData: data[0]});

                }).catch(err => {
                if (err.message == "Token Expired or Token not valid.")
                    dispatch(push('/sign_in'))
            });
        };
    }
};




export default acdInstrumentActions;
