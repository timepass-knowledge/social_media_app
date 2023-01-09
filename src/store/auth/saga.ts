import { GET_USER_PROFILE } from './action-types';
import { takeEvery, fork, put, all, call } from 'redux-saga/effects'
import { loginService } from '../../services/auth.service';
import { navigationRef } from '../../navigations';

interface IResponse {
    data: any,
    status: number,
    message: string
}

function* fetchUserData(data: any) {
    try {
        const response: IResponse = yield call(
            loginService,
            data.payload
        )
        console.log(navigationRef.current)
    }
    catch (error) {
        console.error(error);
    }
}


export function* watchGetUserData() {
    yield takeEvery(GET_USER_PROFILE, fetchUserData)
}

function* AuthSaga() {
    yield all([
        fork(watchGetUserData)
    ])
}

export default AuthSaga
