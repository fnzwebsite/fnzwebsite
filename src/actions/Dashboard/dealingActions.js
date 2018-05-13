import * as allActions from 'actions/allActions'
import { push }               from 'react-router-redux';
import { httpGet, httpPost }  from 'util/Utils';


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
                    if (err.message == "Token Expired or Token not valid." || err.status==400) 
                    // localStorage.removeItem('token');
                    // localStorage.removeItem('displayName');
                    // localStorage.removeItem('acdId');
                    dispatch(push('#/signin'))
            });
        };
    },

    getDealingsByBoxDate: (boxDate) => {
        console.log('called....')
        return dispatch => {
            httpGet('dealingbyday/'+boxDate)
                .then((data) => {
                 //console.log("Data rec:"+ JSON.stringify(data))
                    dispatch({
                        type: allActions.RECEIVE_DEALINGBYBOXDATE,
                        dealsByDate: data
                    });
                }).catch(err => {
                    if (err.message == "Token Expired or Token not valid." || err.status==400) 
                    // localStorage.removeItem('token');
                    // localStorage.removeItem('displayName');
                    // localStorage.removeItem('acdId');
                    dispatch(push('#/signin'))
            });
        };
    }
};

export default dealingActions;
