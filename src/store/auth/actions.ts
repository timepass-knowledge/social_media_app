import { USER_LOGIN } from './action-types';

function loginAction(data: any) {
    return {
        type: USER_LOGIN
    }
}

export {
    loginAction
}