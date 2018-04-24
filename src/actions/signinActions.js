import { push }                           from 'react-router-redux';
import Constants                          from '../constants/index';
import { httpGet, httpPost, httpDelete }  from '../utils/index';

const Actions = {
  signIn: (data) => {
    return dispatch => {
      const data = {
          'enrollmentId':'test2@fnzchain.com',
          'enrollmentSecret': 'T3sting1'
      };
      httpPost('http://35.178.56.52:8081/login', data)
      .then((response) => {
        localStorage.setItem('token', JSON.stringify(response.token));
        localStorage.setItem('displayName', response.enrollmentId);
        localStorage.setItem('acdId',response.acd);
        dispatch(push('/dashboard'));
      })
      .catch((error) => {
        error.response.json()
        .then((errorJSON) => {
          dispatch({
            type: Constants.SESSIONS_ERROR,
            error: errorJSON.error,
          });
        });
      });
    };
  },

  currentUser: () => {
    return dispatch => {
      const authToken = localStorage.getItem('token');

      httpGet('/api/v1/current_user')
      .then(function (data) {
        // setCurrentUser(dispatch, data);
      })
      .catch(function (error) {
        console.log(error);
        dispatch(push('/sign_in'));
      });
    };
  },

  signOut: () => {
    return dispatch => {
      httpDelete('/api/v1/sessions')
      .then((data) => {
        localStorage.removeItem('token');

        dispatch({ type: Constants.USER_SIGNED_OUT });

        dispatch(push('/sign_in'));
      })
      .catch(function (error) {
        localStorage.removeItem('token');

        dispatch({ type: Constants.USER_SIGNED_OUT });

        dispatch(push('/sign_in'));
      });
    };
  },
};

export default Actions;