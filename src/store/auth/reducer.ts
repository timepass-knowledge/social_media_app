import { GET_USER_PROFILE, USER_LOGIN } from './action-types';

const initialState = {
    isLoggedIn: false,
    errorMessage: ''
}

const Auth = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_USER_PROFILE:
            return {
                ...state,
                userData: action.payload
            }

        case USER_LOGIN:
            return {
                ...state,
                isLoggedIn: true,
            }
        default:
            return state
    }
}

export default Auth;
