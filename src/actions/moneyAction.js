import * as types from './allActions';
import axios from 'axios';

export const usersActions = {
    fetchMoney
};

function fetchMoney() {
    return (dispatch, getState) => {
        dispatch(request());
        axios.get('http://coincap.io/front')
            .then(function (response) {
                console.log(response);
                var money = response.data.slice(0, 20);
                dispatch(success(money));
            })
            .catch(function (error) {
                console.log(error);

            });
    };
    function success(money) {
        return { type: types.MONEY_SUCCESS, money }
    }

    function request(money) { return { type: types.MONEY_REQUEST, money } };
}