import { useState, createContext, useContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: '',
        token: '',
        expireDate: ''
    });

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}
const useAuth = () => useContext(AuthContext)
// const [auth,setAuth] = useAuth()  it will access auth,setAuth across the app so that we can use the auth and set the values user and token
export { useAuth, AuthProvider };