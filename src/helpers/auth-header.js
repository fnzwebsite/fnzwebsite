export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('token'));

    if (user) {
        return {
            'Authorization': user
        };
    } else {
        return {};
    }
}