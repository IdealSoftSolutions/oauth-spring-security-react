import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/";

const register = (username, email, password) => {
    return axios.post(API_URL + "signup", {
        username,
        email,
        password,
    });
};


const login = async (userName, password) => {
    const response = await fetch(
        API_URL + "login",
        {
            method: "POST",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Access-Control-Allow-Origin": "*",
                'mode': 'cors',
                "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
            },
            body: JSON.stringify({
                userName: userName,
                password: password
            })
        }
    );
    const payload = await response.json();
    console.log('payload ===>', payload)
    if (response.ok) {
        localStorage.setItem("user", payload);
        localStorage.setItem('loggedInUser', payload.userName);
        return response
    } else {
        throw new Error(payload.errorMessage);
    }
}


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