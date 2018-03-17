import { authHeader } from '../components/_helpers';

export const userService = {
    login,
    logout
};

function login(username, password) {

    var form = new FormData()
    form.append('enrollmentId', "test@fnzchain.com")
    form.append('enrollmentSecret', "T3sting1")

    return fetch('http://35.178.56.52:8081/login',{
         //pass cookies, for authentication
        method: 'post',
        mode:'cors',
        body: form
    })
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
            return response.json();
        })
        .then(user => {
            if (user && user.token) {
                localStorage.setItem('user', JSON.stringify(user.token));
            }
            return user;
        });
}

function logout() {
    localStorage.removeItem('user');
}
