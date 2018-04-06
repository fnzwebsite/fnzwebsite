import * as allActions from './allActions';
import alertActions  from './alert.actions';
import { history } from '../helpers';

const userActions = {
    login,
    logout
};

function login(username, password) {
  //alert('hi login....');
    return dispatch => {
        dispatch(request({ username }));

        postLogin(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: allActions.LOGIN_REQUEST, user } }
    function success(user) { return { type: allActions.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: allActions.LOGIN_FAILURE, error } }
}

function logout() {
    localStorage.removeItem('user');
    return { type: allActions.LOGOUT };
}

function postLogin(username, password) {

    var form = new FormData()
    form.append('enrollmentId',username)
    form.append('enrollmentSecret', password)

    return fetch('http://35.178.56.52:8081/login',{
        //pass cookies, for authentication
        method: 'post',
        mode:'cors',
        body: form
    })
        .then(response => {
      //    alert(response.statusText);

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
            return response.json();
        })
        .then(user => {
            if (user && user.token) {
                localStorage.setItem('user', JSON.stringify(user.token));
                localStorage.setItem('displayName', user.enrollmentId);
            }
            return user;
        });
}

export default userActions;
