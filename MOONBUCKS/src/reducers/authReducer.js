
export const setLogin = (user) => {
    return {
        type: 'SET_LOGIN',
        payload: user
    };
};

export const setLogout = () => {
    return {
        type: 'SET_LOGOUT'
    };
};

const initialState = {
    isLoggedIn: false,
    isAdmin: false,
    user: {}
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LOGIN':
            return {
                ...state,
                isLoggedIn: true,
                isAdmin: action.payload.isAdmin,
                user: action.payload
            };
        case 'SET_LOGOUT':
            return {
                ...state,
                isLoggedIn: false,
                isAdmin: false,
                user: {}
            };
        default:
            return state;
    }
};

export default authReducer;
