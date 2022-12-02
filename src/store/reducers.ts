import { combineReducers } from "redux";

// Front
import Auth from "./auth/reducer"


const rootReducer = combineReducers({
    Auth,    
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
