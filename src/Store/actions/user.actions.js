
export const login =  (user) =>{
    return {
        type: Actions.LOGIN,
        user
    }
};

export const logout = () => {
    return {
        type: Actions.LOGOUT
    }
};

export const Actions = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT" 
}
