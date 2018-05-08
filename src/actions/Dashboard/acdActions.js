import * as allActions from 'actions/allActions'
import { push }               from 'react-router-redux';
import { httpGet, httpPost }  from 'util/Utils';


const acdActions = {
    getAcd: (day,acdId) => {
        return dispatch => {

            httpGet('box/'+day+'/acd/'+acdId)
                .then((data) => {
                    if(day=="today") {
                        dispatch({type: allActions.RECEIVE_ACD_TODAY, acdToday: data});
                    }
                    if(day=="next") {
                        dispatch({type: allActions.RECEIVE_ACD_NEXT, acdNext: data});
                    }
                    if(day=="previous") {
                        dispatch({type: allActions.RECEIVE_ACD_PREVIOUS, acdPrevious: data});
                    }
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

export default acdActions;