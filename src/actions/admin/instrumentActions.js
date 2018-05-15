import * as allActions from 'actions/allActions'
import { push }               from 'react-router-redux';
import { httpDirectGet,httpDirectPost }  from 'utils/Utils';


const instrumentActions = {
    getInstrumentData: () => {
        return dispatch => {
            httpDirectGet('instrument')
                .then((data) => {

                    dispatch({type: allActions.RECEIVE_INSTRUMENT_DATA, instrumentData: data});
                }).catch(err => {
                if (err.message == "Token Expired or Token not valid.")
                    // localStorage.removeItem('token');
                    // localStorage.removeItem('displayName');
                    // localStorage.removeItem('acdId');
                    dispatch(push('/signin'))
            });
        };
    },

    postInstrumentData: (body) => {
        return dispatch => {
            httpDirectPost('instrument',body)
                .then((data) => {
                    dispatch({type: allActions.POST_INSTRUMENT_DATA, postInstrumentData: data[0]});
                }).catch(err => {
                if (err.message == "Token Expired or Token not valid.")
                    dispatch(push('/signin'))
            });
        };
    }
};




export default instrumentActions;
