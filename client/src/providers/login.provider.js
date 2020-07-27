import React, { useState } from "react";
import { LoginContext } from "contexts"

const LoginProvider = ({ children }) => {

    const login = (loginId) => {
        setUserState(preState => {
            return {
                ...preState,
                userId: loginId
            };
            
        });
    };

    const logout = () => {
        setUserState(preState => {
            return {
                ...preState,
                userId: 0
            };
        });
    };

    const initialState = {
        userId: 3,
        login,
        logout
    };
    const [userState, setUserState] = useState(initialState);

    return (
        <LoginContext.Provider value={userState}>
            {children}
        </LoginContext.Provider>
    );
};

export default LoginProvider;