import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/";

const register = (username, email, password) => {
    return axios.post(API_URL + "signup", {
        username,
        email,
        password,
    });
};


const login = (userName, password) => {
    return axios
        .post(API_URL + "login", {
            userName,
            password,
        })
        .then((response) => {
            if (response.data.userName) {
                localStorage.setItem("user", JSON.stringify(response.data));
                localStorage.setItem('loggedInUser', response.data.userName);
            }
            return response.data;
        });
};

const logout = () => {
    localStorage.clear();
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
}

export default AuthService;