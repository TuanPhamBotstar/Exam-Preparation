import { Action } from 'rxjs/internal/scheduler/Action';
import { User } from '../../shared/models/user.model';
import * as UserActions from '../actions/user.actions';

export interface UserState {
    list: User[],
    loading: boolean,
    error: Error,
    isAuthenticated:boolean,
    user_id: string,
}

const initialState: UserState = {
    list: [],
    loading: false,
    error: undefined,
    isAuthenticated:false,
    user_id:'',
}

export function reducer(state: UserState = initialState, action: UserActions.action) {
    switch (action.type) {
        //load Users
        case UserActions.LOAD_USERS:
            return {
                ...state,
                loading: true,
            }
        case UserActions.LOAD_USERS_SUCCESS:
            return {
                ...state,
                list: action.payload,
                loading: false,
            }
        case UserActions.LOAD_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        // add User
        case UserActions.ADD_USER:
            return {
                ...state,
                loading: false,
            }
        case UserActions.ADD_USER_SUCCESS:
            return {
                ...state,
                list: [...state.list, action.payload],
                isAuthenticated: action.message.success,
                loading: false,
            }
        case UserActions.ADD_USER_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
        // login
        case UserActions.LOGIN:
            return {
                ...state,
                loading:true,
            }
        case UserActions.LOGIN_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                isAuthenticated:action.payload.success,
                user_id: action.payload.id,
                loading:false,
            }
        case UserActions.LOGIN_FAILURE:
            console.log(action.payload)
            return {
                ...state,
                error:action.payload,
                loading:false,
            }
        default:
            return state;
    }
}