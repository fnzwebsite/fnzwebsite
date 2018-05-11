import * as allActions from 'actions/allActions'
import { push }               from 'react-router-redux';
import { httpGet, httpPost }  from 'utils/Utils';
import moment from "moment";

const acdActions = {
    getAcd: (date,acdId) => {
        return dispatch => {
          var day;
          if (date==moment().format("YYYY-MM-DD")){
              day="today"
          }
          if (date==moment().add('days', -1).format("YYYY-MM-DD")) {
                day="previous"
          }
          if(date==moment().add('days', 1).format("YYYY-MM-DD")){
            day="next"
          }
            httpGet('box/'+date+'/acd/'+acdId)
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

                    dispatch(push('/#/signin'))
            });
        };
    },

    getAcdByDay: (date,acdId) => {
        return dispatch => {
            httpGet('box/'+date+'/acd/'+acdId)
                .then((data) => {
                        dispatch({type: allActions.RECEIVE_ACD_PRICE, acdPrice: data});
                }).catch(err => {
                if (err.message == "Token Expired or Token not valid.")
                    // localStorage.removeItem('token');
                    // localStorage.removeItem('displayName');
                    // localStorage.removeItem('acdId');

                    dispatch(push('/#/signin'))
            });
        };
    }
};

export default acdActions;
