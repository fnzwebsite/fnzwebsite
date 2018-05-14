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
                    dispatch(push('/#/signin'))
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
                        dealsByIsin: data
                    });
                }).catch(err => {
                    if (err.message == "Token Expired or Token not valid." || err.status==400) 
                    // localStorage.removeItem('token');
                    // localStorage.removeItem('displayName');
                    // localStorage.removeItem('acdId');
                    dispatch(push('/#/signin'))
            });
        };
    },

    getDealingsByISIN: (isin,boxDate) => {
        console.log('called deals by  isin')
        return dispatch => {
            httpGet('getDealsByIsin/'+isin+'/'+boxDate)
                .then((data) => {
               //  console.log("isin wise data:"+ JSON.stringify(data))
                    dispatch({
                        type: allActions.RECEIVE_DEALINGBYISIN,
                        dealsByIsin: data
                    });
                }).catch(err => {
                    if (err.message == "Token Expired or Token not valid." || err.status==400) 
                    // localStorage.removeItem('token');
                    // localStorage.removeItem('displayName');
                    // localStorage.removeItem('acdId');
                    dispatch(push('/#/signin'))
            });
        };
    }
};

export default dealingActions;
